/**
 * Return the value of a DOM element's attribute
 * @param el - a DOM element or a selector string.
 * @param attr_name - name of attribute.
 * @param default_value - if the tag doesn't have the attribute.
 * @returns {string} - value of the attribute (or default).
 */
export function get_attr(el, attr_name, default_value=null) {
    if (typeof el === 'string') {
        el = document.querySelector(el);
        if (el === null) return default_value;
    }
    const attr = el.attributes.getNamedItem(attr_name);
    return attr === null ? default_value : attr.value;
    // Notes:
    //  - Don't use element.getAttribute() as that may return null or ""
    //    so unable to tell if it was set to "" or was missing (use default).
}

/**
 * Return list of document languages. First is the current page's lang.
 * @returns {string[]}
 */
export function get_doc_langs() {
    const lang = get_attr('html', 'lang', 'en').toLowerCase();
    if (lang==='en') {
        return ['en', 'fr']
    } else if (lang==='fr') {
        return ['fr', 'en']
    } else {
        console.warn(`get_doc_langs: unknown language "${lang}"; assuming "en"`)
        return ['en', 'fr']
    }
}

/**
 * For a list of ids, return a list of newly created <link> elements
 * that have the same href value. For use in Lit Element's render()
 * to include external CSS in the shadow DOM.
 */
export function get_css_links(css_ids) {
    css_ids = css_ids || ['cfc-2024'];
    const css_links = [];
    css_ids.forEach(css_id => {
        const el_link = document.querySelector('link#' + css_id);
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
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#referencing_external_styles
}
