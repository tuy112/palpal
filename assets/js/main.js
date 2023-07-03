/* 백 데이터 가져오기.... */
document.addEventListener('DOMContentLoaded', async () => {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const postsDatas = await fetch('http://localhost:3000/api/posts', option).then(d => d.json());
    const usersDatas = await fetch('http://localhost:3000/api/users/:userId', option).then(d => d.json());
    const cmtsDatas = await fetch('http://localhost:3000/api/posts/:postId/cmts', option).then(d => d.json());

    console.log(postsDatas);
    console.log(usersDatas);
    console.log(cmtsDatas);

  } catch (e) {
    console.error(e);
  }
});


/* 프론트 - 백 본격적인 연결*/
// login
async function login() {
  const obj = {};
  obj.email = $('#userId').val(); // Uniqe
  obj.password = $('#password').val();
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      'http://localhost:3000/api/login',
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

// logout
async function logout() {
  window.localStorage.removeItem('Authorization');
  window.location.reload();
}

// signup
async function signup() {
  if (!document.getElementById('verifyEmailBtn').disabled) {
    return alert('E-mail 인증 먼저 진행해주세요.');
  }

  const obj = {};
  obj.userId = $('#userId').val();
  obj.nickname = $('#nickname').val();
  obj.password = $('#password').val();
  obj.confirm = $('#confirm').val();

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };

  try {
    const fetchedData = await fetch(
      'http://localhost:3000/api/signup',
      option
    ).then((d) => {
      return d.json();
    });
  } catch (e) {
    console.error(e);
  }
}

/* ================================================================== */

// post
// 게시글 조회
const callPostInfo = async () => {
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
    };
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const postList = await fetch(`http://localhost:3000/api/posts`, options).then((res) => res.json());

    const { title, content } = postList.data;

    document.getElementById('title').textContent = title;
    document.getElementById('content').textContent = content;

    const postImg = document.getElementById('postImg');
    postImg.src = postImgURL;
};
callPostInfo();

// 게시글 수정
async function postUpdate() {
    const obj = {};
    const id = new URL(location.href).searchParams.get('id');
    const updateContent = prompt('수정할 내용을 입력하세요');
    obj.content = updateContent;

    console.log(obj);
    const option = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
    },
    body: JSON.stringify(obj),
    };
    try {
    const fetchedData = await fetch(`http://localhost:3000/api/posts/cmts/:cmtId`, option).then((d) => {
        return d.json();
    });
    window.location.reload();
    } catch (e) {
    console.error(e);
    }
}

// 게시글 삭제
async function postDelete() {
    const confirmed = confirm('게시글을 삭제하시겠습니까?');
    if (confirmed) {
    const id = new URL(location.href).searchParams.get('id');
    const option = {
        method: 'DELETE',
        headers: {
        accept: 'application/json',
        Authorization: auth,
        },
    };
    const deletePost = await fetch(`http://localhost:3000/api/posts/:postId/cmts`, option).then((d) => d.json());
    window.location.href = 'index.html';
    }
}

// cmt
// 게시글의 댓글 입력
async function commentInput() {
  const obj = {};
  obj.comment = $('#cmtInput').val();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const option = {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
  },
  body: JSON.stringify(obj),
  };
  try {
  const fetchedData = await fetch(`http://localhost:3000/api/posts/:postId/cmts`, option).then((d) => {
      return d.json();
  });
  location.reload();
  } catch (e) {
  console.error(e);
  }
}

// 게시글의 댓글 조회
const callComments = async () => {
  const option = {
  method: 'GET',
  headers: {
      accept: 'application/json',
  },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const commentsList = await fetch(`http://localhost:3000/api/posts/:postId/cmts`, option).then((d) => {
    return d.json();
  });
  console.log(typeof commentsList)
  console.log(commentsList)

  const commentsListElement = document.querySelector('#cmtBox');
  Object.keys(commentsList).forEach((data) => { // values 변경???
  // <strong class="text-success">${data.nickname}</strong>
  // 이 부분은 빼셔야 합니다. nickname은 commentsList 객체의 Key 값에 존재하지 않습니다.
  // 추가할거면 Cmts랑 Userinfos부터 관계성 설정 다시 해서, migrate해야 합니다.
  // 나머지 변수 받는 부분은 객체에 있는 key 값으로 받도록 설정했습니다.
  // by. KJY
  commentsListElement.innerHTML += 
  `<div class="d-flex text-muted pt-3 comment-container" style="width: 550px;">
  <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
  <title>Placeholder</title>
  <rect width="100%" height="100%" fill="#007bff"></rect>
  <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
  </svg>
  <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
  <div class="d-flex justify-content-between">
      <strong class="text-success">${data.nickname}</strong>
  </div>
  <span class="d-block text-dark">${data.content}</span>
  <div class="button-container">
      <div class="update-button-container">
      <a href="#" class="update-button" onclick="commentUpdate(${data.cmtId}); return false;">수정</a>
  </div>
      <a href="#" class="x-button" style="text-decoration: none;" onclick="commentDelete(${data.cmtId}); return false;">X</a>
      
  </div>
  </div>
</div>`;
  }).join("");
};
callComments();

// 게시글의 댓글 수정
async function commentUpdate(id) {
  const obj = {};
  const updateComment = prompt('수정할 내용을 입력하세요');
  obj.comment = updateComment;
  const option = {
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
  },
  body: JSON.stringify(obj),
  };
  try {
  const fetchedData = await fetch(`http://localhost:3000/api/posts/cmts/:cmtId`, option).then((d) => {
      return d.json();
  });
  window.location.reload();
  } catch (e) {
  console.error(e);
  }
}

// 게시글의 댓글 삭제
async function commentDelete(id) {
  const confirmed = confirm('댓글을 삭제하시겠습니까?');
  if (confirmed) {
  const option = {
      method: 'DELETE',
      headers: {
      accept: 'application/json',
      Authorization: auth,
      },
  };
  const deleteComment = await fetch(`http://localhost:3000/api/posts/cmts/:cmtId`, option).then((d) => d.json());
  window.location.reload();
  }
}