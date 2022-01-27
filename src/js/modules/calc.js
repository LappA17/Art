/*Назначаете свои цены, желательно кратные 1000(или 500). Результат отображается в нижнем, цветном поле. 
Обязательны к выбору - первые 2 селекта. Только когда они выбраны - показывается стоимость. Если выбран 1 обязательный и “Дополнительные услуги” - общая сумма не выводится. Также логика должна сохраняться при изменении выбора.
Если в поле “Промокод” введен IWANTPOPART  (из подарочной модалки), то общая сумма уменьшается на 30%. Также логика должна сохраняться при изменении выбора.
 
 Нам нужно работать с value (значение) в option для выбора нужного нам размера, взависимости что выберет пользователь.
Так же можно устанавливать value с помощью back end (со стороны сервера), мы делаем запрос на сервер и получаем актуальные данные
если того требует проект 
    Теперь устанавливаем атрибут value в html к option. Там отталкиваемся от 500 (типа цена) и задаем произвольные 
значения просто
    Теперь задаем title , мы ему задаем коеф который будет умножать на стоимость картины(1, 1.2, 1.5), 
а заголовку пустой value
    Дополнительные услуги тоже задаем value какой-то цены а заголовку пустой*/
const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    /* создаем функцию которая будет обрабатывать обработчик событий сразу на size material options promocode */
    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
/* мы должны работать с value которое получаем от пользователя, а оно всегд в виде СТРОКИ !!! поэтому + ставим в начале */

        /* если 1ый или второй не заполнен селект то ничего не выводим */        
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7); // скидка на 30 процентов
        } else {
            resultBlock.textContent = sum;
        }
    };
    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);

};
export default calc;