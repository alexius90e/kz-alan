const mapButtons = document.querySelectorAll('.interactive-map__button');
const mapPins = document.querySelectorAll('.interactive-map__pin');
const mapAreas = document.querySelectorAll('.interactive-map__area');
const mapGalleryButtons = document.querySelectorAll('.interactive-map__button-gallery');
const mapItems = [...mapButtons, ...mapPins, ...mapAreas, ...mapGalleryButtons];
const mapGalleryWrapper = document.querySelector('.interactive-map__map-wrapper');

[...mapPins].forEach((pin) =>
  pin.addEventListener('click', (event) => {
    const isActive = event.currentTarget.classList.contains('active');
    const { area, location } = event.currentTarget.dataset;
    const targetAreas = [...mapAreas].filter((areaEl) => areaEl.dataset.area === area);
    const targetButtons = [...mapButtons].filter((buttonEl) => {
      return buttonEl.dataset.area === area && buttonEl.dataset.location === location;
    });
    const activePins = [...mapPins].filter((pinEl) => {
      return pinEl.classList.contains('active') && pinEl.dataset.area === area;
    });
    if (activePins.length === 0) {
      console.log(activePins.length);
      updateMap([event.currentTarget, ...targetAreas, ...targetButtons]);
    } else if (activePins.length === 1) {
      if (isActive) {
        resetMap();
      } else {
        updateMap([event.currentTarget, ...targetAreas, ...targetButtons]);
      }
    } else {
      updateMap([event.currentTarget, ...targetAreas, ...targetButtons]);
    }
  })
);

[...mapAreas].forEach((areaEl) =>
  areaEl.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('active')) {
      resetMap();
      return;
    }
    const { area } = event.currentTarget.dataset;
    const targetPins = [...mapPins].filter((pinEl) => pinEl.dataset.area === area);
    const targetButtons = [...mapButtons].filter((buttonEl) => buttonEl.dataset.area === area);
    updateMap([event.currentTarget, ...targetPins, ...targetButtons]);
  })
);

[...mapButtons].forEach((buttonEl) =>
  buttonEl.addEventListener('click', (event) => {
    const isActive = event.currentTarget.classList.contains('active');
    const { area, location } = event.currentTarget.dataset;
    const targetAreas = [...mapAreas].filter((areaEl) => areaEl.dataset.area === area);
    const targetPins = [...mapPins].filter((pinEl) => {
      return pinEl.dataset.area === area && pinEl.dataset.location === location;
    });
    const targetButtons = [...mapButtons].filter((buttonEl) => {
      return buttonEl.dataset.area === area && buttonEl.dataset.location === location;
    });
    const galleryButtonEl = event.currentTarget.querySelector('.interactive-map__button-gallery');
    const isGalleryButton = event.target === galleryButtonEl;

    if (isActive) {
      if (isGalleryButton) {
        const isGalleryActive = event.target.classList.contains('active');
        if (!isGalleryActive) {
          targetButtons.forEach((buttonEl) => {
            const galleryButtonEl = buttonEl.querySelector('.interactive-map__button-gallery');
            if (galleryButtonEl) galleryButtonEl.classList.add('active');
          });
          showGallery(area, location);
        } else {
          targetButtons.forEach((buttonEl) => {
            const galleryButtonEl = buttonEl.querySelector('.interactive-map__button-gallery');
            if (galleryButtonEl) galleryButtonEl.classList.remove('active');
          });
          hideGallery();
        }
      } else {
        resetMap();
        galleryButtonEl.classList.remove('active');
        hideGallery();
      }
    } else {
      updateMap([...targetButtons, ...targetPins, ...targetAreas]);
      if (isGalleryButton) {
        const isGalleryActive = event.target.classList.contains('active');
        if (!isGalleryActive) {
          targetButtons.forEach((buttonEl) => {
            const galleryButtonEl = buttonEl.querySelector('.interactive-map__button-gallery');
            if (galleryButtonEl) galleryButtonEl.classList.add('active');
          });
          showGallery(area, location);
        } else {
          targetButtons.forEach((buttonEl) => {
            const galleryButtonEl = buttonEl.querySelector('.interactive-map__button-gallery');
            if (galleryButtonEl) galleryButtonEl.classList.remove('active');
          });
          hideGallery();
        }
      }
    }
  })
);

function resetMap() {
  const allElemets = [...mapButtons, ...mapPins, ...mapAreas];
  allElemets.forEach((element) => element.classList.remove('active'));
  resetGallery();
}

function updateMap(targetElemets) {
  const allElemets = [...mapButtons, ...mapPins, ...mapAreas];

  allElemets.forEach((element) => {
    if (targetElemets.includes(element)) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });

  resetGallery();
}

function resetGallery() {
  const galleryButtons = document.querySelectorAll('.interactive-map__button-gallery');
  galleryButtons.forEach((element) => element.classList.remove('active'));
  const galleryItems = document.querySelectorAll('.interactive-map__map-gallery-item');
  galleryItems.forEach((element) => element.classList.remove('active'));
  if (mapGalleryWrapper) {
    mapGalleryWrapper.classList.remove('gallery-visible');
  }
}

function hideGallery() {
  if (mapGalleryWrapper) mapGalleryWrapper.classList.remove('gallery-visible');
  resetGallery();
}

function showGallery(area, location) {
  if (mapGalleryWrapper && location && area) {
    const galleryItems = document.querySelectorAll(
      `.interactive-map__map-gallery-item[data-location="${location}"][data-area="${area}"]`
    );
    if (galleryItems.length > 0) {
      galleryItems.forEach((galleryItem) => galleryItem.classList.add('active'));
      mapGalleryWrapper.classList.add('gallery-visible');
    } else {
      resetGallery();
    }
  }
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

const mobileButtonsSwiperEl = document.querySelector('.interactive-map__mobile-buttons .swiper');
const mobileButtonsPrevEl = document.querySelector(
  '.interactive-map__mobile-buttons-controls-prev'
);
const mobileButtonsNextEl = document.querySelector(
  '.interactive-map__mobile-buttons-controls-next'
);
const mobileButtonsPaginationEl = document.querySelector(
  '.interactive-map__mobile-buttons-controls-pagination'
);

if (mobileButtonsSwiperEl) {
  const mobileButtonsSwiper = new Swiper(mobileButtonsSwiperEl, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: mobileButtonsNextEl,
      prevEl: mobileButtonsPrevEl,
    },
    pagination: {
      el: mobileButtonsPaginationEl,
    },
  });
}
