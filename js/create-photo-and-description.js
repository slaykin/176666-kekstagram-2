import {
  NAMES,
  PHOTO_COUNT,
  DESCRIPTIONS,
  MESSAGES
} from "./data";
import {getRandomInteger} from "./util";
import {getRandomArrayElement} from "./util";
import {createRandomIdFromRangeGenerator} from "./util";


const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 30);


const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => {
  const photoId = generatePhotoId();
  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };

  return photo;
};

const photos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

photos();

export {photos};
