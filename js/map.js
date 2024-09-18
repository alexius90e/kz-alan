const mapButtons = document.querySelectorAll('.interactive-map__map-button');
const mapPins = document.querySelectorAll('.interactive-map__pin');
const mapAreas = document.querySelectorAll('.interactive-map__area');
const mapGalleryButtons = document.querySelectorAll('.interactive-map__map-button-gallery');
const mapItems = [...mapButtons, ...mapPins, ...mapAreas];
const mapGalleryWrapper = document.querySelector('.interactive-map__map-wrapper');

mapItems.forEach((item) => item.addEventListener('click', handleMapItemClick));

function handleMapItemClick(event) {
  const [_, areaName] = event.currentTarget.classList;
  const isGalleryButton = event.target.classList.contains('interactive-map__map-button-gallery');

  mapItems.forEach((element) => {
    const isTheSameArea = element.classList.contains(areaName);
    if (isTheSameArea && !isGalleryButton) element.classList.toggle('active');
    if (isTheSameArea && isGalleryButton) element.classList.add('active');
    if (!isTheSameArea) {
      element.classList.remove('active');
    }
  });
}

mapGalleryButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const isActive = event.target.classList.contains('active');
    const location = event.currentTarget.dataset.location;
    if (!isActive) {
      event.currentTarget.classList.add('active');
      if (mapGalleryWrapper)
        mapGalleryWrapper.setAttribute('class', `interactive-map__map-wrapper ${location}`);
    } else {
      event.currentTarget.classList.remove('active');
      if (mapGalleryWrapper)
        mapGalleryWrapper.setAttribute('class', 'interactive-map__map-wrapper');
    }
  });
});

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
