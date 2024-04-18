
// blog on imgs reacting to light/dark mode (for CFC logo): https://larsmagnus.co/blog/how-to-make-images-react-to-light-and-dark-mode
// icons for light/dark mode: https://www.iconfinder.com/search?q=light+mode

import {html, css} from 'lit';
import {EnhancedLitElement} from "../shared/lit";
import {ThemeMode} from "../shared/theme-mode";

export class Topbar extends EnhancedLitElement {
    static properties = {
        'theme_mode': {Type: String},
    }
    constructor(props) {
        super(props);
        this._css_links = this.wc_get_css_links(["ws-style"]);
        this.theme_mode = ThemeMode.get();
    }

    static styles = css`
        nav.wc-nav {
            max-width:1024px; margin-bottom: 0;
            background-color: transparent;
            background: url("data:image/gif;base64,R0lGODdhAQASAPEAAABmmQAAAMlFJslFJiH5BAEAAAIALAAAAAABABIAAAIFhI8mewUAOw==") repeat-x;
            padding-top: 0rem;
            border-bottom: 1px solid #069;
        }
        nav.wc-nav ul li { padding-top: 30px; padding-bottom: 10px; }
        .wc-title {
            font-size: 1.75rem; color:#069;
            font-family: Times, "Times New Roman", Georgia, serif; }
        [data-theme=light] .wc-title { color:#069; }
        [data-theme=dark] .wc-title { color:#f00; }
        .wc-title span { font-size: 60%; }
        details.dropdown { border:0 solid #fff; }
        details.dropdown summary.wc-dropdown, button.wc-button
            { border:0; background-color:rgba(0,0,0,0); border-box:none; }
    `;

    render() {
        return html`
          ${this._css_links}
          <nav class="wc-nav container">
            ${this.topbar_left()}
            ${this.topbar_middle()}
            ${this.topbar_right()}
          </nav>
        `;
    }

    topbar_left() {
        ThemeMode.get()
        return html`
          <ul>
            <li>
              <a href="/en/">
                <span class="wc-title">CodeBoy<span>.dev</span></span>
              </a>
            </li>
          </ul>
        `;
    }

    topbar_middle() {
        return null;
    }

    topbar_right() {
        const toggle_img = `/img/mode-when-${this.theme_mode}.svg`;
        return html`
          <ul>
            <li class="hide-if-lt-sm">
              <details class="dropdown">
                <summary class="wc-dropdown">Blog</summary>
                <ul>
                  <li><a href="#">Blog List</a></li>
                  <li><a href="#">Blot Tags</a></li>
                  <li><a href="#">T-Notes</a></li>
                </ul>
              </details>
            </li>
            <li class="hide-if-lt-sm">
              <details class="dropdown">
                <summary class="wc-dropdown">More</summary>
                <ul>
                  <li><a href="#">Hire</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </details>
            </li>
            <li>
              <button @click="${this._toggle_theme}" class="outline wc-button" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="m15 2h2v3h-2z"/>
                <path d="m27 15h3v2h-3z"/>
                <path d="m15 27h2v3h-2z"/>
                <path d="m2 15h3v2h-3z"/>
                <path d="m6.22 5.73h2v3h-2z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -3 7.23)"/>
                <path d="m23.27 6.23h3v2h-3z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 2.14 19.63)"/>
                <path d="m23.77 23.27h2v3h-2z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -10.26 24.77)"/>
                <path d="m5.47 25.13 2.12-2.13 1.41 1.42-2.12 2.12z"/>
                <path d="m16 8a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm0 14a6 6 0 0 1 0-12z"/>
              </svg>
              </button>
            </li>
          </ul>
        `;
    }

    _navbar_start() {
        const en = this.doc_lang === 'en';
        const _ = {
            events: en ? 'Events' : 'Tournois',
            ratings: en ? 'Ratings' : 'Cotes',
            news: en ? 'News' : 'Nouvelles',
            more: en ? 'More' : 'Plus',
            for_players: en ? 'For Players' : 'Pour les joueurs',
            for_organizers: en ? 'For Organizers' : 'Pour les organisateurs',
            for_elite: en ? 'For Elite' : 'Pour l\'élite',
            about: en ? 'About the CFC' : 'À propos du FCE',
        }
        return html`
          <div class="navbar-start">
            <a class="navbar-item">${_.events}</a>
            <a class="navbar-item">${_.ratings}</a>
            <a class="navbar-item">${_.news}</a>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">${_.more}</a>
              <div class="navbar-dropdown">
                <a class="navbar-item">${_.for_players}</a>
                <a class="navbar-item">${_.for_organizers}</a>
                <a class="navbar-item">${_.for_elite}</a>
                <hr class="navbar-divider">
                <a class="navbar-item">${_.about}</a>
              </div>
            </div>
          </div>
        `;
    }

    _navbar_end() {
        const toggle_img = `/img/mode-when-${this.theme_mode}.svg`;
        const en = this.doc_lang === 'en';
        const _ = {
            toggle_alt: en ? 'switch light/dark modes' : 'changer de mode clair/sombre',
        }
        return html`
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light" @click="${this._toggle_theme}" aria-hidden="true">
                  <img src="${toggle_img}" height="24" width="24"
                    alt="${_.toggle_alt}">
                </a>
                <a class="button is-primary" @click="${this._goto_other_lang}">
                  ${this.other_lang.toUpperCase()}
                </a>
              </div>
            </div>
          </div>
        `;
    }

    _toggle_navbar(event) {
        const el_target = event && event.target;
        const el_menu = document.getElementById('cfc-topbar-menu');
        el_target.classList.toggle('is-active');
        el_menu.classList.toggle('is-active');
    }

    _toggle_theme() {
        ThemeMode.toggle();
        this.theme_mode = ThemeMode.get();
        //this.theme_svg = this.svg[this.theme_mode];
    }

    _goto_other_lang() {
        const other_url = window.location.href
            .replace(`/${this.doc_lang}/`, `/${this.other_lang}/`);
        window.location.assign(other_url);
    }
}
customElements.define('cb-topbar', Topbar);


// Ref: constructor grabs kids: https://stackoverflow.com/questions/69114945/move-a-child-element-from-shadow-dom-to-light-dom-on-document-ready
