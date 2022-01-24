/* Комментарии должны оставаться только на русском языке */
const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {/* keypress - когда пользователь нажал на каке-то клавишу.
 function(e) - для того что бы отследить какую именно */

            if (e.key.match(/[^а-яё 0-9]/ig)) { /* e.key - значение той клавиши которую нажал пользователь
match - метод проверяет на соотвествие
ˆ - коретка - начало строки . а-яё - русский алфавит, 0-9 возможно водить все цифры. ig - искать во всей строке*/

                e.preventDefault();
            }

        }); 

    });
};
export default checkTextInputs;