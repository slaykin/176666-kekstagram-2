const EFFECT_RADIX = 10;
const EFFECT_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;
const DEFAULT_EFFECT = 'none';
const DEFAULT_EFFECT_LEVEL = 100;

const SliderConfig = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const imageUploadForm = document.querySelector('.img-upload__form');
const effectLevel = imageUploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = imageUploadForm.querySelector('.effect-level__value');
const effectSlider = imageUploadForm.querySelector('.effect-level__slider');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsList = imageUploadForm.querySelector('.effects__list');
const slider = imageUploadForm.querySelector('.effect-level__slider');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(effectSlider , {
  range: {
    min: SliderConfig.MIN,
    max: SliderConfig.MAX,
  },
  step: SliderConfig.STEP,
  start: DEFAULT_EFFECT_LEVEL,
  connect: 'lower',
});

const getEffectValue = () => parseInt(effectLevelInput.value, EFFECT_RADIX);

const effects = {
  none: () => 'none',
  chrome: () => `grayscale(${getEffectValue() * EFFECT_STEP})`,
  sepia: () => `sepia(${getEffectValue() * EFFECT_STEP})`,
  marvin: () => `invert(${Math.floor(effectLevelInput.value)}%)`,
  phobos: () => `blur(${getEffectValue() * MAX_BLUR_VALUE * EFFECT_STEP}px)`,
  heat: () => `brightness(${getEffectValue() * MAX_BRIGHTNESS * EFFECT_STEP})`,
};

const sliderReset = () => {
  effectSlider.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
  effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
  effectLevel.classList.toggle('hidden', currentEffect === DEFAULT_EFFECT);
};

const effectUpdate = () => {
  imagePreview.style.filter = effects[currentEffect]();
};

const effectReset = () => {
  currentEffect = DEFAULT_EFFECT;
  sliderReset();
  effectUpdate();
};

const onEffectsListClick = (evt) => {
  const target = evt.target.closest('.effects__item');
  if (target) {
    const effectRadio = target.querySelector('.effects__radio');
    if (effectRadio) {
      currentEffect = effectRadio.value;
      sliderReset();
      effectUpdate();
    }
  }
};

const onSliderUpdate = () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectUpdate();
};

effectsList.addEventListener('click', onEffectsListClick);
slider.noUiSlider.on('update', onSliderUpdate);

export { effectReset };
