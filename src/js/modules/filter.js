/* Классы фото, по которым фильтровать уже поставлены (в HTML). Если выбираются 2 последних пункта - показываем блок portfolio-no 
Так же идет переключение активного таба и его стиля.
При наведении мыши на эти блоки:
 */
const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl = menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandmother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    /* функция для фильтрация элементов, в нее передаем определенный тип тех портретов которые я хочу показать 
на экрана одновременно скрыв ненужные */
    const typeFilter = (markType) => { // в марктайп будем передавать коллекцию каких то элементов(маркгерл, маркловерс и тд)
        markAll.forEach(mark => {
            mark.style.display = "none";
            mark.classList.remove('animated', 'fadeIn'); //когда будем скрывать то удаляем определенные классы
        });
        /* markAll - все элементы с классом all внутри wrapper */

        /* если этот блок у нас не вызван то мы будем его скрывать по определенному маркТайпу */
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = "block";
                mark.classList.add('animated', 'fadeIn');
            });/* таким образом мы будем показывать элементы */
        } else { //если ничего не было передано и просто запустилась функция typeFilter
            no.style.display = "block";
            no.classList.add('animated', 'fadeIn');
        }
    };

    /*будем все элементы сразу показывать */
    btnAll.addEventListener("click", () => {
        typeFilter(markAll);
    });

    btnLovers.addEventListener("click", () => {
        typeFilter(markLovers);//во внутрь передаем то что соотвествует этой кнопки
    });

    btnChef.addEventListener("click", () => {
        typeFilter(markChef);//во внутрь передаем то что соотвествует этой кнопки
    });

    btnLovers.addEventListener("click", () => {
        typeFilter(markLovers);//во внутрь передаем то что соотвествует этой кнопки
    });

    btnGuy.addEventListener('click', () => {
        typeFilter(markGuy);
    });

    btnGirl.addEventListener('click', () => {
        typeFilter(markGirl);
    });

    /* в  Grandmother и Granddad если мы подставим марк то будет показывать что таких элементов не существует, ведь в этом случае нам
нужно поставить no(портфолио ноу).
По этому мы эту функцию запускам без аргумента, а когда мы запускам без аргумента то срабатывает ЧАСТЬ УСЛОВИЯ else, А ЕСЛИ АРГУМЕНТ
ЕСТЬ ТО СРАБАТЫВАЕТ if */
    btnGrandmother.addEventListener('click', () => {
        typeFilter();
    });

    btnGranddad.addEventListener('click', () => {
        typeFilter();
    });

    /* теперь будем добавлять активный класс при клике */
    menu.addEventListener('click', (e) => { /*будем через делигирование событий спомощью навешивание обработчика события наложеного на все меню, 
и так как делегирование событие то используем event*/
        
        let target = e.target; //элемент на котормо будет происходить событие

        if (target && target.tagName == "LI") { /*спрашиваем или наш элемент поддерживает событие клика
target.tagName == "LI" что бы тег был лист айтемом. те если пользователь кликнул в определеный элемент в меню то мы должны 
убрать класс активности у всех остальных элементов в меню и добавить только тому на который кликнул пользователь */

            items.forEach(btn => btn.classList.remove("active"));//таким образом мы убрали класс активности со всех элементов которые есть в меню
            target.classList.add("active"); //теперь берем тот элемент на который кликнул пользователь и через класслист добавляем этот класс
        }

    })
};
export default filter;