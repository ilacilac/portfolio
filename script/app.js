const app = () => {
  const $main = document.querySelector('main');
  const $mainBg = document.querySelector('.main-bg');
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
app();

const $body = document.querySelector('body');
const $sections = document.querySelectorAll('.common-group');

const windowHeight = window.innerHeight;

let scrollTopDefault = 0;
let scrollPage = 1;
// console.log($sections);

const moveSection = (e) => {
  let { scrollTop } = e.target.scrollingElement;

  $sections.forEach((section, index) => {
    if (
      $sections[index].offsetTop < scrollTop &&
      $sections[index + 1].offsetTop > scrollTop
    ) {
      $sections[index + 1].classList.add('on');
    } else {
      $sections[index + 1].classList.remove('on');
    }

    
    if (section.classList.contains('on')) {
      console.log('asd');
      
      
      window.scrollTo({
        // top: section.offsetTop,
        top: windowHeight * index,
        left: 0,
        behavior: 'smooth'
      })
    }
  });

  
};

const debounce = (func) => {
  let timer;

  return (...args) => {
    // console.log('func', func); // func (e) => moveSection(e)
    // console.log('args', args); // args [Event]
    if (!timer) {
      func.apply(this, args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, 500);
  };
};

const process = debounce((e) => moveSection(e));

document.addEventListener('scroll', process);
