import {debounce} from '../utils/debounce';

const setVhVariable = () => {
  let vh = window.innerHeight * 0.01;
  if (window.scrollY === 0) { // добавлена проверка т.к. приводило к скачку контента при скролле на ios
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
};

const setVhDebounced = debounce(function () {
  setVhVariable();
}, 250);

const onResizeSetVh = () => {
  window.addEventListener('resize', setVhDebounced);
};

export {onResizeSetVh, setVhVariable};
