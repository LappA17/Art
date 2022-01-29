import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

/* array(1) {
  ["upload"]=>
  array(5) {
    ["name"]=>
    string(12) "IMG_4460.JPG"
    ["type"]=>
    string(10) "image/jpeg"
    ["tmp_name"]=>
    string(36) "/Applications/MAMP/tmp/php/phpXkmNSs"
    ["error"]=>
    int(0)
    ["size"]=>
    int(189019)
  }
}  То что приходит после дропа на МАМП сервере , после загрузки

multiple accept="image/*" - прописали в html для инпута на 211 строке что бы четко сказать что мы будем позволять 
загружать сюда изображение, т-есть image, а * говорит что любые типы картинок, multipe - что много картинок*/

window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    
    modals();
    sliders('.feedback-slider-item', "horizontal", '.main-prev-btn', '.main-next-btn'); 
    sliders(".main-slider-item", "vertical");
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]'); 
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    pictureSize(".sizes-block");
    accordion(".accordion-heading");
    burger(".burger-menu", ".burger");
    scrolling(".pageup");
    drop();
});