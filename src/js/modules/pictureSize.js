const pictureSize = (imgSelector) => { // селектор который обединяет все блоки с фото
    const blocks = document.querySelectorAll(imgSelector);

    /*на каждый из этих блоков нужно повесить обработчик события: маусовер (когда мышь проходит через элемент)
и соотвественно маусаут
    Кроме этого нам нужно будет показать определенный элемент скрыв другие */

    function showImg (block) { // фция принимает какой-то блок так как мы показываем изображение в какомто отдельном блоке

        /* картинка находится внутри какого-то блока и мы можем ее получить по родителю */
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';
        /* -4 значит отризаться будут с конца , а именно png.  когда пишешь минус то значит с конца
т.е было так something.png , стало так something-1.png */

        /*скрываем */
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }
/* p:not(.sizes-hit) скроет все параграфы кроме того который имеет этот класс с помощью псевдокласса not
это хит продаж и он должен оставаться */

        function hideImg (block) { //все наоборот
            const img = block.querySelector('img');

            /*здесь нужно наоборот из минус 1 сделать обычную строку, somethin-1.png => something.png */
            img.src = img.src.slice(0, -6) + '.png';
            block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
                p.style.display = 'block';
            });
        }

        blocks.forEach(block => {
            block.addEventListener("mouseover", () => {
                showImg(block); /* так как мы будем перебирать все блоки которые подходят по этому селектору то как раз
    тот блок на котором произойдет событие и будет передан в функцию showImg */
            });
            block.addEventListener("mouseout", () => {
                hideImg(block);
            });
        });

};
export default pictureSize;