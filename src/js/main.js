// import {polyfills} from './utils/polyfills';
import {initMenu} from '../pug/blocks/header/header';
import {onResizeSetVh, setVhVariable} from '../js/utils/viewport-height';
import {initScrollToAnchor} from '../js/utils/smooth-scroll';
import {newsSwiper} from './utils/swiper';
import {initFaqTabs} from '../pug/blocks/faq/faq';
// import {ieFooterNailing} from './utils/ie-footer-nailing';

// import {initModals} from './modules/init-modals';

// Utils
// ---------------------------------

// polyfills();
// ieFooterNailing();

// Modules
// ---------------------------------

// initModals();
initMenu();
setVhVariable(); // устанавливает переменную в root для определения правильной высоты вьюпорта
onResizeSetVh(); // добавляет обработчик события resize и пересчитывает переменную
initScrollToAnchor();
initFaqTabs();
