// document.querySelector 유틸함수로 빼기
const $ = (selector) => document.querySelector(selector);

//로컬스토리지에 저장하고, 가져오는 객체
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

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

  // 앱이 처음 생성될 때 (첫 로딩될 때) 로컬스토리지에서 데이터 가져오기 + 렌더링
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    renderMenu();
  };

  // this.menu의 값을 가져서 화면에 렌더링 시키는 함수
  const renderMenu = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴이름을 입력받고 li로 추가하는 함수
  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("메뉴를 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: espressoMenuName });

    // 로컬스토리지에 저장
    store.setLocalStorage(this.menu);

    renderMenu();
    $("#menu-name").value = "";
  };

  // 메뉴 수정하는 함수
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  // 메뉴 삭제하는 함수
  const removeMenuName = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      e.target.closest("li").remove();
      store.setLocalStorage(this.menu);
      updateMenuCount();
    }
  };

  // 버튼 클릭 시 메뉴 수정 및 삭제 함수 실행
  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
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
  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      renderMenu();
    }
  });
}

const app = new App();
app.init();
