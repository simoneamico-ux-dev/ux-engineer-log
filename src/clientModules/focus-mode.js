/* DESIGN
   ------
   * This client module adds an auto-dim and proximity-reveal system to
   * the page chrome, keeping the reading flow immersive while preserving
   * ambient awareness of the site.
   * 
   * The architecture follows a "two-phase" behavior:
   * - Phase 1 "Onboarding" covers the first 5 seconds after page load
   *    or route change. Sidebar and TOC stay fully visible, any mousemove
   *    resets the countdown, and hovering the chrome itself pauses it so
   *    the user can explore the interface without losing it.
   * - Phase 2 "Proximity" kicks in after the first dim. Sidebar and TOC
   *    are hidden, and each one reveals only when the cursor enters its
   *    own zone on the viewport edge. Leaving the zone fades the element
   *    back out with a slow curve.
   * 
   * Design decision: Why the navbar never dissolves
   * I originally hid the navbar together with the sidebar and the TOC, but
   * testing revealed a loss of ambient awareness during page navigation and
   * a "something is missing" feeling in the top area after fade-out. The
   * navbar carries the site-level meta-functions (brand, search, theme
   * switch, locale switch) that matter regardless of which doc is being
   * read, so it stays as the continuity anchor. The sidebar and the TOC
   * are page-level chrome instead and compete with reading flow when not
   * actively needed, so they are the ones that dissolve.
   * 
   * Design decision: Why hash changes don't reset onboarding
   * Docusaurus fires a route-update event also on anchor clicks (e.g.
   * jumping to a section from the TOC). If the feature treated those as
   * real navigations, clicking a TOC entry would flash the sidebar back
   * in for 5 seconds, which felt like an accidental "refresh". I now
   * distinguish hash jumps from pathname changes and only reset on the
   * latter.
   * 
   * Key technical choices:
   * - "Hybrid timing": a 5-second onboarding phase makes the interface
   *    discoverable before the dim kicks in, while proximity reveal keeps
   *    things immersive afterwards.
   * - "Attention-aware linger": a 3-second delay before the fade-out
   *    starts lets the user's gaze return to the content before motion
   *    happens, so the dissolution is processed in peripheral vision
   *    instead of pulling attention back to the UI.
   * - "Monotonic measurements with retry": a zone updates only when the
   *    element's rect is valid, and the measurement polls every 50ms for
   *    up to 1 second. The retry keeps going even if the element is
   *    momentarily absent from the DOM, because React 18 can detach
   *    nodes while recovering from hydration errors, and a strict
   *    presence check would make the retry terminate prematurely during
   *    those recovery windows.
   * - "Safari mousemove filter": a simple comparison of clientX/clientY
   *    against the last known position filters out the fake mousemove
   *    events Safari fires during trackpad scroll, preventing the chrome
   *    from falsely reappearing while reading.
   * - "requestAnimationFrame throttling": the mouse handler collapses dense
   *    mousemove streams into one update per frame, keeping the CPU quiet.
   * 
   * Accessibility and escape hatches:
   * - Keyboard parity: tabbing into sidebar or TOC reveals that element,
   *    and focus leaving triggers a re-evaluation based on cursor position.
   * - Esc toggle: press once to freeze sidebar and TOC visible for the
   *    session, press again to resume the hybrid behavior from a fresh
   *    onboarding phase. Esc is ignored while the DocSearch modal owns
   *    the key.
   * - "prefers-reduced-motion" disables the feature entirely for motion
   *    accessibility, and touch-only devices are excluded because
   *    mousemove is not a real intent signal there.
*/

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let onRouteDidUpdateHook = null;

