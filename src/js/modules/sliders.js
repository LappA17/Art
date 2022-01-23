const sliders = (slides, dir, prev, next) => {
/* slides - нам понадобиться какой-то селектор благодаря которому мы будем переключать слайдер 
    dir(direction)ПЕРВЫЙ СЛАЙДЕР БУДЕТ ДВИГАТЬСЯ ВЕРТИКАЛЬНО, ВТОРОЙ ГОРИЗОНТАЛЬНО*/

    let slideIndex = 1; // текущий слайд который показывается нашему пользователю
    let paused = false; //для остановки авто слайдера

    const items = document.querySelectorAll(slides); //слайды
         /* prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next); - вырезаем эти две переменные и подставляем в try catch*/

    function showSlides(n) {
        if (n > items.length) { /* то-есть у нас n будет больше количества слайдов, которое у нас действительно
есть на странице */

            slideIndex = 1; //то мы возвращаемся в самое начало !, то-есть с послед на первый слайд перекинет
        }

        if (n < 1) {
            slideIndex = items.length; // мы должны показать самый последний слайд
        }

        /* Когда мы показываем определенный слайд - нам нужно скрыть все остальные и показать действительно
тот который нам нужен */
        items.forEach(item => {
            item.classList.add("animated");//для css анимации
            item.style.display = 'none'; //скрываем все слайды
        });

        /* Теперь показываем нужный слайд */
        items[slideIndex - 1].style.display = "block"; //помни что в жс все с 0
    }

    showSlides(slideIndex); /* вызываем с параметром slideIndex что бы когда пользователь зайдет первый раз на страницу
наша функция скрое все нактивный слайды item.style.display = 'none'; и покажет нам только первый 
слайд с помощью items[slideIndex - 1].style.display = "block"; */

    function plusSlides(n) {
        showSlides(slideIndex += n); /* в функцию plusSlide мы будем передавать либо 1 либо -1 
и сразу таким образом будем вызывать функцию showSlides либо на один салйд больше либо на один слайд меньше */
    }

    /* Теперь если селекторы кнопок у нас  не были переданны, то этот блок кода не сломается, ну а если всен норм
    то назначем обработчик событий на prevBtn и некстбтн*/
    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener("click", () => {
            plusSlides(-1); //когда пользователь нажимает назад, мы передаем значение минус 1
            items[slideIndex - 1].classList.remove("slideInLeft"); /*добавляем анимации. Это наш текущий слайд 
[slideIndex-1] - это тот слайд который сейчас будет показан 
classList.remove("slideInLeft") - делаем это для того что бы мы могли убирать класс который мы добавляем следующий*/

            items[slideIndex - 1].classList.add("slideInRight"); /* при клике назад добавляе класс Right что бы 
класс красиво въехал в наш экран */
        });

        nextBtn.addEventListener("click", () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove("slideInRight");
            items[slideIndex - 1].classList.add("slideInLeft");
        });
    } catch(e){}

    /* Тепреь реализуем поведение что когда пользователь наводит мышкой на блок слайдера, то сетинтервал отключается
Мы все условие помещаем во внутрь activateAnimation, а внутрь иф все присваиваем в paused 
Логика такая - что бы при наведение мышки - срабатывал обработчик событий - и сетинтервал стопанулся */
    function activateAnimation() {
        /* Настраиваем первый слайдер */
        if (dir === 'vertical') { // мы в мейне передали vertical что бы сравнивать
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.add("slideInDown"); // анимация
            }, 2000);
        } else { // это горизонтальный слайдер
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.remove("slideInRight");
                items[slideIndex - 1].classList.add("slideInLeft");
            }, 2000);
        }
    }
    activateAnimation();

    /* Нужно найти родитель items(это будет весь слайдер) */
    items[0].parentNode.addEventListener("mouseenter", () => {
        clearInterval(paused);
    }); /* Это когда пользователь наводит мышку, мы останавливаем с помощью clearInterval наш paused*/

    items[0].parentNode.addEventListener("mouseleave", () => {
        activateAnimation();
    });//а когда отводит мышку то вызываем функцию
};
export default sliders;