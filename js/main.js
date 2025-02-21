import { getData } from './api.js';
import { renderThumbnails } from './thumbnail-rendering.js';
import { showAlert } from './util.js';
import { createFilters } from './create-filters.js';
import './send-form-data.js';

createFilters();

const initApplication = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
  } catch (err) {
    showAlert(err.message);
  }
};

initApplication();