if (ExecutionEnvironment.canUseDOM) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;

    if (!prefersReducedMotion && !isTouchOnly) {

        /* Timing: 5 seconds before the first dim.
        At 4s it triggered too easily while reading a paragraph slowly
        during manual testing, so I pushed it to 5s to make the dim feel
        like an intentional pause rather than an accidental timeout */
        const INITIAL_DIM_DELAY_MS = 5000;

        /* Zone buffer: extra space beyond each element's bounding rect that
        still counts as "in proximity". 20px feels forgiving without making
        accidental reveals likely during normal mouse movements */
        const ZONE_BUFFER_PX = 20;

        /* Fallback used before the first measurement, or on pages where the
        sidebar is missing. Matches Docusaurus defaults */
        const SIDEBAR_FALLBACK_PX = 280;

        const SIDE_CLASS = 'zen-sidebar-hidden';
        const TOC_CLASS = 'zen-toc-hidden';

        /* Attention-aware fade-out delay.
        I noticed that when the chrome starts dissolving the instant the cursor
        leaves a proximity zone, the motion happens in the user's focal vision
        and pulls their attention back to the UI they had just finished using.
        Adding a 3-second delay before the fade-out starts solves this: by the
        time the dissolution begins, the gaze has already returned to the
        content, so the change is processed in peripheral vision and registers
        as "ah, it's gone" instead of "it's going". I later discovered this
        pattern is documented in motion theory as "attention-aware motion
        design", and it is the same approach Apple uses for the menu bar in
        fullscreen, the Dock auto-hide, and the playback controls of Apple TV
        and QuickTime.
        As a bonus, this delay cleans up an edge case: if the cursor brushes
        a zone briefly on its way somewhere else, the element now has time to
        stabilize at full opacity before the fade-out starts, avoiding a
        visible "ping-pong" between reveal and hide */
        const HIDE_LINGER_MS = 3000;

        /* The navbar is included in the safe zone so that hovering it during
        Phase 1 pauses the countdown. Even though the feature never dissolves
        the navbar itself, a user interacting with it is still "orienting
        themselves" and the onboarding display should not expire under them */
        const SAFE_ZONE_SELECTOR = '.navbar, .theme-doc-sidebar-container, .theme-doc-toc-desktop';

        const zones = {
            sidebarRight: SIDEBAR_FALLBACK_PX,
            tocLeft: null,
        };

        let isInitialPhase = true;
        let isUserDisabled = false;
        let initialTimer = null;

        /* Tracking the last known cursor position lets the script re-evaluate
        proximity on focus changes and route updates without waiting for the
        next mousemove event */
        let lastX = null;
        let lastY = null;

        let rafScheduled = false;
        let pendingEvent = null;

        /* Monotonic measurement.
        I only update a zone when the element can be captured with a
        non-zero width. An invalid rect means the element is missing,
        display:none, or in a transient layout state during hydration,
        and I prefer to keep the previous good value rather than overwrite
        it with null. This works together with ensureMeasured below, which
        keeps retrying until a valid rect is captured; the monotonic rule
        then protects that good value against subsequent calls (resize,
        late events) that might hit a transient bad frame */
        const measureZones = () => {
            const sidebar = document.querySelector('.theme-doc-sidebar-container');
            if (sidebar) {
                const rect = sidebar.getBoundingClientRect();
                if (rect.width > 0) {
                    zones.sidebarRight = rect.right + ZONE_BUFFER_PX;
                }
            }

            const toc = document.querySelector('.theme-doc-toc-desktop');
            if (toc) {
                const rect = toc.getBoundingClientRect();
                if (rect.width > 0) {
                    zones.tocLeft = rect.left - ZONE_BUFFER_PX;
                }
            }
        };

        /* Because measureZones is monotonic, I need to explicitly clear
        the zones when the user navigates to a new page, otherwise stale
        values from the previous page would survive into pages where the
        sidebar or the TOC are absent or positioned differently */
        const resetZones = () => {
            zones.sidebarRight = SIDEBAR_FALLBACK_PX;
            zones.tocLeft = null;
        };

        /* Measurement with retry. Calls measureZones immediately and,
        if the TOC is not yet measured, retries every 50ms up to 1 second.
        The retry is intentionally NOT gated on the element being currently
        present in the DOM: React 18 discards and re-renders entire
        subtrees while recovering from a hydration mismatch (we have one
        on the site, caused by a <p> inside a <p> in an MDX file), so
        a "poll tick" (single execution of the retry timer, that is the moment 
        when the setTimeout fires and attempts the measurement) can land in 
        the brief window where the TOC node does not exist at all. 
        Keying the retry on node presence caused the chain to terminate
        prematurely during that window, leaving tocLeft at null forever.
        On pages that legitimately have no TOC, the retry burns 1 second
        of cheap querySelector calls before giving up, which is an acceptable
        trade for correctness */
        let measurementRetryTimer = null;
        const ensureMeasured = (attemptsLeft = 20) => {
            if (measurementRetryTimer !== null) {
                clearTimeout(measurementRetryTimer);
                measurementRetryTimer = null;
            }
            measureZones();
            if (zones.tocLeft === null && attemptsLeft > 0) {
                measurementRetryTimer = setTimeout(
                    () => ensureMeasured(attemptsLeft - 1),
                    50,
                );
            }
        };

        /* 
         * Controller that adds or removes a "hidden" class with asymmetric
         * timing: removing is instant so the reveal feels reactive, adding is
         * delayed by HIDE_LINGER_MS so the fade-out stays polite and happens
         * when the user's attention has already moved back to the content.
         * See the attention-aware motion design note above
        */
        const createLingerController = (className) => {
            let hideTimer = null;
            return {
                apply: (shouldHide) => {
                    if (shouldHide) {
                        if (document.body.classList.contains(className)) return;
                        if (hideTimer !== null) return;
                        hideTimer = setTimeout(() => {
                            document.body.classList.add(className);
                            hideTimer = null;
                        }, HIDE_LINGER_MS);
                    } else {
                        if (hideTimer !== null) {
                            clearTimeout(hideTimer);
                            hideTimer = null;
                        }
                        document.body.classList.remove(className);
                    }
                },
            };
        };

        const sideController = createLingerController(SIDE_CLASS);
        const tocController = createLingerController(TOC_CLASS);

        const revealAll = () => {
            sideController.apply(false);
            tocController.apply(false);
        };

        const clearInitialTimer = () => {
            if (initialTimer !== null) {
                clearTimeout(initialTimer);
                initialTimer = null;
            }
        };

        const isInsideSafeZone = (target) => {
            if (!target || typeof target.closest !== 'function') return false;
            return target.closest(SAFE_ZONE_SELECTOR) !== null;
        };

        /* Helper to check whether the current keyboard focus lives inside
        a specific ancestor. Returns the matching element or null */
        const activeClosest = (selector) => {
            const active = document.activeElement;
            if (!active || typeof active.closest !== 'function') return null;
            return active.closest(selector);
        };

        /* Single source of truth for the two class toggles.
        The decision combines cursor proximity with keyboard focus: an
        element stays visible if either the cursor is in its zone or an
        element inside it currently holds keyboard focus */
        const updateVisibility = () => {
            if (isUserDisabled || isInitialPhase) return;

            const focusInSide = activeClosest('.theme-doc-sidebar-container');
            const focusInToc = activeClosest('.theme-doc-toc-desktop');

            const hasMouse = lastX !== null && lastY !== null;
            const inLeft = hasMouse && lastX >= 0 && lastX <= zones.sidebarRight;
            const inRight = hasMouse && zones.tocLeft !== null && lastX >= zones.tocLeft;

            sideController.apply(!focusInSide && !inLeft);

            if (zones.tocLeft !== null) {
                tocController.apply(!focusInToc && !inRight);
            } else {
                tocController.apply(false);
            }
        };

        const startInitialTimer = () => {
            clearInitialTimer();
            if (isUserDisabled) return;
            initialTimer = setTimeout(() => {
                isInitialPhase = false;
                /* Transition out of onboarding by applying the proximity rules
                based on the current cursor and focus state. If no mouse data
                has been captured yet, every zone is "out of range" and both
                sidebar and TOC dim together */
                updateVisibility();
            }, INITIAL_DIM_DELAY_MS);
        };

        const resetToOnboarding = () => {
            if (isUserDisabled) return;
            isInitialPhase = true;
            revealAll();
            startInitialTimer();
        };

        const processMouseMove = (event) => {
            /* Safari quirk: during trackpad scroll the browser emits mousemove
            events even when the physical cursor has not moved on screen.
            I filter them out by comparing viewport-relative coordinates,
            which stay constant when the page scrolls but the cursor is still */
            if (event.clientX === lastX && event.clientY === lastY) return;
            lastX = event.clientX;
            lastY = event.clientY;

            if (isUserDisabled) return;

            if (isInitialPhase) {
                /* During onboarding sidebar and TOC stay visible. Hovering
                the chrome pauses the countdown so the user can read menus
                or titles without anything dissolving under the cursor */
                revealAll();
                if (isInsideSafeZone(event.target)) {
                    clearInitialTimer();
                } else {
                    startInitialTimer();
                }
            } else {
                updateVisibility();
            }
        };

        /* rAF-throttled mouse handler: at most one update per frame.
        Keeps the CPU quiet even on dense mousemove streams */
        document.addEventListener('mousemove', (event) => {
            pendingEvent = event;
            if (!rafScheduled) {
                rafScheduled = true;
                requestAnimationFrame(() => {
                    rafScheduled = false;
                    processMouseMove(pendingEvent);
                });
            }
        });

        /* Keyboard accessibility: Tab into sidebar or TOC reveals that
        element and keeps it visible while focus lives inside */
        document.addEventListener('focusin', updateVisibility);

        /* When focus leaves, I wait one frame so a sibling focusin can settle
        first (e.g. tabbing between two sidebar links), then re-evaluate */
        document.addEventListener('focusout', () => {
            requestAnimationFrame(updateVisibility);
        });

        /* Esc toggles the feature for the current session.
        DocSearch owns Esc when open, so I yield to it */
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            if (document.querySelector('.DocSearch-Container')) return;

            isUserDisabled = !isUserDisabled;
            if (isUserDisabled) {
                clearInitialTimer();
                revealAll();
            } else {
                resetToOnboarding();
            }
        });

        /* Re-measure zones when the viewport changes so the proximity bands
        stay aligned with the new sidebar and TOC positions */
        window.addEventListener('resize', () => {
            measureZones();
            if (!isInitialPhase) updateVisibility();
        });

        /* Initial setup: measure once the DOM is ready and arm the onboarding
        timer. The first dim happens 5s after page load if the user never
        moves the mouse */
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                ensureMeasured();
                startInitialTimer();
            });
        } else {
            ensureMeasured();
            startInitialTimer();
        }

        /* SPA navigation hook.
        Docusaurus switches pages via client-side routing, which means
        sidebar and TOC content change but this script keeps running.
        On each route change I clear the stale zones and ask ensureMeasured
        to capture the new page, which will retry until the TOC has
        hydrated. The reset to onboarding fires in the same frame so the
        user sees the chrome reappear for the new page immediately */
        onRouteDidUpdateHook = () => {
            resetZones();
            requestAnimationFrame(() => {
                ensureMeasured();
                resetToOnboarding();
            });
        };
    }
}

export function onRouteDidUpdate({location, previousLocation}) {
    if (!onRouteDidUpdateHook) return;
    /* Docusaurus fires this hook on hash changes too (e.g. clicking a TOC
    anchor), which would otherwise trigger a full onboarding reset and
    flash the sidebar back in. I only want to reset on real page changes,
    so I skip the call when the pathname is unchanged. The initial route
    has no previousLocation and is handled separately by DOMContentLoaded */
    if (!previousLocation) return;
    if (previousLocation.pathname === location.pathname) return;
    onRouteDidUpdateHook();
}
