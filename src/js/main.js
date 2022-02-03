const fadeElement = document.querySelector('.fade');
const fadeMobileElement = document.querySelector('.fade__mobile');

function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.mobile-menu-opened').forEach(el => el.classList.remove('mobile-menu-opened'));
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
    document.body.classList.toggle('mobile-menu-opened');
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
document.querySelectorAll('select.select').forEach(el => { new Choices(el, { searchEnabled: true, })});

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
    $.ajax({
        url: '/cart/add-to-cart',
        type: 'post',
        dataType: 'json',
        data: { productId : e.target.value }
    })
        .done(function(response) {
            if (response.data.success === true) {
                responseValues = response.data.values;
                $('span.cart_count').html(responseValues.count);
                $('span.cart_value').html(responseValues.total);
                e.target.innerHTML = 'В корзине';
                e.target.classList.toggle('active');
            }
        })
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
const header = document.querySelector('.header');
const loader = document.querySelector('.loader');

const searchInput = document.querySelector('.js-search-input');
const searchInputTree = document.querySelector('.js-search-input-tree');
const searchContainers = document.querySelectorAll('.js-search-container');
const searchVisibilityContainers = document.querySelectorAll('.js-visibility-container');

if (headerSearchInput && screen.width > 768) {
    function onInputChange(e) {
        const value = e.target.value;

        searchPopup.classList.toggle('opened');
        $('.search-popup .cards').html('');
        header.classList.toggle('popup-opened');
        fadeElement.classList.toggle('opened');
        searchInput.value = value;
        searchInput.focus();
    }

    headerSearchInput.addEventListener('input', onInputChange);
    headerSearchInput.addEventListener('paste', onInputChange);
}

if (searchInputTree) {
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
        let resultsCount = 0;
        searchVisibilityContainers.forEach(el => {
            const lowerCasedHTML = el.innerText.toLowerCase();
            if (value) {
                if (lowerCasedHTML.includes(lowerCasedValue)) {
                    el.style.display = 'block';
                    resultsCount++;
                } else {
                    el.style.display = 'none';
                }
            } else {
                el.style.display = 'block';
            }
        });
        
        const listItems = document.querySelectorAll('.parts-list_item');
        listItems.forEach(el => {
            el.dataset.count = el.querySelectorAll('.js-visibility-container[style="display: block;"]').length;
        });
    }

    searchInputTree.addEventListener('input', highlightSerachResuts);
}

if (searchInput) {
    searchInput.addEventListener('input', debounce(function (e) {
        // аякс запрос
        const value = e.target.value;

        /*************** start *******************/
        
        if (value !== '') {
            content = '';
            $('.search-popup .cards').html('');
            loader.classList.add('active');

            $.ajax({
                url: '/car-ajax/search-article',
                type: 'post',
                dataType: 'json',
                data: { article : value }
            })
                .done(function(response) {
                    loader.classList.remove('active');
                    if (response.data.success === true) {
                        responseValues = response.data.values;
    
                        for (let key in responseValues) {
                            content +=
                                '<div class="card">'+
                                    '<div class="card_left">'+
                                        '<a href="'+responseValues[key].urlKey+'"><img src="'+responseValues[key].image+'" alt="" class="card_image card_image__small"></a>'+
                                        '<div class="card_data">'+
                                            '<a href="'+responseValues[key].urlKey+'" class="card_title js-search-container"><span style="color: red">'+responseValues[key].article+'</span> '+responseValues[key].TradeMarkName+'</a>'+
                                            '<span class="card_subtitle">'+responseValues[key].PartName+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="card_controls">'+
                                        responseValues[key].availability;
                                        if(responseValues[key].retailPrice != ''){
                                            content += '<div class="card_price">'+
                                                '<span class="price">'+responseValues[key].retailPrice+'</span>'+
                                            '</div>';
                                        }
                             content += '</div>'+
                                '</div>';
                        };
                    }else{
                        content = '<div class="card">'+
                            '<div class="card_left">'+
                            '<div class="card_data">'+
                            '<span class="card_subtitle">Ничего не найдено</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                    }
                    $('.search-popup div.cards').html(content);
    
                })
        }
    }, 600));

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
const deleteElements = document.querySelectorAll('.cart-table_delete');

if (inputNumberMinusElements.length) {
    function decerease(e) {
        if(e.target.nextElementSibling.value > 1){
            e.target.nextElementSibling.value = Number(e.target.nextElementSibling.value) - 1;
            $.ajax({
                url: '/cart/minus',
                type: 'post',
                dataType: 'json',
                data: { basketId : e.target.value }
            })
                .done(function(response) {
                    $('span.cart-total').html(response);
                })
        }
    }

    inputNumberMinusElements.forEach(el => el.addEventListener('click', decerease));
}
if (inputNumberPLusElements.length) {
    function incerease(e) {
        e.target.previousElementSibling.value = Number(e.target.previousElementSibling.value) + 1;
        $.ajax({
            url: '/cart/plus',
            type: 'post',
            dataType: 'json',
            data: { basketId : e.target.value }
        })
            .done(function(response) {
                $('span.cart-total').html(response);
          })
    }

    inputNumberPLusElements.forEach(el => el.addEventListener('click', incerease));
}

if (deleteElements.length) {
    function deleteRow(e) {
        $.ajax({
            url: '/cart/delete',
            type: 'post',
            dataType: 'json',
            data: {basketId: e.target.value}
        })
            .done(function (response) {
                e.target.closest('tr').remove();
                $('span.cart-total').html(response);
                if($('table.cart-table tbody tr').length < 1){
                    location.href = '/cart';
                }
            })
    }

    deleteElements.forEach(el => el.addEventListener('click', deleteRow));
}

/* Tabs in form */
const formTabsButtons = document.querySelectorAll('.form_tabs-button');
const formTabsBlocks = document.querySelectorAll('.form_tabs-content');

if (formTabsButtons.length) {
    function switchTab(e) {
        e.preventDefault();
        const index = Number(e.target.dataset.tabLink);
        formTabsButtons.forEach(el => {
            el.classList.remove('active');
            el.querySelector('input').removeAttribute('checked');
        });
        formTabsBlocks.forEach(el => el.classList.remove('active'));

        formTabsButtons[index - 1].classList.add('active');
        formTabsButtons[index - 1].querySelector('input').setAttribute('checked', 'checked');
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

/* Gallery */
if (typeof lightGallery !== "undefined") {
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
    });
}
