import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-rendering.js';
import { showAlert, displayImageFilterButtons, debounce } from './util.js';
import { sortPhotos } from './photo-sorting.js';
import { createFilters } from './create-filters.js';
import './send-form-data.js';

createFilters();

const initApplication = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    displayImageFilterButtons();
    sortPhotos(
      photos,
      debounce((sortPhotosList) => renderThumbnails(sortPhotosList))
    );
  } catch (err) {
    showAlert(err.message);
  }
};

initApplication();
