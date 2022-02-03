$('body').on('click', 'a.pages_link, button.more-button', function (e) {
    e.preventDefault();

    var href = $(this).attr('href') + ' div.catalog>*';
    $('div.catalog').load(href);
    history.pushState(null, null, $(this).attr('href'));
    var obj = document.getElementsByClassName('catalog');
    $('html').animate({scrollTop: (obj[0].offsetTop - 100) + 'px'}, 300);

    setTimeout(() => {
        document.querySelectorAll('select[name="sort"]').forEach(el => {
            new Choices(el, {searchEnabled: true,})
        });
    }, 300);

    return false;
});
