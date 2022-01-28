const accordion = (triggersSelector) => { /* в акордион должно приходить два селектора, потому что мы взаимодейсвтуем с двумя
типами элементов на странице : 1ое - заголовок(какой-то span ) и под ним есть див - блок в котором находится весь
контент. Нам нужно получить как тригер при нажатие на который вызывается контент 
После триггера и айтема пишем селектор потому что сразу внутри я скрою получение всех этих элементов*/

    const btns = document.querySelectorAll(triggersSelector);
    
    btns.forEach(btn => {
        btn.addEventListener("click", function() { //контекст вызова будет поэтому оставляем анинмуню фцию
            this.classList.toggle("active-style");/* toggle - работает так : если у элемента нет этого класса то тогл его добавит
если есть то уберет. Мы кликнули на элемент - он стал розовым */

            /* перейдем к стелизации контента после клика на элемент */
            this.nextElementSibling.classList.toggle("active-content");
/* this.nextElementSibling - значит я обращаюсь к след элементу соседу */

            /* дальше если нужно узнать а элемент на который нажали уже открыт или еще скрыт */
            if (this.classList.contains('active-style')) {

                /*так как макс высота стоит в 0, нам нужно с помощью скрипта высчитать его высоту  */
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
/*scrollHeight - показывает нам высоту контента которая содержится внутри элемента 
+ 80 - что бы красиво отображалось из-за педдингов которые мы установили в стилях
и передаем к этому 80 пиксели */
            } else { 
                this.nextElementSibling.style.maxHeight = "0px";//сварачиваем элемент
            }
        });
    });

};
export default accordion;