/* mainVisual js */
// div사이즈 동적으로 구하기
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.list');
const inners = document.querySelectorAll('.inner');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

inners.forEach((inner) => {
  inner.style.width = `${outer.clientWidth}px`;
})

innerList.style.width = `${outer.clientWidth * inners.length}px`; 

// 버튼에 이벤트 등록하기
const buttonLeft = document.querySelector('.buttonLeft');
const buttonRight = document.querySelector('.buttonRight');

buttonLeft.addEventListener('click', () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? 0 : currentIndex;
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
});

buttonRight.addEventListener('click', () => {
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex;
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
});