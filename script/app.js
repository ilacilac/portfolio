const app = () => {
  const $main = document.querySelector("main");
  const $mainBg = document.querySelector(".main-bg");
  let startX = 0;
  let startY = 0;
  let bgPosX = 0;
  let bgPosY = 0;
  let movePosX = 0;
  let movePosY = 0;

  $main.onmouseenter = (e) => {
    $mainBg.style.transition = "none";
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
    $mainBg.style.transition = "all linear 0.3s";
    $mainBg.style.top = `${bgPosY}px`;
    $mainBg.style.left = `${bgPosX}px`;
  };
};
app();
