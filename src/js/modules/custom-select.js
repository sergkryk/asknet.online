// import {getParent, returnParent} from '../utils';

const ENTER_KEY_CODE = 13;
const allActivElement = document.querySelectorAll('input, checkbox, a, button, textarea, radio, select, option');
const customSelectsWrapper = document.querySelectorAll('.custom-input__wrapper');
const customSelectsInputs = document.querySelectorAll('.custom-input__wrapper input');
const customSelectsItems = document.querySelectorAll('.custom-input__list li');

const closeAllLists = () => {
  customSelectsWrapper.forEach((el) => {
    el.classList.remove('custom-input__wrapper--show');
  });
};

const documentClickHandler = (evt) => {
  if (getParent(evt.target, 'custom-input__wrapper')) {
    closeAllLists();
    document.removeEventListener('click', documentClickHandler);
  }
};

const customSelectAction = () => {
  if (customSelectsWrapper.length) {
    allActivElement.forEach((el) => {
      el.addEventListener('focus', () => {
        if (!el.parentNode.classList.contains('custom-input__wrapper--show')) {
          closeAllLists();
        }
      });
    });

    customSelectsItems.forEach((el) => {
      const selectsHandler = () => {
        const parent = returnParent(el, 'custom-input__wrapper');
        parent.querySelector('input').value = el.innerHTML;
        closeAllLists();
        const inputWrapper = returnParent(el, 'custom-input__wrapper');
        const input = inputWrapper.querySelector('input');
        const changeEv = new Event('change');
        input.dispatchEvent(changeEv);
        const form = returnParent(el, 'form');
        if (form) {
          const formEv = new Event('change');
          form.dispatchEvent(formEv);
        }
      };

      el.addEventListener('click', selectsHandler);

      el.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ENTER_KEY_CODE) {
          selectsHandler();
        }
      });
    });

    const showListOnClick = (evt) => {
      evt.preventDefault();
      document.addEventListener('click', documentClickHandler);
      if (evt.target.parentNode.classList.contains('custom-input__wrapper--show')) {
        closeAllLists();
      } else {
        evt.target.parentNode.classList.add('custom-input__wrapper--show');
      }
    };

    const showListOnKeydown = (evt) => {
      document.addEventListener('click', documentClickHandler);
      if (evt.keyCode === ENTER_KEY_CODE) {
        evt.preventDefault();
        if (evt.target.parentNode.classList.contains('custom-input__wrapper--show')) {
          closeAllLists();
        } else {
          evt.target.parentNode.classList.add('custom-input__wrapper--show');
        }
      }
    };

    customSelectsInputs.forEach((input) => {
      input.addEventListener('click', showListOnClick);
      input.addEventListener('keydown', showListOnKeydown);
    });
  }
};

export default customSelectAction;
