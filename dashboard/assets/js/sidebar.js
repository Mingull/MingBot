// const menuBtn = document.querySelector('.menu-btn');
// let menuOpen = false;
// menuBtn.addEventListener('click', () => {
//     if (!menuOpen) {
//         menuBtn.classList.add('open');
//         menuOpen = true;
//     } else {
//         menuBtn.classList.remove('open');
//         menuOpen = false;
//     }
// })

$('.menu-btn').on('click', function () {
    $(this).toggleClass('open')
    $('#sidebarExtension').toggleClass('closed');
    $('.module').toggleClass('closed');
});