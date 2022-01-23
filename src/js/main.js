import modals from "./modules/modals";
import sliders from "./modules/sliders";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    
    modals();
    sliders('.feedback-slider-item', "horizontal", '.main-prev-btn', '.main-next-btn'); //теперь второй слайдер работает
    sliders(".main-slider-item", "vertical");
});