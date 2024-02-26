/**
 * This is to enable nav bar to stick when scrolling, keeping the gradient feature only when scrolling
 */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    // check if the window width is more than 992px
    if (window.innerWidth > 992) {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
});