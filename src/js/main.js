const fadeElement = document.querySelector('.fade');

/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle')
const popupElement = document.querySelector('.popup');

function togglePopup() {
    popupElement.classList.toggle('opened');
}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    togglePopup();
}));

/* catalog menu */
const menuToggleElement = document.querySelector('.menu-toggle');
const additionalContentElement = document.querySelector('.header_additional-content');
const additionalContentCloseElement = document.querySelector('.header_additional-content-close');

function toggleMainmenu(e) {
    e.preventDefault();
    fadeElement.classList.toggle('active');
    additionalContentElement.classList.toggle('active');
}

if (menuToggleElement) {
    menuToggleElement.addEventListener('click', toggleMainmenu);
    additionalContentCloseElement.addEventListener('click', toggleMainmenu);
}

/* catalog menu */
const catalogMenuElement = document.querySelector('.menu');
const catalogMenuToggleElement = document.querySelector('.menu_toggle');
const catalogItemElements = document.querySelectorAll('.menu_list-link');
if (catalogMenuToggleElement) {
    catalogMenuToggleElement.addEventListener('click', function(e) {
        e.preventDefault();
        fadeElement.classList.toggle('active');
        catalogMenuElement.classList.toggle('active');
    });

    catalogItemElements.forEach(el => el.addEventListener('click', function(e) {
        catalogItemElements.forEach(el => {
            if (e.target !== el) {
                el.parentElement.classList.remove('active')
            }
        });
        e.target.parentElement.classList.toggle('active');
    }))
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


/* add to cart */
document.querySelectorAll('.add-to-cart').forEach(el => el.addEventListener('click', function(e) {
    e.preventDefault();
    e.target.classList.toggle('active');
}));

/* car brands */
document.querySelectorAll('.car-brands__compact .car-brands_title').forEach(el => el.addEventListener('click', function(e) {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle('active');
}));

/* toggle mobile filters */
const filtersElement = document.querySelector('.filters');
function toggleFilters() {
    filtersElement.classList.toggle('active');
    fadeElement.classList.toggle('active');
}

const filtersToggleElement = document.querySelector('.filters-toggle');
if (filtersToggleElement) {
    filtersToggleElement.addEventListener('click', function(e) {
        e.preventDefault();

        if (filtersElement) {
            toggleFilters();
        }
    });

    document.querySelector('.filters_title').addEventListener('click', function () {
        toggleFilters();
    });
    document.querySelectorAll('.filters_section-title').forEach(el => el.addEventListener('click', function (e) {
        e.target.parentElement.classList.toggle('active');
    }));
}
