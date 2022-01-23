const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
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

                windows.forEach(item => {
                    item.style.display = 'none';
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
            if (e.target === modal && closeClickOverlay) {
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
    /* Нам нужно передать условие что если хоть одно мод окно у нас показывается, то новое не появляется уже
    По дефолту display - сейчас андефайнд(false) и мы не можем к ней обратиться.
    Мы находимся внутри функции и не можем обратиться к переменной windows !!! */
    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;//добавляем новую переменную

            document.querySelectorAll('[data-modal]').forEach(item => { /* Благодаря этому коду мы будет проходится по каждому модельому
                окну и вычеслять показывается ли оно пользователю или нет */
                
                if (getComputedStyle(item).display !== 'none') {/*будем сравнивать НЕ ПРИ ПОМОЩИ ИНЛАЙН СТИЛЕЙ, А ПРИ ПОМОЩИ СКОМПИНИРОВАННЫХ 
                    СТИЛЕЙ В БРАУЗЕРЕ, ЭТО ЗНАЧИТ ЧТО СТИЛИ НУЖНО ПОЛУЧАТЬ С БРАУЗЕРА С computed. Item - каждое мод окно, которое мы 
                    проверям по getCompStyle. Если у нас мод окно которая сейчас перебирается, оно будет показанно пользоателю - мы 
                    что-то сделаем */
                    
                    display = "block"; /* Теперь в логическом контексте у нас дисплей становится true. И мы точно будем знать что одно из мод окон
                    показывается  */
                }

                if(!display) { /* Если не одно мод окно не показывается, то мы берем и показываем мод окно которое нам нужно */
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = "hidden";
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

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    /*Подставляем нужыне нам селекторы с верстки (кнопка открытия, само мод окно, закрытие окна)
        
    Верстальщик уже до нас поставил data атрибуты*/
    
    showModalByTime('.popup-consultation', 5000);
};

export default modals;