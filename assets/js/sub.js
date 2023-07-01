// 좋아요
let countNum = document.querySelector(".countNumber");
let buttonWrap = document.querySelector(".buttonWrap");

buttonWrap.addEventListener("click", (e) => {
    if (e.target.classList.contains("likeBtn")) {
        countNum.innerHTML++;
        //증가
    };
});