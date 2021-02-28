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


/* footer menu */
const footerTitles = document.querySelectorAll('.footer_menu-title');
footerTitles.forEach(el => el.addEventListener('click', function(e) {
    e.target.nextElementSibling.classList.toggle('active');
}))
