import Swiper, {Navigation, Pagination} from 'swiper';
Swiper.use([Navigation, Pagination]);

const newsSwiper = new Swiper('.news__container', {
  slidesPerView: 1,
  spaceBetween: 16,
  freeMode: true,
  loop: true,
  loopedSlides: 6,
  navigation: {
    nextEl: '.news__arrow--right',
    prevEl: '.news__arrow--left',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      centeredSlides: true,
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});

export {newsSwiper};
