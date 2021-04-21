const $main = document.querySelector('main');
const $mainBg = document.querySelector('.main-bg');
const $body = document.querySelector('body');

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

  // scroll down
  if (oldValue - newValue < 0) {
    // console.log('scroll down');
    for (let i = 0; i <= sectionsOffsetTop.length - 1; i++) {
      if (
        sectionsOffsetTop[i] <= scrollTop &&
        sectionsOffsetTop[i + 1] >= scrollTop
      ) {
        // console.log(i);
        $sections[i].classList.add('active');
      } else {
        $sections[i].classList.remove('active');
      }
    }
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
      }
    }
  }

  oldValue = newValue;
};

const debounce = (func) => {
  let timer;

  return (...args) => {
    // console.log('func', func); // func (e) => moveSection(e)
    // console.log('args', args); // args [Event]
    if (!timer) {
      func.apply(this, args);
      // console.log(newValue);
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
const $menuWrap = document.querySelector('.menu-wrap');
$menuWrap.addEventListener('click', (e) => {
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


const $slideWrap = document.querySelector('.slide-wrap')
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
  const move = () => {
    $slideWrap.style.cssText = `transform: translate(${currentSlide * -100}%, 0); transition: all ${speed};`;
    if(currentSlide >= $slide.length) {
      // $slideWrap.style.cssText = `animation: move-slide ${speed};`
      currentSlide = 1;
    } else {
      currentSlide++;
    }
  };
  // let timer = setInterval(() => {
  //   move();
  // }, 3000);
  $slideIndicatorWrap.addEventListener('click', (e) => {
    if (!e.target.classList.contains('.slide-button')) false;
    currentSlide = e.target.textContent;
    timer = clearInterval();
    move();
  });
}
slideMove();

window.addEventListener('load', () => {  
    $slideWrap.querySelectorAll('.slide').forEach((slide, index) => {
      $slideWrap.style.cssText = `transform: translate(${currentSlide * -100}%, 0);`
      slide.style.cssText = `opacity: 1; transform: translate(${index * 100}%, 0)`;
    })
    $slide.forEach((_, index) => {
      $slideIndicatorWrap.innerHTML += `<button class="slide-button">${index + 1}</button>`
    })
    // slideMove();
    
  // slide-wrap으로 움직이기, 맨앞에 맨뒤에 tag추가하기
})
