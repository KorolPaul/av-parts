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

/* catalog menu */
const menuElement = document.querySelector('.menu');
const menuToggleElement = document.querySelector('.menu_toggle');
if (menuToggleElement) {
    menuToggleElement.addEventListener('click', function(e) {
        e.preventDefault();
        menuElement.classList.toggle('active');
    });
}

/* footer menu */
const footerTitles = document.querySelectorAll('.footer_menu-title');
footerTitles.forEach(el => el.addEventListener('click', function(e) {
    e.target.nextElementSibling.classList.toggle('active');
}))

/* SELECT CUSTOMIZATION */
document.querySelectorAll('select').forEach(el => { new Choices(el, { searchEnabled: true, })});

/* parts list dropdown */
const partsListCategories = document.querySelectorAll('.parts-list_item-title');
if (partsListCategories.length) {
    partsListCategories.forEach(el => { el.addEventListener('click', function(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('active');
    }) })
}
