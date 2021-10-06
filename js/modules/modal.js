function openModalWindow(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closemodalWindow(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Modal window
    const openModal = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    openModal.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
    });
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closemodalWindow(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closemodalWindow(modalSelector);
        }
    });

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //если окно открывали, то оно не откроется после прокрутки
        }
    }
    window.addEventListener('scroll', showModalByScroll); //пользыватель долистал до конца странницы
}
export default modal;
export {
    closemodalWindow
};
export {
    openModalWindow
};