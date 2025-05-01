const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}

function closeMobileMenuOnResize() {
  if (window.innerWidth >= 1280) {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
window.addEventListener('resize', closeMobileMenuOnResize);

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // 'hidden' Блокируем прокрутку;
});

menuClose.addEventListener('click', closeMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', event => {
  if (
    mobileMenu.classList.contains('is-open') &&
    !mobileMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const heroSection = document.getElementById('hero');
  if (
    window.window.scrollY <
    heroSection.offsetTop + heroSection.offsetHeight - window.innerHeight / 3
  ) {
    current = 'hero';
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionTriggerPoint = sectionTop - window.innerHeight / 3;
      if (window.window.scrollY >= sectionTriggerPoint) {
        current = section.getAttribute('id');
      }
    });
  }

  const footer = document.getElementById('footer');
  if (
    window.innerHeight + window.window.scrollY >=
    document.body.offsetHeight - 50
  ) {
    current = 'footer';
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href').substring(1);

    if (linkHref === current) {
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
    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', event => {
  window.location.href = './index.html';

  const navLinks = document.querySelectorAll('.desktop-nav-list .nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
});

const showMoreButton = document.getElementById('show-more-catalog');
const catalogList = document.getElementById('catalog-list');
const catalogItems = catalogList.querySelectorAll('.catalog-list-item');
if (showMoreButton) {
  showMoreButton.addEventListener('click', () => {
    catalogItems.forEach(item => {
      item.classList.add('show-more-visible');
    });
    showMoreButton.style.display = 'none';
  });
}

import saleMobTab1 from './img/sale/sale-mob-tab-1.png';
import saleMobTab2 from './img/sale/sale-mob-tab-2.png';
import saleMobTab3 from './img/sale/sale-mob-tab-3.png';
import saleMobTab4 from './img/sale/sale-mob-tab-4.png';

const sourcesData = [
  { thumbnail: saleMobTab1, large: saleMobTab1 },
  { thumbnail: saleMobTab2, large: saleMobTab2 },
  { thumbnail: saleMobTab3, large: saleMobTab3 },
  { thumbnail: saleMobTab4, large: saleMobTab4 },
];

document.querySelectorAll('.sale-list-item img').forEach((img, index) => {
  img.src = sourcesData[index].thumbnail;
  img.setAttribute('data-large-src', sourcesData[index].large);
});

document.addEventListener('DOMContentLoaded', function () {
  const saleList = document.querySelector('.sale-list');
  const mainPicture = document.getElementById('main-picture');
  const mainImage = mainPicture?.querySelector('.sale-main-img');
  const listItems = document.querySelectorAll('.sale-list-item');

  saleList.addEventListener('click', function (event) {
    const listItem = event.target.closest('.sale-list-item');

    if (!listItem) {
      return;
    }

    const thumbnailImage = listItem.querySelector('.sale-img');

    const largeSrc = thumbnailImage.dataset.largeSrc;
    const largeSrcset = thumbnailImage.dataset.largeSrcset || largeSrc;

    let sourcesData = [];
    try {
      sourcesData = JSON.parse(thumbnailImage.dataset.sources || '[]');
    } catch (e) {
      console.error('Ошибка парсинга JSON из data-sources:', e);
    }

    mainImage.src = largeSrc;
    mainImage.srcset = largeSrcset;

    const mainSources = mainPicture.querySelectorAll('source');

    mainSources.forEach(source => source.remove());
    listItems.forEach(item => item.classList.remove('active'));
    listItem.classList.add('active');
  });
});
