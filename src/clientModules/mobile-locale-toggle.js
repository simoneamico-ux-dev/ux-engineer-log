/* DESIGN
   ------
   * The default localeDropdown works on desktop (globe, one-click
   * dropdown), but on mobile Docusaurus nests it in the hamburger
   * drawer as a "Languages" submenu that opens with a "back to main
   * menu" header, turning a binary switch into a 3-tap flow. This
   * module replaces the mobile path with a direct IT/EN link
   * injected inside the drawer header next to the dark-mode toggle,
   * so language and theme share one preferences cluster and locale
   * switching is one tap once the drawer is open. The native
   * dropdown is hidden from the drawer via CSS so the two paths
   * never coexist. Same inject-instead-of-swizzle trade-off as
   * search-input-attrs.js.
   *
   * Label choice:
   * The toggle shows the TARGET locale (EN while reading Italian,
   * IT while reading English), matching the dark-mode toggle which
   * also shows the destination rather than the current state. The
   * active state is confirmed by the content's own language, so no
   * separate indicator is needed.
   *
   * Lifecycle:
   * The drawer is lazy-mounted on the first hamburger click, so a
   * page-load injection finds nothing. I listen for that click and
   * run a retry loop after a tick so React has rendered the drawer
   * DOM; once the brand element is in the DOM the toggle lands right
   * after the logo. onRouteDidUpdate refreshes href and label after
   * SPA navigation in case Docusaurus re-renders the brand subtree.
   *
   * URL rewrite:
   * The site mirrors locales under /it/<path> for Italian and
   * /<path> for English, so toggling flips the /it prefix with a
   * string transform, no Docusaurus internal API needed.
*/

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const TOGGLE_CLASS = 'mobile-locale-toggle';

function getLocaleInfo() {
    const path = window.location.pathname;
    const isItalian = path === '/it' || path.startsWith('/it/');
    return {
        targetLocale: isItalian ? 'en' : 'it',
        targetLabel: isItalian ? 'EN' : 'IT',
        targetAriaLabel: isItalian ? 'Switch to English' : 'Passa all\'italiano',
        targetPath: isItalian
            ? (path.replace(/^\/it\/?/, '/') || '/')
            : ('/it' + (path === '/' ? '/' : path)),
    };
}

function ensureMobileLocaleToggle() {
    const brand = document.querySelector('.navbar-sidebar__brand');
    if (!brand) return false;

    let toggle = brand.querySelector('.' + TOGGLE_CLASS);
    if (!toggle) {
        toggle = document.createElement('a');
        toggle.className = TOGGLE_CLASS;
        const logo = brand.querySelector('.navbar__brand');
        const closeButton = brand.querySelector('.navbar-sidebar__close');
        if (logo && logo.nextSibling) {
            brand.insertBefore(toggle, logo.nextSibling);
        } else if (closeButton) {
            brand.insertBefore(toggle, closeButton);
        } else {
            brand.appendChild(toggle);
        }
    }

    const { targetLocale, targetLabel, targetAriaLabel, targetPath } = getLocaleInfo();
    toggle.setAttribute('href', targetPath);
    toggle.setAttribute('aria-label', targetAriaLabel);
    toggle.dataset.locale = targetLocale;
    toggle.textContent = targetLabel;

    return true;
}

function injectWithRetry(attemptsLeft = 20) {
    if (ensureMobileLocaleToggle()) return;
    if (attemptsLeft > 0) {
        setTimeout(() => injectWithRetry(attemptsLeft - 1), 50);
    }
}

function setupHamburgerListener() {
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.closest && target.closest('.navbar__toggle')) {
            injectWithRetry();
        }
    }, true);
}

if (ExecutionEnvironment.canUseDOM) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectWithRetry();
            setupHamburgerListener();
        });
    } else {
        injectWithRetry();
        setupHamburgerListener();
    }
}

export function onRouteDidUpdate() {
    setTimeout(() => injectWithRetry(), 0);
}
