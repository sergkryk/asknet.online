// import {debounce} from '../../../js/utils/debounce';
const initFaqTabs = () => {
  const tabs = document.querySelectorAll('.faq__item');
  // const contents = document.querySelectorAll('.faq__answer-wrapper');

  const collapseSection = (element) => {
    // let sectionHeight = element.scrollHeight; // get the height of the element's inner content, regardless of its actual size
    // let elementTransition = element.style.transition; // temporarily disable all css transitions
    // element.style.transition = 'none';

    // // on the next frame (as soon as the previous style change has taken effect),
    // // explicitly set the element's height to its current pixel height, so we
    // // aren't transitioning out of 'auto'
    // requestAnimationFrame(function () {
    //   element.style.height = `${sectionHeight}px`;
    //   element.style.transition = elementTransition;

    //   // on the next frame (as soon as the previous style change has taken effect),
    //   // have the element transition to height: 0
    //   requestAnimationFrame(function () {
    //     element.style.height = `${0}px`;
    //   });
    // });
    element.style.height = 0;
    element.setAttribute('data-collapsed', 'true'); // mark the section as "currently collapsed"
  };

  const expandSection = (element) => {
    let sectionHeight = element.scrollHeight; // get the height of the element's inner content, regardless of its actual size
    element.style.height = sectionHeight + 'px'; // have the element transition to the height of its inner content

    // const onTransitionEnd = () => { // declare a function to remove the event listener so it only gets triggered once
    //   element.removeEventListener('transitionend', onTransitionEnd);
    //   element.style.height = null;
    // };

    // element.addEventListener('transitionend', onTransitionEnd); // when the next css transition finishes (which should be the one we just triggered)

    element.setAttribute('data-collapsed', 'false'); // mark the section as "currently not collapsed"
  };

  const closeTabs = (tab) => {
    tabs.forEach((el) => {
      if (tab !== el) {
        el.classList.remove('faq__item--active');
        const section = el.querySelector('.faq__answer-wrapper');
        if (section.getAttribute('data-collapsed') !== true) {
          collapseSection(section);
        }
      }
    });
  };

  const collapseContent = (toggle, content) => {
    if (toggle) {
      expandSection(content);
    } else {
      collapseSection(content);
    }
  };

  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  tabs.forEach((tab) => {
    const button = tab.querySelector('button');
    const content = tab.querySelector('.faq__answer-wrapper');

    const onClickCollapse = debounce(() => {
      closeTabs(tab);
      tab.classList.toggle('faq__item--active');
      let isCollapsed = content.getAttribute('data-collapsed') === 'true';
      collapseContent(isCollapsed, content);
    }, 500);

    button.addEventListener('click', onClickCollapse);
  });
};

export {initFaqTabs};
