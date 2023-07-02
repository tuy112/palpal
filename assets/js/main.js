/* header js */



/* mainVisual js */
// 슬라이크 전체 크기
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

// 버튼
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");

let slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;
let currSlide = 1;

// 페이지네이션 생성
const pagination = document.querySelector(".slide_pagination");

for (let i = 0; i < maxSlide; i++) {
  if (i === 0) pagination.innerHTML += `<li class="active">•</li>`;
  else pagination.innerHTML += `<li>•</li>`;
}

const paginationItems = document.querySelectorAll(".slide_pagination > li");

// start, end 슬라이드 복사
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트 추가
slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

// 슬라이드 전체 선택
slideItems = document.querySelectorAll(".slide_item");

let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

function nextMove() {
  currSlide++;
  // 마지막 슬라이드 이상으로 넘어가지 않게..
  if (currSlide <= maxSlide) {
    // offset 계산
    const offset = slideWidth * currSlide;
    // offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한 슬라이드 기능
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}
function prevMove() {
  currSlide--;
  // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
  if (currSlide > 0) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  } else {
    // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      slideItems.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  }
}

// 버튼 엘리먼트에 클릭 이벤트 추가하기
nextBtn.addEventListener("click", () => {
  // 이후 버튼
  nextMove();
});
// 버튼 엘리먼트에 클릭 이벤트 추가하기
prevBtn.addEventListener("click", () => {
  // 이전 버튼
  prevMove();
});

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});

// 각 페이지네이션 클릭 시 해당 슬라이드로 이동하기
for (let i = 0; i < maxSlide; i++) {
  // 페이지네이션 클릭 이벤트
  paginationItems[i].addEventListener("click", () => {
    // 클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기(currSlide는 시작 위치가 1이기 때문에 + 1)
    currSlide = i + 1;
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
  });
}

// 드래그(스와이프) 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

// PC 클릭 이벤트 (드래그)
slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove();
  } else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove();
  }
});

// 모바일 터치 이벤트 (스와이프)
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
  if (startPoint < endPoint) {
    // 오른쪽으로
    prevMove();
  } else if (startPoint > endPoint) {
    // 왼쪽으로
    nextMove();
  }
});

// 슬라이드 루프 시작
let loopInterval = setInterval(() => {
  nextMove();
}, 3000);

// 슬라이드에 마우스가 올라간 경우
slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 3000);
});

/* 구분선 ================================== */
document.addEventListener('DOMContentLoaded', () => {
  const auth = window.localStorage.getItem('Authorization');
  if (auth) {
    showButton(true);
  } else {
    showButton(false);
  }
});

async function moveDetail(tag) {
  const id = tag.getAttribute('alt');
  location.href = `detail.html?id=${id}`;
}

async function moveProfile() {
  location.href = 'profile.html';
}

async function readyPage(descType = undefined) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ descType: descType }),
  };

  const posts = (
    await fetch('http://localhost:3030/posts/list', option).then((d) =>
      d.json()
    )
  ).data;

  const container = document.getElementsByClassName('card-container')[0];
  container.innerHTML = '';
  posts.forEach((data) => {
    container.innerHTML += `
            <div class="card" style="width: 12rem">
                <img src="${data.foodImgURL}" onclick="moveDetail(this)" class="card-img-top" alt="${data.id}" />
                <div class="card-body">
                <h4 class="card-title">${data.restaurantName}</h4>
                <p class="card-text">${data.content}</p>
                </div>
                <div class="card-footer">
                <p>
                    작성자 : ${data.nickname}, 좋아요 : ${data.like}
                </p>
                </div>
            </div>
            `;
    // }
  });
}
//포스트 생성
async function newPosts() {
  const obj = {};
  obj.restaurantName = $('#restaurantName').val();
  obj.content = $('#restaurantComment').val();
  obj.zone = $('#restaurantLocation').val();
  obj.menu = $('#restaurantMenu').val();
  obj.foodImgURL = $('#restaurantImageURL').val();

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },

    body: JSON.stringify(obj),
  };
  try {
    const fetchedData = await fetch('http://localhost:3030/posts', option).then(
      (d) => {
        return d.json();
      }
    );
    console.log(fetchedData);
    location.reload();
  } catch (e) {
    console.error(e);
  }
}
// 카드 지역별 클릭 함수
async function zoneClick(zone) {
  if (zone === '전체보기') {
    readyPage();
    return;
  }
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  const postByZone = await fetch(
    `http://localhost:3030/posts/zone?zone=${zone}`,
    option
  ).then((res) => res.json());

  const container = document.getElementsByClassName('card-container')[0];
  container.innerHTML = '';

  postByZone.forEach((data) => {
    container.innerHTML += `
            <div class="card" style="width: 12rem">
                <img src="./img/No_image.jpeg" onclick="moveDetail(this)" class="card-img-top" alt="${data.id}" />
                <div class="card-body">
                <h4 class="card-title">${data.restaurantName}</h4>
                <p class="card-text">${data.content}</p>
                </div>
                <div class="card-footer">
                <p>
                    작성자 : ${data.nickname}, 좋아요 : ${data.like}
                </p>
                </div>
            </div>
            `;
  });
}
// 카드 타이틀 검색 함수
function filterCards() {
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll('#cardContainer .card-container');

  cards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(searchValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}