import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import MenuApi from "./api/index.js";

function App() {
  // 상태(변하는 데이터) - 메뉴명
  // 메뉴명은 App이란 함수, 객체가 가지고 있는 상태이기 때문에 this로 관리
  // this.menu라는 상태의 값을 가질 수 있게 선언.

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  // 앱이 처음 생성될 때 (첫 로딩될 때) 서버에서 데이터 가져오기 + 렌더링
  this.init = async () => {
    renderMenu();
    initEventListeners();
  };

  // this.menu의 값을 가져서 화면에 렌더링 시키는 함수
  const renderMenu = async () => {
    // 렌더링 전 최신 데이터를 가져옴.
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );

    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `<li data-menu-id="${
          menuItem.id
        }" class="menu-list-item d-flex items-center py-2">
      <span class="${
        menuItem.isSoldOut ? "sold-out" : ""
      } w-100 pl-2 menu-name">${menuItem.name}</span>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
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
      })
      .join("");

    //li태그들을 하나로 묶었기 때문에 (template) innerHTML로 추가
    $("#menu-list").innerHTML = template;

    // 총 카운트. menu-count 가져오기
    // li 개수를 카운팅 > 함수로 뺌
    updateMenuCount();
  };

  // 메뉴 카운트하는 함수 따로 빼기
  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴이름을 입력받고 li로 추가하는 함수
  const addMenuName = async () => {
    if ($("#menu-name").value === "") {
      alert("메뉴를 입력해주세요.");
      return;
    }
    const MenuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, MenuName);
    renderMenu();
    $("#menu-name").value = "";
  };

  // 메뉴 수정하는 함수
  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    renderMenu();
  };

  // 메뉴 삭제하는 함수
  const removeMenuName = async (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      renderMenu();
    }
  };

  // 메뉴 품절 함수
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    renderMenu();
  };

  const initEventListeners = () => {
    // 수정, 삭제, 품절 버튼 로직 처리
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // form 태그가 자동으로 전송되는 걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // 메뉴이름 입력받고 확인 버튼 클릭 시 메뉴 추가
    $("#menu-submit-button").addEventListener("click", addMenuName);

    // 메뉴의 이름 입력 받기
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addMenuName();
      }
    });

    // 메뉴 버튼 클릭 시 해당 메뉴 관리로 변경. (상위태그인 nav에 이벤트 걸기)
    $("nav").addEventListener("click", async (e) => {
      const isCategoryButton =
        e.target.classList.contains("cafe-category-name");
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        renderMenu();
      }
    });
  };
}

const app = new App();
app.init();
