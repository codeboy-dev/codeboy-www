
const _theme_attr = 'data-theme';
const _storage_name = 'theme_mode';

/**
 * Manages the light/dark mode of the web page.
 * Assumes the mode is determined by the "data-theme" attribute on the <html> tag.
 * Toggling the mode will save the new setting in localStorage for use in future
 * visits to the website.
 */
export class ThemeMode {
    /**
     * Initialze the "data-theme" attribute of the <html> tag
     * with an initial value (returned by =.get()).
     */
    static init_html_tag() {
        const mode = this.get();
        for (const el of document.getElementsByTagName('html')) {
            el.setAttribute(_theme_attr, mode);
        }
    }

    /**
     * To selected elements, add listeners to toggle the theme mode.
     * @param {string} selector - a valid CSS selector
     */
    static init_togglers(selector) {
        for (const el of document.querySelectorAll(selector)) {
            el.addEventListener('click', () => this.toggle());
        }
    }

    /**
     * Gets the theme mode from either a previous user selection (saved
     * in localStorage from previous visits), the devices setting for its
     * preferred colour scheme, or defaults to "light".
     * @returns {("light"|"dark")}
     */
    static get() {
        let mode = window.localStorage.getItem(_storage_name);
        if (mode === null) { mode = this.get_prefers(); }
        if (mode !== 'dark') { mode = 'light'; }
        return mode;
    }

    /**
     * Gets the devices setting for preferred colour scheme.
     * @returns {("light"|"dark")}
     */
    static get_prefers() {
        const mq = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)');
        return (mq && mq.matches) ? 'dark' : 'light';
    }

    /**
     * Toggles the colour scheme of the current page by setting the
     * "data-theme" attribute on the <html> tag.
     */
    static toggle() {
        const el = document.getElementsByTagName('html');
        if (el[0]) {
            const old_mode = el[0].getAttribute(_theme_attr);
            const new_mode = (old_mode === 'light') ? 'dark' : 'light';
            el[0].setAttribute(_theme_attr, new_mode);
            localStorage.setItem(_storage_name, new_mode);
        }
    }
}
