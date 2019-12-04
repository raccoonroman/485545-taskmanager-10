import SiteMenuComponent from './components/site-menu';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import SortingComponent from './components/sorting';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import LoadMoreButtonComponent from './components/load-more-button';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {RenderPosition, render} from './utils.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new BoardComponent().getElement(), RenderPosition.BEFOREEND);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, new SortingComponent().getElement(), RenderPosition.AFTERBEGIN);
render(taskListElement, new TaskEditComponent(tasks[0]).getElement(), RenderPosition.BEFOREEND);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks
  .slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

render(boardElement, new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = boardElement.querySelector(`.load-more`);


loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks
    .slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
