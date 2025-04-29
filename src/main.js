const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Ссылки внутри моб. меню

// Функция для закрытия меню
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = ''; // Восстановить прокрутку body
}

// Функция для закрытия мобильного меню при изменении разрешения
function closeMobileMenuOnResize() {
  if (window.innerWidth >= 1280) {
    // Убираем класс "is-open", если ширина экрана >= 1280px
    mobileMenu.classList.remove('is-open');
  }
}
// Добавляем обработчик события "resize"
window.addEventListener('resize', closeMobileMenuOnResize);

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

// --- Логика для активной ссылки навигации при скролле (пример) ---
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link'); // Выбираем все ссылки навигации (десктоп и мобильные)

window.addEventListener('scroll', () => {
  let current = '';
  // Начинаем проверку с hero
  const heroSection = document.getElementById('hero');
  if (
    window.pageYOffset <
    heroSection.offsetTop + heroSection.offsetHeight - window.innerHeight / 3
  ) {
    current = 'hero';
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Уменьшаем trigger point, чтобы ссылка активировалась раньше
      const sectionTriggerPoint = sectionTop - window.innerHeight / 3;

      if (window.pageYOffset >= sectionTriggerPoint) {
        current = section.getAttribute('id');
      }
    });
  }

  // Особый случай для футера (ссылка Scroll Down ведет сюда)
  const footer = document.getElementById('footer');
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 50
  ) {
    // Если почти внизу страницы
    current = 'footer'; // Технически не секция, но для ссылки 'Scroll Down'
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    // Проверяем href.
    const linkHref = link.getAttribute('href').substring(1);

    if (linkHref === current) {
      // Исключаем подсветку "Scroll Down" как активного пункта меню
      // Исключаем подсветку ссылок в мобильном меню и футере
      if (
        linkHref !== 'footer' &&
        !link.classList.contains('mobile-nav-link') &&
        !link.closest('.footer-nav-list')
      ) {
        link.classList.add('active');
      }
    }
  });
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки

    const targetId = this.getAttribute('href').substring(1); // Получаем ID секции
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // Плавная прокрутка
        block: 'start', // Прокрутка к началу секции
      });
    }
  });
});

// Находим ссылку с классом "logo"
const logoLink = document.querySelector('.logo');

// Добавляем обработчик события "click"
logoLink.addEventListener('click', event => {
  window.location.href = '/index.html';

  // Убираем активный класс у всех пунктов меню
  const navLinks = document.querySelectorAll('.desktop-nav-list .nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  // Логика для обновления состояния (если нужно)
  console.log('Logo clicked, menu state updated.');
});

// --- Логика для кнопки "Show more" в каталоге ---
const showMoreButton = document.getElementById('show-more-catalog');
const catalogList = document.getElementById('catalog-list');
const catalogItems = catalogList.querySelectorAll('.catalog-list-item');
if (showMoreButton) {
  showMoreButton.addEventListener('click', () => {
    // Показать все элементы каталога
    catalogItems.forEach(item => {
      // Используем класс для управления видимостью, чтобы не конфликтовать с медиа-запросами
      item.classList.add('show-more-visible');
    });
    // Скрыть кнопку "Show more" после нажатия
    showMoreButton.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Находим элементы
  const saleList = document.querySelector('.sale-list');
  const mainPicture = document.getElementById('main-picture'); // Используем ID для точности
  const mainImage = mainPicture?.querySelector('.sale-main-img'); // Ищем внутри picture
  const listItems = document.querySelectorAll('.sale-list-item');

  // Проверяем, найдены ли все необходимые элементы
  if (!saleList || !mainPicture || !mainImage) {
    console.error(
      'Не удалось найти необходимые элементы галереи: saleList, main-picture или sale-main-img.'
    );
    return; // Прекращаем выполнение
  }

  // Добавляем обработчик событий на весь список (делегирование событий)
  saleList.addEventListener('click', function (event) {
    // Находим ближайший родительский элемент 'li'
    const listItem = event.target.closest('.sale-list-item');

    // Если клик был не по элементу списка или его содержимому, выходим
    if (!listItem) {
      return;
    }

    // Находим изображение миниатюры внутри элемента списка
    const thumbnailImage = listItem.querySelector('.sale-img');

    // Проверяем наличие миниатюры и необходимых data-атрибутов
    if (!thumbnailImage || !thumbnailImage.dataset.largeSrc) {
      console.warn(
        'Кликнутое изображение миниатюры не найдено или отсутствует data-large-src.'
      );
      return;
    }

    // --- Получаем данные из миниатюры ---
    const largeSrc = thumbnailImage.dataset.largeSrc;
    // Используем largeSrc по умолчанию для srcset, если data-large-srcset нет
    const largeSrcset = thumbnailImage.dataset.largeSrcset || largeSrc;
    // ВОЗВРАЩАЕМ ПОЛУЧЕНИЕ И ПАРСИНГ sourcesData
    let sourcesData = [];
    try {
      // Пытаемся распарсить JSON из data-sources. Если его нет или он некорректный, будет пустой массив.
      sourcesData = JSON.parse(thumbnailImage.dataset.sources || '[]');
    } catch (e) {
      console.error('Ошибка парсинга JSON из data-sources:', e);
      // Оставляем sourcesData пустым массивом
    }

    // --- Обновляем основное изображение (<img>) ---
    mainImage.src = largeSrc;
    mainImage.srcset = largeSrcset; // Обновляем srcset основного img

    // --- ВОЗВРАЩАЕМ ОБНОВЛЕНИЕ <source> внутри основного <picture> ---
    const mainSources = mainPicture.querySelectorAll('source');

    // Удаляем старые source элементы, чтобы избежать дублирования
    mainSources.forEach(source => source.remove());

    // --- Управление активным классом для визуального выделения ---
    listItems.forEach(item => item.classList.remove('active'));
    listItem.classList.add('active');
  });
});
