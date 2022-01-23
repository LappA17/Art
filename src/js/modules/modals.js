const modals = () => {

    /* Если пользователь долистал страницу до конца, но не нажал ни одну кнопку - должно появляться модальное окно (popup-gift)
     и сам подарок полностью исчезает со страницы. При нажатии на крестик или подложку окно исчезает. */
     let btnPressed; //изначально андефайн (false), создаем для того что бы мониторить была ли нажата кнопка


    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) { /* удаляем closeClickOverlay = true
        так как нам нужно уничтожать триггер мод окна, то-есть после того как человек нажимает на гиф(там где подарок), моделька с 
        подарков должна пропасть */
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true; // Пользователь кликнул на мод окно

                /* То-есть если есть дестрой, то мы просто удалем триггер (айтем = тригер) */
                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';

                    /* В самом конце урока Ваня сказал что хочет работать с css анимации в этом проекте. И теперь когда мы 
                    кликнем на какой-то триггер к нам во все модельные окна добавятся вот эти классы ("animated", "fadeIn")
                    и теперь мод окна будут появляться плавно */
                    item.classList.add("animated", "fadeIn");

                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`; 
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { //  && closeClickOverlay удаляем
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;  
                // document.body.classList.remove('modal-open');
            }
        });
    }
    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                
                if (getComputedStyle(item).display !== 'none') {
                    
                    display = "block";
                }

                if(!display) { 
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = "hidden";
                    scroll = calcScroll();
                    document.body.style.marginRight = `${scroll}px`; // подставляем сюда скрол !
                    /* Но все равно будет мод окно дергаться, потому что эта функция находится внутри setTimeout и скролл в ней
                    просто не существует. По-этому копируем переменную scroll = calcScroll(); так как к этой функции доступ уже есть */
                }

            });
        }, time);
    }

    function calcScroll(){
        let div = document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div); 
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;

       
    }

    function openByScroll(selector) { /*во внутрь передаем селектор который нужно показать если происходит какое-то условие */
        window.addEventListener('scroll', () => { /* что бы мониторить сколько пользователь уже отлистал на странице */

            /* Сейчас, перед концом урока, Ваня сказал, что многие браузеры старые не поддерживают document.documentElement.scrollHeight
            по-этому в идеале нам нужно было бы проверить этот код вот таким обаразом */
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            /* А всё дело в том что некоторые браузеры не поддерживаю документЕлемент, а поддерживают именно body.
            И теперь там где будет больше (там где documentElement или body) то и вернется в нашу переменную
            И мы просто подставляем вместо document.documentElement.scrollHeight в условие, переменую scrollHeight
             */

            if(!btnPressed &&  (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
/* Если кнопка не нажата и пользователь долистал страницу до конца
window.pageYOffset - еслии я немного пролистаю страницу, и весь тот контент что находится сверху = это pageYOffset, то что не видно

clientHeight - это контент который в данную секунду внезависимо какой скрол показывается пользователю

и когда мы пролистаем в самый низ - то весь pageYOffset который мы уже невидим + тот контент который показывается в данную секунду
и будут равны полной высоте

document.documentElement.clientHeight - используем контент который виден пользователю

и что бы убедиться что пользователь долистал страницу мы должны вот эту суму window.pageYOffSet + document.documentElement.clientHeight
сравнить с полной высотой страницы */

                document.querySelector(selector).click(); /* Теперь нужно вручную вызвать модельное окно подарка. И вызываем мы
 его в РУЧНУЮ, когда мы пишем .click то мы как буд-то вызвали само модельное окно            */
            } 
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    /* Передаем true для destroy*/

    openByScroll('.fixed-gift');
    
    //showModalByTime('.popup-consultation', 5000);
 };

export default modals;