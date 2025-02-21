const RANDOM_PHOTOS_COUNT = 10;
const ACTIVE_CLASS_NAME = 'img-filters__button--active';

const filters = {
  default: {
    id: 'filter-default',
  },
  random: {
    id: 'filter-random',
    toSorted: (photos) => photos.toSorted(() => 0.5 - Math.random()),
  },
  discussed: {
    id: 'filter-discussed',
    toSorted: (photos) => photos.toSorted((a, b) => b.comments.length - a.comments.length),
  },
};

const filterButtonsContainer = document.querySelector('.img-filters.container');
const filterButtons = filterButtonsContainer.querySelectorAll('.img-filters__button');

const changeActiveClassName = (buttons, evt) => {
  buttons.forEach((button) => {
    if (button.className.includes(ACTIVE_CLASS_NAME)) {
      button.classList.toggle(ACTIVE_CLASS_NAME);
      evt.target.classList.toggle(ACTIVE_CLASS_NAME);
    }
  });
};

const sortPhotos = (photos, cb) => {
  const onFilterButtonClick = (evt) => {
    changeActiveClassName(filterButtons, evt);

    if (evt.target.id === filters.random.id) {
      cb(filters.random.toSorted(photos).slice(0, RANDOM_PHOTOS_COUNT));
    } else if (evt.target.id === filters.discussed.id) {
      cb(filters.discussed.toSorted(photos));
    } else {
      cb(photos);
    }
  };

  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', onFilterButtonClick);
  });
};

export { sortPhotos };
