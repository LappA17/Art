import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => { 

    const btn = document.querySelector(trigger);

    btn.addEventListener("click", function() {

        getResource('http://localhost:3000/styles') 
        .then(res => createCards(res)) 
        .catch(error => console.log(error));
        
        /* теперь сделаем так что бы кнопка удалялась после нажатия
Когда мы прописывали в обработчеке событий сам колбек - мы использовали стрелочную фцию , а стрелочная фция в обработчиках
не будет ссылаться на тот элемент на котором произошла событие, по этому просто this.remove() не сработает.
По этому дописываем функцию после "click", что бы получилась класическая фнукция а не колбек. Это будет безимяная фция
и В СВОЕМ КОНТЕКСТЕ ОНА БУДЕТ ССЫЛАТЬСЯ НА ТОТ ЭЛЕМЕНТ НА КОТОРОМ ПРОИЗОШЛО СОБЫТИЕ */

        this.remove();
     });

     /* После того как мы закомментировали половину кода, мы получили после клика показать больше эти данные
так как наш запрос пошел по ссылке  http://localhost:3000/styles и взял данные с нашего локального сервера
касаемо тех фоток что нужно показать на странице
     (4) [{…}, {…}, {…}, {…}]
0: {src: 'assets/img/styles-5.jpg', title: 'Пастелью', link: '#pastel'}
1: {src: 'assets/img/styles-6.jpg', title: 'Поп-арт', link: '#popart'}
2: {src: 'assets/img/styles-7.png', title: 'Фотомозаика', link: '#mozaika'}
3: {src: 'assets/img/styles-8.jpg', title: 'Шарж', link: '#sharj'}
length: 4
[[Prototype]]: Array(0) 

!!! В INDEX.HTML УДАЛЯЕМ ВСЕ БЛОКИ ДИВОВ С КАРТОЧКАМИ, ПРЯМ ВСЕ, ПОТОМУ ЧТО ОНИ НАМ БОЛЬШЕ НЕ НУЖНЫ*/

     // создаем функцию которая будет конструировать отдельные блоки и помещать их на страницу
     function createCards (response) { // респонс - ответ от сервера
        
        /* для того что бы в src title link каждый раз не прописывать item, мы займемся диструктиризацией кода
        ({src, title, link}) - для того что бы вытащить из item то что нам нужно*/
        response.forEach(({src, title, link}) => { // через forEach потому что как видно выше это массив
            let card = document.createElement('div');//это будет каждая отдельная карточка, под которую мы создаем отдельны блок

            /* мы к карточки добавляем определенные классы */
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            /* теперь наполнение этой карточки */
            card.innerHTML = `
        <div class="styles-block">
            <img src=${src} alt="style">
            <h4>${title}</h4>
            <a href=${link}>Подробнее</a>
        </div>
            `; /* тут есть важный фактор, дело в том что весь этот див изначально в верстке был еще в одном диве
но мы его вручную поместил в наш див  let card = document.createElement('div');
card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')

src, title, link лежат внутри объекта внутри db.json .  Изначально после src title link стоял item.src и тд
но потом ваня оптимизировал код*/

            /*теперь нужно разместить эта на странице, для этого в верстке находим div с классом row */
            document.querySelector(wrapper).appendChild(card);
            /* те так карточка которая была создана внутри фор ича будет помещаться в определенный wrapper(обертку)
showMoreStyles по этому в параметрах фции вместо styles, подставляем wrapper*/

            /* теперь блоки идут не из верстки а из базы данных, таким образом можно динамически формировать элементы */

        });
     }
}; 
export default showMoreStyles;