const RADIX = 10;
const DEFAULT_SLIDER_OPTIONS = {
  range: {
    'min': 0,
    'max': 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

const imageUploadForm = document.querySelector('.img-upload__form');
const effectsList = imageUploadForm.querySelector('.effects__list');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview');
const effectLevel = imageUploadForm.querySelector('.effect-level');
const effectLevelValue = imageUploadForm.querySelector('.effect-level__value');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const imageElement = imagePreview.querySelector('img');

const sliderEffects = {
  none: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: () => {
      effectLevel.classList.add('hidden');
      return 'none';
    },
  },
  chrome: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value);
      return `grayscale(${value})`;
    },
  },
  sepia: {
    options: {
      ...DEFAULT_SLIDER_OPTIONS,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value);
      return `sepia(${value})`;
    }
  },
  marvin: {
    options: {
      range: {
        'min': 1,
        'max': 100
      },
      start: 100,
      step: 1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseInt(value, RADIX);
      return `invert(${value}%)`;
    }
  },
  phobos: {
    options: {
      range: {
        'min': 0,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value);
      return `blur(${value}px)`;
    }
  },
  heat: {
    options: {
      range: {
        'min': 1,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value);
      return `brightness(${value})`;
    }
  },
};

const createFilters = () => {
  sliderEffects.none.effect();
  noUiSlider.create(sliderElement, DEFAULT_SLIDER_OPTIONS);
};

const updateOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions(sliderEffects[effect].options);
};

const changeEffectLevel = (effect) => {
  sliderElement.noUiSlider.on('slide', (value) => {
    imageElement.style.filter = sliderEffects[effect].effect(value);
  });
};

const applyImageFilter = (effect) => {
  const startPointFilter = sliderEffects[effect].options.range.max;
  imageElement.style.filter = sliderEffects[effect].effect(startPointFilter);
};

const onEffectsListChange = (evt) => {
  evt.preventDefault();

  const target = evt.target.closest('.effects__item').querySelector('input');
  const effect = target.id.replace('effect-', '');

  target.checked = true;

  updateOptions(effect);
  applyImageFilter(effect);
  changeEffectLevel(effect);
};

effectsList.addEventListener('change', onEffectsListChange);

const resetEffect = () => {
  effectLevelValue.value = '';
  imageElement.style.removeProperty('filter');

  sliderElement.noUiSlider.updateOptions(DEFAULT_SLIDER_OPTIONS);
  effectsList.querySelector('#effect-none').checked = true;
  sliderEffects.none.effect();
};

export { createFilters, resetEffect };
