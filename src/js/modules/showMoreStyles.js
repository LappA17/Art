/* При клике на эту кнопку :

должны подгружаться(показываться) дополнительные стили (блоки). Сама кнопка при этом исчезает.*/

const showMoreStyles = (trigger, styles) => { /* trigger - это кнопка на которую нажимую что бы мод окно открылось
styles - все карточки которые должны будут быть показаны */

    const cards = document.querySelectorAll(styles),
          btn = document.querySelector(trigger);

    /* анимаци сначала */
    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener("click", () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        /* нужно сделать так что бы кнопка убиралась после нажатия */
        // btn.style.display = "none"; // так мы скроем кнопку
        btn.remove(); // так удалим, и то и то можно использовать
    });
/* в верстке у блока есть 4 аж класса которые отвечают за скрытие наших элементов. Поэтому нужно убирать эти 4 класса
которые отвечают за закрытие у тех что мы хотим показать и добавлять к тем карточкам которые хотим скрыть
А там где добавляем,то добавляем из верстки классы  */

};
export default showMoreStyles;