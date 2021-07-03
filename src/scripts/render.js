import { getTasksList } from './storage.js';

/*export const renderTasks = () => {
  const listElem = document.querySelector('.list');
  const tasksList = getTasksList('tasksList')
  listElem.innerHTML = '';
  const tasksElems = tasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = done;
      checkbox.classList.add('list__item-checkbox');
      checkbox.dataset.id = id;
      if (done) {
        listItemElem.classList.add('list__item_done');
      }
      listItemElem.append(checkbox, text);
      return listItemElem;
    });
  listElem.append(...tasksElems);
};*/

//import { getItem } from './storage.js';

const listElem = document.querySelector('.list');

const createCheckbox = ({ done, id }) => {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('data-id', id);
  checkbox.checked = done;
  checkbox.classList.add('list__item-checkbox');

  return checkbox;
};

const createListItem = ({ text, done, id }) => {
  const listItemElem = document.createElement('li');
  listItemElem.classList.add('list__item');
  const checkbox = createCheckbox({ done, id });

  if (done) {
    listItemElem.classList.add('list__item_done');
  }

  const textElem = document.createElement('span');
  textElem.classList.add('list-item__text');
  textElem.textContent = text;

  const deleteBtnElem = document.createElement('button');
  deleteBtnElem.classList.add('list-item__delete-btn');

  listItemElem.append(checkbox, textElem, deleteBtnElem);
  return listItemElem;
};

export const renderTasks = () => {
  const tasksList = getTasksList('tasksList'); //|| [];
  const tasksElems = tasksList.then((response) => {
    const res = response.sort(compareTasks).map(createListItem);
    return Promise.all(res)
  });

  listElem.innerHTML = '';

  //const tasksElems = tasksList.sort(compareTasks).map(createListItem);

  listElem.append(...tasksElems);
};

const compareTasks = (a, b) => {
  if (a.done - b.done !== 0) {
    return a.done - b.done;
  }
};
