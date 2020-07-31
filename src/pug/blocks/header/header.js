const initMenu = () => {
  const menuButton = document.querySelector('.header__button');

  if (menuButton) {
    const menuPopup = document.querySelector('.header__nav');
    const main = document.querySelector('main');

    const showMenu = () => {
      menuButton.classList.add('is-active');
      menuPopup.classList.add('header__nav--active');
      menuButton.addEventListener('click', hideMenu);
      menuButton.removeEventListener('click', showMenu);
      main.addEventListener('click', hideMenu);

    };

    const hideMenu = () => {
      menuButton.classList.remove('is-active');
      menuPopup.classList.remove('header__nav--active');
      main.removeEventListener('click', hideMenu);
      menuButton.removeEventListener('click', hideMenu);
      menuButton.addEventListener('click', showMenu);
    };
    menuButton.addEventListener('click', showMenu);
  }
};

export {
  initMenu
};

