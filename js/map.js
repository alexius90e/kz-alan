const mapButtons = document.querySelectorAll('.interactive-map__map-button');
const mapPins = document.querySelectorAll('.interactive-map__pin');
const mapAreas = document.querySelectorAll('.interactive-map__area');
const mapItems = [...mapButtons, ...mapPins, ...mapAreas];

mapItems.forEach((item) => item.addEventListener('click', handleMapItemClick));

function handleMapItemClick(event) {
  const [_, areaName] = event.currentTarget.classList;
  mapItems.forEach((element) => {
    const isTheSameArea = element.classList.contains(areaName);
    if (isTheSameArea) element.classList.toggle('active');
    if (!isTheSameArea) element.classList.remove('active');
  });
}
