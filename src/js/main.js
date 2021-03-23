const fadeElement = document.querySelector('.fade');
const fadeMobileElement = document.querySelector('.fade__mobile');

function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
}

if (fadeElement) {
    fadeElement.addEventListener('click', closeAllOpened);
}
if (fadeMobileElement) {
    fadeMobileElement.addEventListener('click', closeAllOpened);
}

/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle')
const popupElement = document.querySelector('.popup');

function togglePopup() {
    popupElement.classList.toggle('opened');
    fadeElement.classList.toggle('opened');
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
    fadeElement.classList.toggle('opened');
    additionalContentElement.classList.toggle('opened');
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
        fadeMobileElement.classList.toggle('opened');
        catalogMenuElement.classList.toggle('opened');
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
    filtersElement.classList.toggle('opened');
    fadeElement.classList.toggle('opened');
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

/* Tabs */
const tabsButtons = document.querySelectorAll('.tabs_button');
const tabsBlocks = document.querySelectorAll('.tabs_content');

if (tabsButtons.length) {
    function switchTab(e) {
        e.preventDefault();

        const index = e.target.dataset.tabLink;
        tabsButtons.forEach(el => el.classList.remove('active'));
        tabsBlocks.forEach(el => el.classList.remove('active'));

        tabsButtons[index - 1].classList.add('active');
        tabsBlocks[index - 1].classList.add('active');
    }

    tabsButtons.forEach(el => el.addEventListener('click', switchTab));
}

/* Search */
const headerSearchInput = document.querySelector('.js-header-search');
const searchPopup = document.querySelector('.search-popup');

const searchInput = document.querySelector('.js-search-input');
const searchContainers = document.querySelectorAll('.js-search-container');
const searchVisibilityContainers = document.querySelectorAll('.js-visibility-container');

if (headerSearchInput) {
    headerSearchInput.addEventListener('input', function(e) {
        const value = e.target.value;

        searchPopup.classList.toggle('opened');
        fadeElement.classList.toggle('opened');
        searchInput.value = value;
        searchInput.focus();
    });
}

if (searchInput) {
    function highlightSerachResuts(e) {
        const value = e.target.value;
        const lowerCasedValue = e.target.value.toLowerCase();

        searchContainers.forEach(el => {
            const lowerCasedHTML = el.innerText.toLowerCase();
            if (value && lowerCasedHTML.includes(lowerCasedValue)) {
                let html = el.innerText;
                const newValue = html.substring(lowerCasedHTML.indexOf(lowerCasedValue), lowerCasedHTML.indexOf(lowerCasedValue) + lowerCasedValue.length);
                html = `${html.substring(0, lowerCasedHTML.indexOf(lowerCasedValue))}<span class="marker">${newValue}</span>${html.substring(lowerCasedHTML.indexOf(lowerCasedValue) + value.length)}`
                el.innerHTML = html;
            } else {
                el.innerHTML = el.innerText;
            }
        });
        searchVisibilityContainers.forEach(el => {
            const lowerCasedHTML = el.innerText.toLowerCase();
            if (value) {
                if (lowerCasedHTML.includes(lowerCasedValue)) {
                    el.style.display = 'block';
                } else {
                    el.style.display = 'none';
                }
            } else {
                el.style.display = 'block';
            }
        });
    } 

    searchInput.addEventListener('input', highlightSerachResuts);

    searchInput.addEventListener('input', debounce(function () {
        // аякс запрос
        console.log(12111);
    }, 1000));
}

/* load more */
const loadMoreButton = document.querySelector('.more-button');
if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function(e) {
        e.target.classList.add('active');

        setTimeout(() => {
            e.target.classList.remove('active');
        }, 1000);
    });
}

/* input numbers */
const inputNumberMinusElements = document.querySelectorAll('.js-input-number-minus');
const inputNumberPLusElements = document.querySelectorAll('.js-input-number-plus');

if (inputNumberMinusElements.length) {
    function decerease(e) {
        e.target.nextElementSibling.value = Number(e.target.nextElementSibling.value) - 1;
    }

    inputNumberMinusElements.forEach(el => el.addEventListener('click', decerease));
}
if (inputNumberPLusElements.length) {
    function incerease(e) {
        e.target.previousElementSibling.value = Number(e.target.previousElementSibling.value) + 1;
    }

    inputNumberPLusElements.forEach(el => el.addEventListener('click', incerease));
}

/* Tabs in form */
const formTabsButtons = document.querySelectorAll('.form_tabs-button');
const formTabsBlocks = document.querySelectorAll('.form_tabs-content');

if (formTabsButtons.length) {
    function switchTab(e) {
        e.preventDefault();

        const index = e.target.dataset.tabLink;
        formTabsButtons.forEach(el => el.classList.remove('active'));
        formTabsBlocks.forEach(el => el.classList.remove('active'));

        formTabsButtons[index - 1].classList.add('active');
        formTabsBlocks[index - 1].classList.add('active');
    }

    formTabsButtons.forEach(el => el.addEventListener('click', switchTab));
}

function debounce(func, wait, immediate = false) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};
