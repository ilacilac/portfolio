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
}; mainBg();


const $sections = document.querySelectorAll('.common-group');
const sectionsOffsetTop = Array.from($sections).map((v) => {
  return v.offsetTop;
})

const windowHeight = window.innerHeight;
let moveScroll = 0;

let scrollTopDefault = 0;
let scrollPage = 1;
// console.log($sections);

let oldValue = 0;
const moveSection = (e) => {
  // let { scrollTop } = e.target.scrollingElement;
  // const newValue = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  // scroll down
  // if (oldValue - newValue < 0) {  
  //   console.log('scroll down');
  //   for(let i = 0; i <= sectionsOffsetTop.length - 1; i++) {
  //     if (sectionsOffsetTop[i] <= scrollTop && sectionsOffsetTop[i + 1] >= scrollTop) {
  //       console.log(sectionsOffsetTop[i]);
  //       window.scrollTo({
  //         top: sectionsOffsetTop[i + 1],
  //         left: 0,
  //         behavior: "smooth"
  //       })
  //     }
  //   }
  // } 
  // scroll top
  // if(oldValue - newValue > 0) { 
  //   console.log('scroll up');
  //   for(let i = 0; i <= sectionsOffsetTop.length - 1; i++) {
  //     if (sectionsOffsetTop[i] <= scrollTop && sectionsOffsetTop[i + 1] >= scrollTop) {
  //       console.log(sectionsOffsetTop[i]);
  //       window.scrollTo({
  //         top: sectionsOffsetTop[i],
  //         left: 0,
  //         behavior: "smooth"
  //       })
  //     }
  //   }
  // }

  // oldValue = newValue;

  
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

const $menuWrap = document.querySelector('.menu-wrap');
$menuWrap.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('menu-link')) {
    
    const sectionId = e.target.getAttribute('href');
    const section = document.querySelector(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      left: 0,
      behavior: "smooth"
    })
  }
});