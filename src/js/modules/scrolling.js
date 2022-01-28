/*  CALC ИМПОРТИРОВАЛ В ПРОШЛОМ КОММИТЕ СЛУЧАЙНО !!!!!!!!! */

/* ПЛЮС ЗАБЫЛ ДОПИСАТЬ ЧТО ЕСЛИ КЛИКНУТЬ НА ЛЮБОЙ ЭЛЕМЕНТ В ИДЕИ ДЛЯ ПОДАРКОВ, ПОКУПАТЕЛЯМ И ТД , ТО ЧТО В ЭТОМ КОДЕ ЧТО В ПЕРВОЙ ЧАСТИ
ВСЕ РАВНО ТЕБЯ БУДЕТ ПЛАВНО ПЕРЕБРАСЫВАТЬ К НУЖНОЙ ЛОКАЛЬНО ССЫЛКЕ !!!!!
 
ПЛЮС ВАЖНО ОЧЕНЬ ЧТО В ПРЕДЫДУЩЕМ КОДЕ С ПЕРВОЙ ЧАСТИ ПРИ НАЖАТИЕ НА ЛОКАЛЬНУЮ ССЫЛКУ - НАС ПРОСТО ТЕЛЕПОРТИРОВАЛО
А В ЭТОМ КОДЕ НАС ПЛАВНО ПЕРЕНОСИТ !!! */

const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 1650) {         
            upElem.classList.add('animated', "fadeIn");
            upElem.classList.remove("fadeOut");
        } else {
            upElem.classList.add("fadeOut");
            upElem.classList.remove("fadeIn");
        }
    });
  
    // Scrolling with raf
  
    let links = document.querySelectorAll('[href^="#"]'),/*получаем все ссылки по селекторам, в [] атрибут, 
    ^ значит что данное значение атрибута должно быть прямо сначала строки. [href^="#"] - дословно говоря такой селектор значит что 
    я ищу все ссылки которые начинаются с #, те локальные ссылки */
        speed = 0.3;
  
    links.forEach(link => {
        link.addEventListener("click", function(event) { //так как контекст вызова то фанкшн 
            event.preventDefault();
  
            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top, /*верхня граница того элемента к которому 
  будем скролить и полуаем мы элемент с помощью контекста вызова
  а верхнии кординаты с помощь getBoundingClientRect - который позволяет получить доступ к свойствам к примеру свойству топ */
                start = null; //стартова позиция
  
            requestAnimationFrame(step); //передаем функцию которая будет заниматься нашей анимацией
  
            function step(time) {
                /* узнаем первый ли раз запускается эта анимация */
                if (start === null) {
                    start = time; // на след запуск анимации больше не будет null, это выполнится только один раз
                }
                let progress = time - start, // тайм постояно новый , а старт только в начале при запуске анимации
                r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : 
                    Math.min(widthTop + progress/speed, widthTop + toBlock));
  /* кство пикселей за которое нам необходимо пролистать в течение этой операции 
  Math.max - возвращает макс значение тех аргументов что мы передали
  Вся эта большая операция выполняется для того что бы понимать насколько нам необходимо пикселей продвинуть нашу анимацию и в какую сторону*/
  
                document.documentElement.scrollTo(0, r); // по x мы берем ноль потому что мы двигаемся только по верт, а по y ставим r
  
                /* теперь условие для остановки анимации */
                if (r != widthTop + toBlock) { /* как только r будет ровна - это будет значит что мы долистали до нужного элемента по пикселям */
                    requestAnimationFrame(step);
                } else { // если те значение равны - анимация должна закончится
                    location.hash = hash; //хеш установим вручную
                }
            }
        });
    });
  
  };
  export default scrolling;