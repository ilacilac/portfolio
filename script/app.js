const $main = document.querySelector('main');
const $mainBg = document.querySelector('.main-bg');
const $body = document.querySelector('body');

// navigation
const $menuButton = document.querySelector('.menu-button');
const $menuCloseButton = document.querySelector('.menu-close-button');
const $menuWrap = document.querySelector('.menu-wrap');

const mainBg = () => {
  let startX = 0;
  let startY = 0;
  let bgPosX = 0;
  let bgPosY = 0;
  let movePosX = 0;
  let movePosY = 0;

  $main.onmouseenter = (e) => {
    $mainBg.style.transition = 'none';
    // 시작 좌표
    startX = e.clientX;
    startY = e.clientY;
    // bg positon
    bgPosX = $mainBg.offsetTop;
    bgPosY = $mainBg.offsetLeft;
    $mainBg.style.top = `${bgPosY}px`;
    $mainBg.style.left = `${bgPosX}px`;
  };

  $main.onmousemove = (e) => {
    movePosX = e.clientX - startX;
    movePosY = e.clientY - startY;

    $mainBg.style.left = `${bgPosX - movePosX / 40}px`;
    $mainBg.style.top = `${bgPosY - movePosY / 40}px`;
  };

  $main.onmouseout = (e) => {
    bgPosX = -100;
    bgPosY = -100;
    $mainBg.style.transition = 'all linear 0.3s';
    $mainBg.style.top = `${bgPosY}px`;
    $mainBg.style.left = `${bgPosX}px`;
  };
};
mainBg();

const $sections = document.querySelectorAll('.common-group');
const sectionsOffsetTop = Array.from($sections).map((v) => {
  return v.offsetTop;
});

const windowHeight = window.innerHeight;
const $introduceWrap = document.querySelector('.introduce-wrap');
// const $main = document.querySelector('main');
let moveScroll = 0;

let scrollTopDefault = 0;
let scrollPage = 1;
// console.log($sections);

let oldValue = 0;
const moveSection = (e) => {
  let { scrollTop } = e.target.scrollingElement;
  const newValue =
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // menu button control
  console.log(newValue);
  console.log($main.clientHeight);
  if ($main.clientHeight < newValue) {
    $menuButton.classList.add('active');
  } else {
    $menuButton.classList.remove('active');
  }

  // scroll down
  if (oldValue - newValue < 0) {
    console.log('scroll down');
  }
  // scroll top
  if (oldValue - newValue > 0) {
    // console.log('scroll up');
    for (let i = 0; i <= sectionsOffsetTop.length - 1; i++) {
      if (
        sectionsOffsetTop[i] <= scrollTop &&
        sectionsOffsetTop[i + 1] >= scrollTop
      ) {
        // window.scrollTo({
        //   top: sectionsOffsetTop[i],
        //   left: 0,
        //   behavior: "smooth"
        // })
        console.log('up');
        console.log(i);
      }
    }
  }

  oldValue = newValue;
};

const debounce = (func) => {
  let timer;

  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, 100);
  };
};

const process = debounce((e) => moveSection(e));

document.addEventListener('scroll', process);

// Menu Scroll Event
// const $menuWrap = document.querySelector('.menu-wrap');
const $mainBtn = document.querySelector('.main-btn');
// const $introduceWrap = document.querySelector('.introduce-wrap');
$menuWrap.addEventListener('click', (e) => {
  if (e.target.classList.contains('github-link')) return false;
  e.preventDefault();
  if (e.target.classList.contains('menu-link')) {
    const sectionId = e.target.getAttribute('href');
    const section = document.querySelector(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  }
});
$mainBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: $introduceWrap.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
});

// Main Keywords animation
const $mainKeyword = document.querySelector('.main-keyword');
const mainKeywordArray = [
  '깊이 생각하는',
  '끈기있게 탐구하는',
  '문서화를 좋아하는',
];

const keywordAnimation = async (loopCount = 0) => {
  let textSplit = [];
  let count = 0;

  textSplit = mainKeywordArray.map((v) => {
    return v.split('');
  });

  while (
    loopCount !== textSplit.length &&
    count < textSplit[loopCount].length
  ) {
    await delayletter();

    $mainKeyword.append(textSplit[loopCount][count]);

    if (count === textSplit[loopCount].length - 1) {
      await delayWord();
      textSplit.length - 1 === loopCount
        ? keywordAnimation((loopCount = 0))
        : keywordAnimation(loopCount + 1);
      $mainKeyword.textContent = '';
      return false;
    }

    count++;
  }
};

const delayletter = () => {
  return new Promise((resolve) => setTimeout(resolve, 200));
};
const delayWord = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
keywordAnimation();

// Slide

const $slideWrap = document.querySelector('.slide-wrap');
const $slide = $slideWrap.querySelectorAll('.slide');
const beforeCloneSlide = $slide[$slide.length - 1].cloneNode(true);
const afterCloneSlide = $slide[0].cloneNode(true);
$slideWrap.insertBefore(beforeCloneSlide, $slideWrap.firstChild);
$slideWrap.appendChild(afterCloneSlide);
const $slideIndicatorWrap = document.querySelector('.slide-indicator');

let currentSlide = 1;
let autoplay = false;
const speed = '0.5s';

const slideMove = () => {
  const $slideButtons = $slideIndicatorWrap.querySelectorAll('.slide-button');
  const move = () => {
    $slideIndicatorWrap.querySelectorAll('.slide-button').forEach((button) => {
      button.classList.remove('active');
    });
    $slideWrap.style.cssText = `transform: translate(${
      currentSlide * -100
    }%, 0); transition: all ${speed};`;
    $slideIndicatorWrap
      .querySelectorAll('.slide-button')
      [currentSlide - 1].classList.add('active');
    if (currentSlide >= $slide.length) {
      currentSlide = 1;
    } else {
      ++currentSlide;
    }
  };
  $slideIndicatorWrap.addEventListener('click', (e) => {
    if (!e.target.classList.contains('slide-button')) return false;
    currentSlide = e.target.textContent;
    timer = clearInterval();
    move();
  });
};
slideMove();

window.addEventListener('load', () => {
  $slideWrap.querySelectorAll('.slide').forEach((slide, index) => {
    $slideWrap.style.cssText = `transform: translate(${
      currentSlide * -100
    }%, 0);`;
    slide.style.cssText = `opacity: 1; transform: translate(${
      index * 100
    }%, 0)`;
  });
  $slide.forEach((_, index) => {
    if (index === 0) {
      $slideIndicatorWrap.innerHTML += `<button class="slide-button active">${
        index + 1
      }</button>`;
    } else {
      $slideIndicatorWrap.innerHTML += `<button class="slide-button">${
        index + 1
      }</button>`;
    }
  });

  $menuButton.addEventListener('click', () => {
    $menuWrap.classList.add('active');
    $menuCloseButton.classList.add('active');
    $body.classList.add('active');
  });
  $menuCloseButton.addEventListener('click', () => {
    $menuWrap.classList.remove('active');
    $menuCloseButton.classList.remove('active');
    $body.classList.remove('active');
  });
  $menuWrap.addEventListener('click', (e) => {
    if (!e.target.classList.contains('menu-link')) return false;
    $menuWrap.classList.remove('active');
    $menuCloseButton.classList.remove('active');
    $body.classList.remove('active');
  });

  $menuWrap.addEventListener('keydown', (e) => {
    const focusEle = document.activeElement;
    if (!e.keycode === 9) return false;
    if ($menuCloseButton === focusEle) {
      e.preventDefault();
      $menuWrap.querySelector('ul li:first-child a').focus();
    }
  });
});
