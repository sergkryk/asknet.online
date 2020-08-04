import SmoothScroll from 'smooth-scroll';

const initScrollToAnchor = () => {
  const header = document.querySelector('header');
  const headerHeight = header.getBoundingClientRect().height; // получаю высоту хедера для корректного позиционирования окна после скролла

  // eslint-disable-next-line no-unused-vars
  const scroll = new SmoothScroll('a[href*="#"]', {
    offset: `${headerHeight}`,
    easing: 'easeInOutQuad',
    speed: 800,
  });
};

export {initScrollToAnchor};
