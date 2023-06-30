// 좋아요
function countPlus(){
    count = count + 1;
    document.querySelector(".likeCount").innerHTML="좋아요 "+count +"개";
}

function like() {
    const pushLikeBtn = document.querySelector("#likeBtn");
    
    pushLikeBtn.innerHTML ='<i class="xi-heart xi-2x"></i>';
    pushLikeBtn.style.color ='red';
    pushLikeBtn.addEventListener("click",countPlus);
}