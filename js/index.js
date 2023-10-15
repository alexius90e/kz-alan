import './map.js'

const projectNewsSlider = new Swiper('.project-news__slider .swiper', {
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.project-news__button_next',
    prevEl: '.project-news__button_prev',
  },
});

const projectReleasesSlider = new Swiper('.project-releases__slider .swiper', {
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 36,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 43,
    },
  },
});
