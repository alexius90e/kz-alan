const mapButtons = document.querySelectorAll('.interactive-map__map-button');
const mapPins = document.querySelectorAll('.interactive-map__pin');
const mapAreas = document.querySelectorAll('.interactive-map__area');
const mapGalleryButtons = document.querySelectorAll('.interactive-map__map-button-gallery');
const mapItems = [...mapButtons, ...mapPins, ...mapAreas, ...mapGalleryButtons];
const mapGalleryWrapper = document.querySelector('.interactive-map__map-wrapper');

[...mapPins, ...mapAreas].forEach((item) =>
  item.addEventListener('click', (event) => {
    const [_, location] = event.currentTarget.classList;
    updateMap(location);
  })
);

mapButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const isGalleryButton = event.target.classList.contains('interactive-map__map-button-gallery');
    const location = event.currentTarget.dataset.location;

    if (isGalleryButton) {
      const isActive = event.target.classList.contains('active');
      if (!isActive) {
        mapItems.forEach((button) => button.classList.remove('active'));
        [event.currentTarget, event.target].forEach((elem) => elem.classList.add('active'));
        showGallery(location);
      } else {
        [event.currentTarget, event.target].forEach((elem) => elem.classList.remove('active'));
        hideGallery();
        updateMap(location);
      }
    } else {
      const isActive = event.currentTarget.classList.contains('active');
      if (isActive) {
        mapGalleryButtons.forEach((button) => button.classList.remove('active'));
        hideGallery();
      } else {
        mapButtons.forEach((button) => button.classList.remove('active'));
        mapGalleryButtons.forEach((button) => button.classList.remove('active'));
        hideGallery();
        updateMap(location);
      }
    }
  });
});

function updateMap(location) {
  [...mapButtons, ...mapPins, ...mapAreas].forEach((element) => {
    const isTheSameArea = element.classList.contains(location);
    if (isTheSameArea) {
      element.classList.toggle('active');
    } else {
      element.classList.remove('active');
    }
  });
}

function hideGallery() {
  if (mapGalleryWrapper) mapGalleryWrapper.setAttribute('class', 'interactive-map__map-wrapper');
}

function showGallery(location) {
  if (mapGalleryWrapper && location)
    mapGalleryWrapper.setAttribute('class', `interactive-map__map-wrapper ${location}`);
}

if (mapGalleryWrapper) {
  const mapGallerySwipers = mapGalleryWrapper.querySelectorAll('.swiper');

  mapGallerySwipers.forEach((swiper) => {
    const pagination = swiper.querySelector('.swiper-pagination');
    const nextButton = swiper.querySelector('.swiper-button-next');
    const prevButton = swiper.querySelector('.swiper-button-prev');

    new Swiper(swiper, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      pagination: {
        el: pagination,
      },

      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
    });
  });
}

const swiper = new Swiper('.interactive-map__plans .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 1500,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    400: {
      slidesPerView: 1.5,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 16,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
