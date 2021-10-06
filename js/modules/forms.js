import {openModalWindow,closemodalWindow} from './modal';
import {postData} from '../services/services';

function form(formSelector,modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с вами',
        failure: 'Что-то пошло не так...'
    };
    forms.forEach(item => {
        bindPostData(item);
    });
    //XML формат
    // function bindPostData(form) {
    //   form.addEventListener('submit', (e)=> {
    //     e.preventDefault();
    //     const statusMessage = document.createElement('div');//добавляем сообщение
    //     statusMessage.classList.add('status');
    //     statusMessage.textContent = message.loading;
    //     form.append(statusMessage);
    //     const request = new XMLHttpRequest();
    //     request.open('POST','server.php');
    //     // request.setRequestHeader('Content-type','multipart/form-data');
    //     // В XMLHttpRequest Заголовки ставить не нужно, он сам их ставит
    //     const formData = new FormData(form);
    //     request.send(formData);
    //     request.addEventListener('load', ()=>{
    //       if (request.status === 200) {
    //         statusMessage.textContent = message.success;
    //         console.log(request.response);
    //         form.reset();//очистка данных
    //         setTimeout(()=>{
    //           statusMessage.remove();
    //         },2000);
    //       } else {
    //         statusMessage.textContent = message.failure;
    //       }
    //     });
    //   });
    // }
   

    function bindPostData(form) { //JSON формат
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img'); //добавляем сообщение
            statusMessage.src = message.loading;
            statusMessage.classList.add('loading');
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            //////////////////////////////////////////////////////////
            // Добавляем эти строки чтобы перевести в JSON формат
            // const object = {};
            // formData.forEach(function (value, key) {
            //   object[key] = value;
            // });
            //вместо верхнего кода
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //formData.entries собирает все даные в масив масивов через запятую.
            // Object.fromEntries превращает обратно в обьект
            // Функция с промисами
            postData('http://localhost:3000/requests', json).then(data => {
                showThanksModal(message.success);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                //очистка данных
                form.reset();
                statusMessage.remove();
            });
            // Та же функция что и с верху, только без промисов
            // request.addEventListener('load', () => {
            //   if (request.status === 200) {
            //     showThanksModal(message.success);
            //     console.log(request.response);
            //     form.reset(); //очистка данных
            //     statusMessage.remove();
            //   } else {
            //     showThanksModal(message.failure);
            //   }
            // });
        });
    }
    //показ статуса отправки данных на сервер
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModalWindow('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closemodalWindow('.modal');
        }, 1500);
    }
    fetch(' http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
}
export default form;