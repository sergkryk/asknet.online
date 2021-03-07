const form = document.querySelector('.order__form');
const allActiveElements = document.querySelectorAll('input, checkbox, a, button, textarea, radio, select, option');
const ENTER_KEY_CODE = 13;

const initCustomSelect = () => {
  if (form) {
    allActiveElements.forEach((el) => {
      el.addEventListener('focus', () => {
        hideSelects();
      });
    });

    const selectInputs = form.querySelectorAll('input[type="text"]');
    const event = new Event('input');

    const showSelects = (selects) => {
      selects.classList.add('select__list--active');
    };

    const hideSelects = () => {
      form.querySelectorAll('.select__list--active').forEach((el) => {
        el.classList.remove('select__list--active');
      });
    };

    const watchClickOutside = () => {
      const didClickedOutside = !form.contains(window.event.target);
      if (didClickedOutside) {
        hideSelects();
      }
    };

    const addEventListenersOnSelects = (selects) => {
      window.addEventListener('click', watchClickOutside);

      selects.querySelectorAll('li').forEach((select) => {

        const onClickPassValue = () => {
          const values = select.querySelectorAll('span');
          const inputs = select.parentElement.parentElement.querySelectorAll('input');

          inputs.forEach((input, index) => {
            input.value = values[index].textContent;
            input.setAttribute('data-select', `${select.getAttribute('data-select')}`);
            input.dispatchEvent(event);
          });
          hideSelects();
          window.removeEventListener('click', watchClickOutside);
        };

        select.addEventListener('click', onClickPassValue);
        select.addEventListener('keydown', (evt) => {
          if (evt.keyCode === ENTER_KEY_CODE) {
            onClickPassValue();
          }
        });
      });
    };

    selectInputs.forEach((input) => {
      const customSelectClickHandler = () => {
        const customSelectOptions = input.parentElement.nextElementSibling;
        if (customSelectOptions.classList.contains('select__list--active')) {
          hideSelects();
        } else {
          hideSelects();
          showSelects(customSelectOptions);
          addEventListenersOnSelects(customSelectOptions);
        }
      };

      const customSelectKeydownkHandler = (evt) => {
        if (evt.keyCode === ENTER_KEY_CODE) {
          evt.preventDefault();
          const customSelectOptions = input.parentElement.nextElementSibling;

          if (customSelectOptions.classList.contains('select__list--active')) {
            hideSelects();
          } else {
            hideSelects();
            showSelects(customSelectOptions);
            addEventListenersOnSelects(customSelectOptions);
          }
        }
      };

      input.addEventListener('click', customSelectClickHandler);
      input.addEventListener('keydown', customSelectKeydownkHandler);
    });
  }
};

export {initCustomSelect};
