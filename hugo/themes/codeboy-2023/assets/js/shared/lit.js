import {LitElement, html} from 'lit';
import {get_doc_langs} from "./dom";

export class EnhancedLitElement extends LitElement {
    // Note: enhancements have "wc_" prefix. Subclasses should avoid
    //    using names with this prefix to avoid collisions (now or later).

    static wc_internal = {state: true};

    /**
     * Get the value of a property set on the <web-component>.
     * Returns default_value if property is not set on the tag
     * (if `myprop=""`, returns `""`, not the default value).
     * @param {string} name
     * @param {string} default_value
     * @returns {string|*}
     */
    wc_get_attr(name, default_value) {
        const attr = this.attributes.getNamedItem(name)
        return attr ? attr.value : default_value;
    }

    /**
     * For convenience, return a <slot> with the given slot_id
     * and default contents (if the slot is missing).
     * @param {string} slot_id
     * @param {*} [default_contents]
     * @returns {TemplateResult<1>}
     */
    wc_slot(slot_id, default_contents) {
        default_contents = default_contents || `[Missing slot="${slot_id}"]`;
        return html`<slot name="${slot_id}">${default_contents}</slot>`;
    }

    /**
     * Use to get two-way binding on input elements. Add this listener:
     * `@change=${e => this._set("_my_var", e)}`. `this._my_var` will
     * be set to the value retrieved from the target of event `e`.
     * @param {String} key
     * @param {Event} event
     */
    wc_set = (key, event) => this[key] = event.target.value;

    /**
     * For a list of ids, return a list of newly created <link> elements
     * that have the same href value. For use in render() to include
     * external CSS in the shadow DOM.
     * @param {string[]} external_css_ids
     * @returns {HTMLLinkElement[]}
     */
    wc_get_css_links(external_css_ids) {
        const css_links = [];
        external_css_ids.forEach(css_id => {
            const el_link = document.querySelector('#' + css_id);
            if (!el_link) {
                console.warn(`Element not found: <link id="${css_id}" ...>`);
                return;
            }
            const new_link = document.createElement("link");
            new_link.setAttribute("rel", "stylesheet");
            new_link.setAttribute("href", el_link.href);
            css_links.push(new_link);
        });
        return css_links;
        // Notes:
        // - Ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#referencing_external_styles
        //   says modern browsers will not re-download nor re-parse the CSS so performs well.
    }

    i18n_text = [];
    wc_get_i18n(lang) {
        lang = lang || get_doc_langs()[0];
        const langs_key = '_lang';
        if (!this.i18n_text[langs_key]) {
            console.warn(`this.i18n_text["${langs_key}"] is undefined`);
            return {};
        }
        const lang_index = this.i18n_text[langs_key].indexOf(lang);
        if (lang_index < 0) {
            console.warn(`Language "${lang}" not found in this.i18n_text["${langs_key}"]`);
            return {};
        }
        const i18n = {};
        for (const key in this.i18n_text) {
            i18n[key] = this.i18n_text[key][lang_index];
        }
        return i18n
    }
}

export class UnshadowedLitElement extends EnhancedLitElement {
    createRenderRoot() {
        return this;
    }

    /**
     * Unshadowed LitElements do not need to include document <link>s.
     * Do nothing (so nothing breaks switching from EnhancedLitElement).
     */
    wc_get_css_links(external_css_ids) {
        return [];
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Ref: observing changes to child nodes: https://stackoverflow.com/questions/68475272/when-can-we-access-the-children-elements-of-a-custom-component-using-javascript
