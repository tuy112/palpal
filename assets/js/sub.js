// 좋아요
let countNum = document.querySelector(".countNumber");
let buttonWrap = document.querySelector(".buttonWrap");

buttonWrap.addEventListener("click", (e) => {
    if (e.target.classList.contains("likeBtn")) {
        countNum.innerHTML++;
        //증가
    };
});

// 공유하기
const btnShareFb = document.querySelector('#shareFb');

btnShareFb.addEventListener('click', () => {
  const pageUrl = 'news.v.daum.net/v/20220319120213003';
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
})