import {colors} from './../const';

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
  `Выучить наконец английский`,
  `Пожарить картошку`,
  `Почистить зубы`,
];

const repeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `beauty`, `madness`, `passion`, `dignity`];

const getRandomBooleanValue = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBooleanValue() ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDays = () => Object
  .assign({}, repeatingDays, {'mo': getRandomBooleanValue()});

const generateTags = (tagsList) => tagsList
  .filter(getRandomBooleanValue)
  .slice(0, 3);

const generateTask = () => {
  const dueDate = getRandomBooleanValue() ? null : getRandomDate();
  return {
    description: getRandomArrayItem(descriptionItems),
    dueDate,
    repeatingDays: dueDate ? repeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(tags)),
    color: getRandomArrayItem(colors),
    isFavorite: getRandomBooleanValue(),
    isArchive: getRandomBooleanValue(),
  };
};

const generateTasks = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateTask());
  }
  return result;
};

export {generateTask, generateTasks};
