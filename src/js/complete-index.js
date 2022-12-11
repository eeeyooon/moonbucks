/*
- 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
- 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- 총 메뉴 갯수를 count하여 상단에 보여준다.
- 메뉴가 추가되고 나면, input(입력창)은 빈 값으로 초기화한다.
- 사용자 입력값이 빈 값이라면 추가되지 않는다.

*/

const $ = (selector) => document.querySelector(selector);

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //메뉴의 이름 입력받기 + 메뉴 템플릿 만들기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
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

      //만든 템플릿 채로 list에 삽입.
      $("#espresso-menu-list").insertAdjacentHTML(
        "beforeend",
        menuItemTemplate(espressMenuName)
      );

      //총 메뉴 갯수를 count하기
      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
      $(".menu-count").innerText = `총 ${menuCount} 개`;
    }
  });
}

App();
