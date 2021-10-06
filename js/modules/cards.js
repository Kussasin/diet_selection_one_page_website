import {getResources} from '../services/services';

function cards() {
    //class for cards
    class MenuCard {
        constructor(src, alt, title, content, price, parentElement, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.content = content;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentElement);
            this.changeToUah();
        }
        changeToUah() {
            this.price *= this.transfer;
        }
        render() {
            const cardElement = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                cardElement.classList.add(this.classes);
            } else {
                this.classes.forEach(className => cardElement.classList.add(className));
            }
            cardElement.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}"</h3>
              <div class="menu__item-descr">${this.content}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
      `;
            this.parent.append(cardElement);
        }
    }


    getResources('http://localhost:3000/menu') //вызов класа MenuCard с db.json 
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}
export default cards;