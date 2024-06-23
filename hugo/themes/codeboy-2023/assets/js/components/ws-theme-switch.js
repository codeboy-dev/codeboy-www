//======================================================================
// Component: ws-theme-switch
//======================================================================
import {LitElement} from 'lit';
import {html, css} from 'lit';

const _theme_attr = 'data-theme';
const _storage_name = 'theme_mode';

export class WsThemeSwitch extends LitElement {
    static styles = css`
        button.no-style { border:none; background-color: transparent; }
        svg { stroke:var(--cb-brand); fill:var(--cb-brand); }
    `;

    render() {
        return html`
          <button @click="${this._toggle_theme}" class="no-style" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 32 32">
              <path d="m15 2h2v3h-2z"/><path d="m27 15h3v2h-3z"/><path d="m15 27h2v3h-2z"/><path d="m2 15h3v2h-3z"/>
              <path d="m6.22 5.73h2v3h-2z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -3 7.23)"/>
              <path d="m23.27 6.23h3v2h-3z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 2.14 19.63)"/>
              <path d="m23.77 23.27h2v3h-2z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -10.26 24.77)"/>
              <path d="m5.47 25.13 2.12-2.13 1.41 1.42-2.12 2.12z"/>
              <path d="m16 8a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm0 14a6 6 0 0 1 0-12z"/>
            </svg>
          </button>
        `;
    }

    /**
     * Toggle the theme mode of the page by setting the "data-theme"
     * attribute on the <html> tag. Save in localStorage for future visits.
     */
    _toggle_theme() {
        const el_html = document.getElementsByTagName('html')[0];
        if (el_html) {
            const old_mode = this._get_mode();
            const new_mode = (old_mode === 'light') ? 'dark' : 'light';
            el_html.setAttribute(_theme_attr, new_mode);
            localStorage.setItem(_storage_name, new_mode);
        }
    }

    /**
     * Get the theme mode from either a previous user selection (saved
     * in localStorage from previous visits), the devices setting for its
     * preferred colour scheme, or default to "light".
     * @returns {("light"|"dark")}
     */
    _get_mode() {
        let mode = window.localStorage.getItem(_storage_name);
        if (mode === null) {
            const mq = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)');
            if (mq && mq.matches) { mode = 'dark'; }
        }
        return (mode === 'dark') ? mode : 'light';
    }
}

customElements.define('ws-theme-switch', WsThemeSwitch);
