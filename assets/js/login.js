// 회원가입
async function signup() {
    if (!document.getElementById('verifyEmailBtn').disabled) {
      return alert('E-mail 인증 먼저 진행해주세요.');
    }
    const obj = {};
    obj.nickname = $('#signupId').val();
    obj.password = $('#signupPw').val();
    obj.confirm = $('#signupConfirm').val();
    obj.email = $('#signupEmail').val();
    obj.phone = $('#signupPhone').val();
    obj.imageURL = $('#signupImgURL').val();
    obj.name = $('#signupName').val();
    obj.introduce = $('#signupIntroduce').val();
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    };
  
    try {
      const fetchedData = await fetch(
        'http://localhost:3030/users/signup',
        option
      ).then((d) => {
        return d.json();
      });
    } catch (e) {
      console.error(e);
    }
  }

// 로그인
async function login() {
    const obj = {};
    obj.email = $('#loginEmail').val(); // Uniqe
    obj.password = $('#loginPw').val();
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    };
  
    try {
      const fetchedData = await fetch(
        'http://localhost:3030/users/login',
        option
      ).then((d) => {
        return d.json();
      });
      window.localStorage.setItem('Authorization', 'Bearer ' + fetchedData.token);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }


// 로그아웃
async function logout() {
    window.localStorage.removeItem('Authorization');
    window.location.reload();
  }
  
  // 이메일 인증
  async function verifyEmail() {
    const email = $('#signupEmail').val();
  
    if (!email) return alert('이메일이 입력되지 않았습니다.');
  
    const obj = {
      email: email,
    };
  
    const fetchedData = await fetch('http://localhost:3030/users/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((d) => {
      return d.json();
    });
  
    const verifyNum = fetchedData.verifyNum;
  
    while (true) {
      const inputVerifyNum = window.prompt('메일로 받은 인증번호를 입력해주세요');
      if (inputVerifyNum == null) {
        break;
      } else {
        if (verifyNum == inputVerifyNum) {
          alert('인증되었습니다.');
          document.getElementById('verifyEmailBtn').disabled = true;
          document.getElementById('signupEmail').disabled = true;
          break;
        } else {
          alert('인증번호가 틀립니다.');
        }
      }
    }
  }