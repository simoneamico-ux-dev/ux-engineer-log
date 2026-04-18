/* DESIGN
   ------
   * Adds missing id and name attributes to the Docusaurus navbar search
   * input, silencing Chrome's "A form field element should have an id
   * or name attribute" DevTools warning. The search plugin ships the
   * input without them, and Docusaurus does let you override theme
   * components through a pattern called "swizzling", which means
   * copying the component into your project and editing it there.
   * The trade-off is that the copy has to be kept in sync with every
   * Docusaurus upgrade, so maintaining a parallel fork of a component
   * just to add two attributes would be heavier work than the problem
   * deserves. I went with the lighter path of setting the attributes
   * via JavaScript once the input has rendered (same reason I didn't
   * fork PDF.js in veil).
   *
   * The input already carries aria-label="Search" and the usual
   * WAI-ARIA combobox attributes (role, aria-autocomplete, aria-expanded,
   * aria-owns), so screen readers were already handled. This change is
   * about the DevTools signal and about giving the element a stable id
   * for future anchor links or tests.
   * 
   * Chosen values:
   * - id="navbar-search" descriptive, unique on the page
   * - name="q" the same query parameter that Google, Bing, GitHub and
   *    Wikipedia use for their search inputs
   * 
   * Timing:
   * The navbar finishes rendering a few frames after DOMContentLoaded,
   * so I retry every 50ms up to 1 second until the input appears in
   * the DOM. Once found the retry stops. The navbar stays mounted
   * across SPA route changes in Docusaurus, so the attributes persist
   * for the whole session with no re-trigger.
   * 
   * Performance:
   * Zero ongoing CPU cost. The polling runs at most 1 second and stops
   * as soon as the input is found, releasing all timers. Nothing
   * re-runs on page changes because the navbar DOM stays mounted for
   * the whole session.
*/

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
    const ensureSearchAttributes = (attemptsLeft = 20) => {
        const input = document.querySelector('.navbar__search-input');
        if (input) {
            if (!input.id) input.id = 'navbar-search';
            if (!input.name) input.name = 'q';
            return;
        }
        if (attemptsLeft > 0) {
            setTimeout(() => ensureSearchAttributes(attemptsLeft - 1), 50);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ensureSearchAttributes());
    } else {
        ensureSearchAttributes();
    }
}
