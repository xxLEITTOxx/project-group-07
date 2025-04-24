const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Ссылки внутри моб. меню

// Функция для закрытия меню
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = ''; // Восстановить прокрутку body
}

// Открыть меню
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Запретить прокрутку body
});

// Закрыть меню по кнопке X
menuClose.addEventListener('click', closeMenu);

// Закрыть меню при клике на ссылку внутри меню
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Закрыть меню при клике вне области меню (опционально)
document.addEventListener('click', event => {
  if (
    mobileMenu.classList.contains('is-open') &&
    !mobileMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});
