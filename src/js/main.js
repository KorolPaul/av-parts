/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle')
const popupElement = document.querySelector('.popup');

function togglePopup() {
    popupElement.classList.toggle('opened');
}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    togglePopup();
}))


/* cookies */
new CookiesEuBanner(function () {
    // Your code here
});

/* video */
const videoElement = document.querySelector('.phone_video');

if (videoElement) {
    const observerCallback = function (e) {
        if (e[0].isIntersecting) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px',
        threshold: 0.3
    });
    observer.observe(videoElement);
}

/* language selector */
const langElement = document.querySelector('.lang');
const langToggleElement = document.querySelector('.lang_item');
langToggleElement.addEventListener('click', function(e) {
    langElement.classList.toggle('opened');
})
