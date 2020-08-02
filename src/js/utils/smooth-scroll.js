import SmoothScroll from 'smooth-scroll';

const initScrollToAnchor = () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    offset: '80',
  });
};

export {initScrollToAnchor};
