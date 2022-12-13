/*
- [O] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
- [O] 메뉴의 이름을 입력 받고 확인 버튼을 클릭할 때 추가한다.
- [O] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- [O] 총 메뉴 갯수를 count하여 상단에 보여준다.
- [O] 메뉴가 추가되고 나면, input(입력창)은 빈 값으로 초기화한다.
- [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.

  //TODO 메뉴 수정
  // - [O] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정 모달창(prompt)이 뜬다.
  // - [O] 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

*/

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const espressMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressMenuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressMenuName)
    );

    updateMenuCount();
    //메뉴가 추가되고 나면, input(입력창)은 빈 값으로 초기화하기.

    //메뉴 추가 후 value값 빈값으로 바꾸기
    $("#espresso-menu-name").value = "";

    //사용자 입력값이 빈 값일때 추가되지 않게 예외사항 만들기.
    //>> 메뉴 추가 초반부에 설정함.
  };

  //e를 넘겨줘야 e.target을 인식함.
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      //함수 호출할 때도 e 넣어서.
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //메뉴 입력 후 확인 버튼을 클릭하면 메뉴 추가하기
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  //메뉴의 이름 입력받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
