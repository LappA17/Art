const mask = (selector) => { // селектор внутри будет отмечать те инпуты которые нам нужны для валидации

    let setCursorPosition = (pos, elem) => { // принимает аргументы позиции и элемента на котором мы работаем прямо сейчас

        /* первым делом когда у нас срабатывает функция - я хочу установить фокус на этом элементе */
        elem.focus();

        /* Метод HTMLInputElement.setSelectionRange() устанавливает начальное и конечное положение выделения текста в элементе <input>
как буд-то просто зажать лкм и выделить кусок текста. Но старые браузеры не поддерживают этот метод, по этому нужно написать через
if ручной полифил */
        if (elem.setSelectionRange) { // если у элемента есть этот метод то он будет его использовать, так переводится все условие
            elem.setSelectionRange(pos, pos); /*здесь мы задаем позицию(начало и конец) и если мы два раза передадим один и тот же аргумент
мы просто поставим курсор в определенную позицию */

        } else if (elem.createTextRange) {//проверим есть ли у элемента другой метод который мы можем использовать

            let range = elem.createTextRange();// мы создадим диапазон который нам нужно выделить, так будет создан даипазон на основе нашего элемента

            /*теперь его нужно настроить */
            range.collapse(true);// объединяет граничные точки диапазона, т.е первую с полседней позицией
            range.moveEnd('character', pos);/*коду говорим где будет конечная точка нашего выделения, pos - это кство символов которое у 
            нас будет в this.value*/
            range.moveStart('character', pos);
/* по-факту из-за того что в pos мы передаем одно и то же число , то let range = elem.createTextRange() установится куда-то курсор  */

            range.select();/* таким образом мы установим курсор и выделим то значение которое сформировалось при помощи moveEnd и moveStart  */



        }
    };

    function createMask(event) { // event - значит будет происходить на каком-то элементе
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ""), /* так как это строка мы можем обратиться к методу replace
и  /\D/g, "" - это значит что мы получим только те значения которые не соотвествуют каким-то цифровым. def - это статичное значение
которое будет работать на основе матрицы*/

            val = this.value.replace(/\D/g, ""); /* здесь мы обращаемся к контексту и к элементу value у которого происходит
событие. А это динамичное значение, которое работает на основе того что ввел пользователь */

        if (def.length >= val.length) {
            val = def;
        } /* Когда пользователь что-то вводит в матрицу, если вдруг он начинает удалять 7ку и + , то мы ему это делать не дадим */

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        }); /* this.value - это то знаечние которое пользователь ввел прямо сейчас. Нам нужно сделать так чтобы
при вводе пользователя номера телефона, нижние подчеркиванья удалялись при вводе цифры 
/./ - точечка это каждый элемент который существует в строке*
g - это все элементы
потом через запятаю мы ЗАДАЕМ ДЕЙСТВИЕ ФУНКЦИИ ДЛЯ КАЖДОГО ЭЛЕМЕНТА 
a - это каждый символ в матрице который мы передаем как аргумент в функцию
[_\d]/.test(a) - так мы проверяем является ли данный символо элементов который входит в определенный диапазон
i < val.length - что наш итератор меньше кство символов в val.length - это значение которое УЖЕ избаивалось от всех не цифр !
после ? идет то что выполнится в случае правильного условия 
val.charAt(i++) - просто следующий символ
в самом конца а - это просто символ который изначально нам пришел в эту функию */

        /* начнем с блюра */
        if (event.type === 'blur') { /* т.е у нас пользователь перестал что-то туда вводить */

            /* здесь я просто проверю что this.value.length - кство символов которое находится сейчас в инпуте = 2, то мы просто очистим наш инпут */
            if(this.value.length == 2){
                this.value = "";
            }
        } else { /* если событие произошло не блюр (то-есть произошел фокус) */
            
            setCursorPosition(this.value.length, this); /* this.value.length - кство символов которое есть сейчас в инпуте
this - ссылка на тот элемент который сейчас у нас в работе*/
        }

    }

    let inputs = document.querySelectorAll(selector);/*получаем элементы на которую мы хотим установить маску */

    inputs.forEach(input => {
        input.addEventListener("input",createMask);
        input.addEventListener("focus",createMask);
        input.addEventListener("blur",createMask);
    }); /* Теперь при каждом событие будет что-то происходть, либо формироваться новый value, либо очищаться value либо устанавливаться
в курсор */

};
export default mask;