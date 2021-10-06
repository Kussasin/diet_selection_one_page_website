function slider({container,slide,nextArroow,prevArrow,totalCounter,currentCounter,wrapper,field}) {
    //Slider
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArroow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let currentIndex = 1,
        lastIndex = slides.length,
        offset = 0;
    if (lastIndex < 10) {
        total.textContent = `0${lastIndex}`;
    } else {
        total.textContent = lastIndex;
    }

    function currentNumber(n) {
        if (n < 10) {
            current.textContent = `0${n}`;
        } else {
            current.textContent = n;
        }
    }
    currentNumber(currentIndex);
    //устанавливаем ширину слайда
    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(elem => {
        elem.style.width = width;
    });
    slider.style.position = 'relative';
    const indicatiors = document.createElement('ol'),
        dots = [];
    indicatiors.classList.add('carousel-indicators');
    slider.append(indicatiors);
    currentNumber(currentIndex);

    function whiteDots(n) {
        n.forEach(dot => dot.style.opacity = '.5');
        n[currentIndex - 1].style.opacity = 1;
    }
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicatiors.append(dot);
        dots.push(dot);
    }

    function moveImg(n) {
        slidesField.style.transform = `translateX(-${n}px)`;
    }

    function regEx(elem) {
        return +elem.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
        if (offset == regEx(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += regEx(width);
        }
        moveImg(offset);
        if (currentIndex == slides.length) {
            currentIndex = 1;
        } else {
            currentIndex++;
        }
        currentNumber(currentIndex);
        whiteDots(dots);
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = regEx(width) * (slides.length - 1);
        } else {
            offset -= regEx(width);
        }
        moveImg(offset);
        if (currentIndex == 1) {
            currentIndex = slides.length;
        } else {
            currentIndex--;
        }
        whiteDots(dots);
    });
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            currentIndex = slideTo;
            offset = regEx(width) * (slideTo - 1);
            moveImg(offset);
            currentNumber(currentIndex);
            whiteDots(dots);
        });
    });
}
export default slider;