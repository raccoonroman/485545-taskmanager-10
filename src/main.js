import {createSiteMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(boardElement, createLoadMoreButtonTemplate());
