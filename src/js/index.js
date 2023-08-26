// document.querySelector 유틸함수로 빼기
const $ = (selector) => document.querySelector(selector);

function App() {
  // 메뉴 카운트하는 함수 따로 빼기
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴이름을 입력받고 li로 추가하는 함수
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
      menuItemTemplate(espressoMenuName)
    );

    // 총 카운트. menu-count 가져오기
    // li 개수를 카운팅 > 함수로 뺌

    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  // 메뉴 수정하는 함수
  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const menuName = $menuName.innerText;
    const updatedMenuName = prompt("메뉴명을 수정하세요.", menuName);
    $menuName.innerText = updatedMenuName;
  };

  // 메뉴 삭제하는 함수
  const removeMenuName = (e) => {
    e.target.closest("li").remove();
    updateMenuCount();
  };

  // 버튼 클릭 시 메뉴 수정 및 삭제 함수 실행
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("메뉴를 삭제하시겠습니까?")) {
        removeMenuName(e);
      }
    }
  });

  // form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴이름 입력받고 확인 버튼 클릭 시 메뉴 추가
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 메뉴의 이름 입력 받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });
}

App();
