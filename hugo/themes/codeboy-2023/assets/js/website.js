
import "./components/topbar";
import {page_init} from "./app/page-init";

page_init();

import Alpine from "alpinejs";
window.Alpine = Alpine;
/*---- Add AlpineJS extensions here ----*/
Alpine.start();
