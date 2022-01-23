//import checkNumInputs from "./checkNumInputs";

/* Делаем функционал такой: когда мы отправляем какое-то мод окно - мы форму скрываем, потом показываем состояние
из изображения (Ваня скачал фото с крестиков если еррор или лоадинг). И после этого мы будем эту форму возвращать
на место(не нужно ее удалять, копировать, заново вставлять и тд), просто будем его скрывать  */

        //import checkNumInputs from './checkNumInputs';       
        //  checkNumInputs('input[name="user_phone"]');

        const forms = () => {
            const form = document.querySelectorAll('form'),
                  inputs = document.querySelectorAll('input'),
                  upload = document.querySelectorAll('[name="upload"]'); /* добавляем новую переменую что получить доступ к инпуту по атрибуту.
Делаем мы это для того что бы повесить на него обработчик события, то-есть когда пользователь поместит какое-то изображение в инпут
там где загрузите свою фото Рассчитайте стоимость и получите скидку 30%, мы уже можим добавить измениение для "файл не выбран" на 
название изображения*/
   
            const message = {
                loading: 'Загрузка...',
                success: 'Спасибо! Скоро мы с вами свяжемся',
                failure: 'Что-то пошло не так...',
                spinner: 'assets/img/spinner.gif',/*изображение которое показывается еще до того как наша форма 
        отправится либо зафейлится*/
                ok: '/assets/img/ok.png',
                fail: 'assets/img/fail.png'
            };

/* Создаем переменые по путям которых мы будем отправлять наши данные (когда отправляем изображение - это идет на один адрес
когда просто текстовая форма - то на другой). Зависит на какое модельное окно кликнул пользователь */
            const path = {
                designer: 'assets/server.php',
                question: 'assets/question.php'
            };
        
            const postData = async (url, data) => {
                document.querySelector('.status').textContent = message.loading;
                let res = await fetch(url, {
                    method: "POST",
                    body: data
                });
        
                return await res.text();
            };
            
            /*  В самом конце урока Ваня захотел очистить свой инпут после того как он ввел изображение и отправил его на сервер
оно дальше весело после отправки по дефолту на сайте */
            const clearInputs = () => {
                inputs.forEach(item => {
                    item.value = '';
                });
                upload.forEach(item => {
                    item.previousElementSibling.textContent = "файл не выбран"
                });
            };

            upload.forEach(item => {
                item.addEventListener('input', () => { //этот обработчик сработает только когда пользователь положет что-то в инпут
                    console.log(item.files[0]); /* у нашего инпута появилось свойсвто файлс, и мы обращаемся к первому файлу который был
туда загружен. Теперь нам приходит объект где будет имя файла загруженного и много разных данных */

                    /* Теперь перед тем как имя загруженной фото поместить на страницу(а не только в консоль), нам нужно убедиться
что имя файла имеет не больше 7 символов(условно) что бы у нас не поехала верстка, что бы не было 100 символов на экрана + нужно дописать
в конце вид (jpg, svg, png и тд) */
                    let dots; // переменная будет содержать 3точие в случае если очень большое имя файла

                    /* В конце урока, что бы не было кучу безумного кода с массивами, поместим все в переменную. Теперь arr - это массив
с двумя элементами */
                    const arr = item.files[0].name.split('.');

                    item.files[0].name.split('.')[0].length > 6 ? dots = "..." : dots = "."; /* item.files[0].name.split('.') теперь у 
нас сформируется массив где будет в первой части название самого файла условно dafjasfjasfja , а во второй то что после точки 
(jpg, svg, png и тд) 

 [0].length - это та первая часть массива где харнится само имя до точки, мы обращаемся к ее длине и спрашваем больше ли она 7 символов(помни что с 0)
 dots = "." - если меньше то мы ставим одну точку что бы между первой частью и второй стояла точко потому что после того как мы сделали
 из имя файла массив - точка пропала*/

                    const name = item.files[0].name.split('.')[0].substring(0, 6) + dots + item.files[0].name.split('.')[1]
/* Сейчас будем получать само имя 
item.files[0].name.split('.')[0] - это первая часть массива
substring(0, 6) - с помощью этого метода мы его обрезам с 0 до 6(не включая 6ку) 
+ dots - нам будет приходить с условия
item.files[0].name.split('.')[1] - это уже тип изображения (jpg, svg, png и тд) */

                    item.previousElementSibling.textContent = name;
/* На сколько я понял таким образом он заменяет название "файл не выбран", на имя файла */

                })
            });
        
            form.forEach(item => {
                item.addEventListener('submit', (e) => {
                    e.preventDefault();
        
                    let statusMessage = document.createElement('div');
                    statusMessage.classList.add('status');
                    item.parentNode.appendChild(statusMessage); /* дописываем parentNode, тоесть я дополнительный блок в котором 
буду показывать изображения - я помещаю в родителя этой формы(потому что нам нужно скрывать форму после отправки). 
В Верстке есть div блок (с классом main-form) в котором находится сама форма отправки. И именно в этот див блок, который является
родителем этой формы - мы будем помещать наш дополнитлеьный блок с каким-то изображением */

                    /* Нам нужно нашу форму скрыть */
                    item.classList.add('animated', 'fadeOutUp'); /* item -это каждая форма. Благодаря этой анимации, наша форма
при закрытие будет становится менее прозрачней */

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // теперь после того как форма станет полностью прозрачной, она еще и исчезнит со страницы

                    /* Создаем тег img, добавляем к нему атрибут(и указываем что будет в атрибуте) + анимацию + помещаем на страницу */
                    let statusImg = document.createElement('img');
                    statusImg.setAttribute('src', message.spinner);
                    statusImg.classList.add('animated', 'fadeInUp');
                    statusMessage.appendChild(statusImg); // помещаем так на страницу в наш статусМеседж

                    let textMessage = document.createElement('div');
                    textMessage.textContent = message.loading; /* textContent - помещает именно текст */
                    statusMessage.appendChild(textMessage); //помещаем на страницу 
        
                    const formData = new FormData(item);
                    let api;// нужна чтобы сформировать динамический путь куда будет это всё отправлять
                    item.closest('.popup-design') || item.classList.contains("cacl_form") ? api = path.designer : api = path.question;
/* этот метод попробует найти определенный блок, 
по селектору '.popup-design', где-то у себя выше по иерархии. Если этот блок действительно будет существовать у каких-то там родителей
то тогда мы получим этот блок - ? api = path.designer. Если блока не будет, то в этом случае получим null - : api = path.question;

item.classList.contains("cacl_form") - на 234 строке в html добавляем класс форме cacl_form (в КЛАССЛИСТ точку не ставим, это уже не 
селектор, это работа с классами напрямую). Всё это мы сделали для того что бы изображение Рассчитайте стоимость и получите скидку 30%
при загрузке фото, все данные ухадили на server.php и была вся инфа про изображение для бекенда*/
                    console.log(api);
        
                    postData(api, formData) // сюда подставляем api, что бы взависимости от присваивание данные шли на правильный адресс
                        .then(res => {
                            console.log(res);

                            /* Теперь необходимо результат обработать. Всего два пункта : изменяем изображение и текст отправки */
                            statusImg.setAttribute('src', message.ok); // если все норм то такой аттрибут 
                            textMessage.textContent = message.success;
                        })
                        .catch(() => {
                            statusImg.setAttribute('src', message.fail);
                            textMessage.textContent = message.failure;
                        })
                        .finally(() => {
                            clearInputs();
                            setTimeout(() => {
                                statusMessage.remove();

                        /* Сделаем так что бы форма возвращалсь на своё место после отправки пользователем данных */
                                item.style.display = 'block';
                                item.classList.remove('fadeOutUp');
                                item.classList.add('fadeInUp'); //класс с красивым появлением формы
                            }, 5000);
                        });
                });
            });
        };
        /* assets/question.php Это просто оставить данные
forms.js:85 array(2) {
  ["name"]=>
  string(25) "Руслан Потоюк"
  ["phone"]=>
  string(13) "+380990314699"
}

forms.js:81 assets/server.php  Это там где нужно загрузить фото для дизайнера
forms.js:85 array(4) {
  ["name"]=>
  string(25) "Руслан Потоюк"
  ["phone"]=>
  string(13) "+380990314699"
  ["email"]=>
  string(25) "ruslan.postoyuk@gmail.com"
  ["message"]=>
  string(4) "test"
} 
Мы поменяли в сервер.пхп на Файлы и теперь видим инфу о изображение при отправки*/

/* И в самом конце урока в main css Ваня добавил это что бы оповещание с вами свяжется художник было красиво по центру
.status {
    text-align: center;
  } */
        
        export default forms;