document.addEventListener("DOMContentLoaded",async ()=>{
    const auth = window.localStorage.getItem('Authorization');
    if(auth){
        showButton(true);
    }else{
        location.href="index.html";
    }
});
let userId;

readyPage();



async function updateUser(){
    const obj = {};
    obj.imageURL = $('#updateImgURL').val();
    obj.phone =$('#updatePhone').val();
    obj.introduce =$('#updateIntroduce').val();

    const option = {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:window.localStorage.getItem('Authorization')
        },
        body:JSON.stringify(obj)
    };
    const updated = await fetch(`http://localhost:3030/users/${userId}`,option).then(d=>{return d.json()});
    window.location.reload();
}


// 버튼 노출 선택
function showButton(boolean){
    if(boolean==true){
        // 로그인 로그아웃 버튼 전환
        document.getElementById('loginBtn').setAttribute('style','display:none;');
        if(document.getElementById('logoutBtn').hasAttribute('style'))document.getElementById('logoutBtn').removeAttribute('style');
        // 회원가입 프로필 버튼 전환
        document.getElementById('signupBtn').setAttribute('style','display:none;');
        if(document.getElementById('profileBtn').hasAttribute('style'))document.getElementById('profileBtn').removeAttribute('style');
    }else{
        // 로그인 로그아웃 버튼 전환
        if(document.getElementById('loginBtn').hasAttribute('style'))document.getElementById('loginBtn').removeAttribute('style');
        document.getElementById('logoutBtn').setAttribute('style','display:none;');
        // 회원가입 프로필 버튼 전환
        if(document.getElementById('signupBtn').hasAttribute('style'))document.getElementById('signupBtn').removeAttribute('style');
        document.getElementById('profileBtn').setAttribute('style','display:none;');
    }
};

async function readyPage(){
    const option = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:window.localStorage.getItem('Authorization')
        }
    };

    const user = await fetch('http://localhost:3030/users/getUser',option).then(d=>{return d.json()});
    
    document.querySelector('#userEmail').innerHTML = user.email;
    document.querySelector('#userId').innerHTML = user.nickname;
    document.querySelector('#userName').innerHTML = user.name;
    document.querySelector('#userPhone').innerHTML = user.phone;
    document.querySelector('#userImgURL').innerHTML = user.imageURL;
    document.querySelector('#userIntroduce').innerHTML = user.introduce;
    userId = user.id;
};