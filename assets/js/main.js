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
    const usersDatas = await fetch('http://localhost:3000/api/users', option).then(d => d.json());

    console.log(postsDatas);
    console.log(usersDatas);

  } catch (e) {
    console.error(e);
  }
});


/* 프론트 - 백 본격적인 연결!!!!!!!!!!!!!!!!!!! 자고싶어ㅠㅠ */
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
      'http://localhost:3000/users/login',
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
      'http://localhost:3000/users/signup',
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
// 상세 게시글 조회
const callPostInfo = async () => {
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
    };
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const postList = await fetch(`http://localhost:3000/posts/${id}`, options).then((res) => res.json());

    const { title, content, postImgURL, like } = postList.data;

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
    const fetchedData = await fetch(`http://localhost:3000/posts/cmts/:cmtId`, option).then((d) => {
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
    const deletePost = await fetch(`http://localhost:3000/posts/:postId/cmts`, option).then((d) => d.json());
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
  const fetchedData = await fetch(`http://localhost:3000/posts/:postId/cmts`, option).then((d) => {
      return d.json();
  });
  location.reload();
  } catch (e) {
  console.error(e);
  }
}

// 게시글의 댓글 조회
const callComments = async () => {
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
  },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const commentsList = await fetch(`http://localhost:3000/posts/:postId/cmts`, options).then((res) => res.json());

  const commentsListElement = document.querySelector('#cmtBox');
  commentsList.forEach((data) => {

  commentsListElement.innerHTML += `<div class="d-flex text-muted pt-3 comment-container" style="width: 550px;">
                                      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                                      <title>Placeholder</title>
                                      <rect width="100%" height="100%" fill="#007bff"></rect>
                                      <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                                      </svg>
                                      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                      <div class="d-flex justify-content-between">
                                          <strong class="text-success">${data.nickname}</strong>
                                      </div>
                                      <span class="d-block text-dark">${data.comment}</span>
                                      <div class="button-container">
                                          <div class="update-button-container">
                                          <a href="#" class="update-button" onclick="commentUpdate(${data.id}); return false;">수정</a>
                                      </div>
                                          <a href="#" class="x-button" style="text-decoration: none;" onclick="commentDelete(${data.id}); return false;">X</a>
                                          
                                      </div>
                                      </div>
                                  </div>`;
  });
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
  const fetchedData = await fetch(`http://localhost:3000/posts/cmts/:cmtId`, option).then((d) => {
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
  const deleteComment = await fetch(`http://localhost:3000/posts/cmts/:cmtId`, option).then((d) => d.json());
  window.location.reload();
  }
}