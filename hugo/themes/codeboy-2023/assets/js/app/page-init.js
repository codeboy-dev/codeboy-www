import {ThemeMode} from "../shared/theme-mode";

export function page_init() {
    addEventListener("DOMContentLoaded", function(e) {
        ThemeMode.init_html_tag();
        ThemeMode.init_togglers('.theme-toggle');
    });
}
