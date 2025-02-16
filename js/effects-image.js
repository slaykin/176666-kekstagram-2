const DEFAULT_EFFECT = 'none';

const EffectSettings = {
  none: {
    filter: 'none',
    range: {
      min: 0,
      max: 100
    },
    start: 0,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: ''
  },
};

const imageUploadForm = document.querySelector('.img-upload__form');
const effectLevel = imageUploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = imageUploadForm.querySelector('.effect-level__value');
const effectSlider = imageUploadForm.querySelector('.effect-level__slider');
const picturePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsList = imageUploadForm.querySelector('.effects__list');

let currentEffect = EffectSettings[DEFAULT_EFFECT];

noUiSlider.create(effectSlider, {
  range: currentEffect.range,
  start: currentEffect.start,
  step: currentEffect.step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
});

effectLevel.style.display = 'none';
effectSlider.setAttribute('disabled', true);

const updateSliderOptions = () => {
  const { range, start, step } = currentEffect;
  effectSlider.noUiSlider.updateOptions({
    range,
    start,
    step,
  });

  const isNoneEffect = currentEffect.filter === 'none';

  effectLevel.style.display = isNoneEffect ? 'none' : 'block';

  if (isNoneEffect) {
    effectSlider.setAttribute('disabled', true);
  } else {
    effectSlider.removeAttribute('disabled');
  }
};

const applyEffect = () => {
  const { filter, unit } = currentEffect;
  const value = effectSlider.noUiSlider.get();

  effectLevelInput.value = value;

  if (filter !== 'none') {
    picturePreview.style.filter = `${filter}(${value}${unit})`;
  } else {
    picturePreview.style.filter = '';
  }
};

const onEffectsListChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = EffectSettings[evt.target.value];
    updateSliderOptions();
    applyEffect();
  }
};

const effectReset = () => {
  currentEffect = EffectSettings[DEFAULT_EFFECT];
  updateSliderOptions();
  applyEffect();
};

effectsList.addEventListener('change', onEffectsListChange);
effectSlider.noUiSlider.on('update', applyEffect);

export { effectReset };
