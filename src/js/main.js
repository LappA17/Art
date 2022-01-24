import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    
    modals();
    sliders('.feedback-slider-item', "horizontal", '.main-prev-btn', '.main-next-btn'); 
    sliders(".main-slider-item", "vertical");
    forms();
    mask('[name="phone"]'); //на нужно подставлять маску на телефон
    checkTextInputs('[name="name"]'); //инпуты отвечающее за ввод имени
    checkTextInputs('[name="message"]');//сообщение
});