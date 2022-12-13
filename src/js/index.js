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
//document.querySeletor가 반복적으로 사용되고 있음. $(달러)표시는 document.querySelector를 리턴해주는 형태로 만들어 이걸 재사용할 것.

function App() {
  //총 메뉴 개수 count 코드도 따로 빼놓기
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    //콘솔로 e.target을 찍어보면 (수정버튼 클릭)
    //<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"> 수정 </button>
    //가 출력됨. (menu-edit-button인걸 잘인식함!)
    // console.log(e.target);

    //클릭한 요소의 클래스들 중에 "menu-edit-button"이 포함되어있다면 = 수정버튼이라는 것
    if (e.target.classList.contains("menu-edit-button")) {
      //closeset() : 가장 가까운 선택자로.
      //object형태로 오기 때문에 뒤에 innerText붙여서
      //텍스트 그대로 받아오기.

      //코드 재사용 높기 위해
      const $menuName = e.target.closest("li").querySelector(".menu-name");

      //"모달창 메세지", "입력창에 있는 default"=메뉴명그대로
      //모달창에서 수정된 값은 promt가 리턴한 값임.
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요.",
        $menuName.innerText
      );

      //모달창에서 수정한 메뉴명으로 바꾸기!
      $menuName.innerText = updatedMenuName;
    }

    //   - [O]메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴    삭제를 재확인하는 `confirm` 모달창이 뜬다.
    // - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
    // - [ ] 총 메뉴 개수를 count하여 상단에 보여준다.

    //메뉴 삭제하기

    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니까?")) {
        //true면 삭제, false면 삭제 X
        //삭제할땐 li태그만(메뉴 리스트의 최상위 요소)
        e.target.closest("li").remove();
        //총 개수도 다시 업데이트
        updateMenuCount();
      }
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //재사용할 수 있는 함수 만들기
  const addMenuName = () => {
    //사용자 입력값이 빈 값일때 추가되지 않게 예외사항 만들기.
    //1) value가 빈 문자열일때 > alert 띄우기
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return; //2) 리턴을 해주면 엔터키 눌렀을 때 메뉴 추가되는 코드 실행 X
      //이렇게 되면 엔터키가 아니라 스페이스키를 눌러도 값 입력하라고 뜸.
      //그래서 최상단에서 엔터키가 아니면 메뉴 추가 안되게 설정.
    }
    //value가 가져오는 값을 변수에 담아서 활용하기
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
    //HTML 코드를 넣을 땐 innerHTML 속성 사용.
    // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressMenuName);

    //메뉴 추가하고 다음 메뉴를 추가하면 직전에 추가했던 메뉴가 사라짐.
    // -> #espresso-menu-list에 계속 새롭게 덮어씌워지기 때문.
    // 그냥 넣기보다는 밑으로 추가되는 형태로 바꿔야 함.
    // 이때 사용하는 메소드가 "Element.insertAdjacentHTML()"임.
    // 내가 원하는 특정 태그 위치에 삽입할 수 있음.

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressMenuName)
    );

    //총 메뉴 갯수를 count하기 (.menu-count 안에 있는 문자값<총 N개> 변경하기)
    //안에 있는 문자값 변경할땐 innerText 속성 사용
    // count하는 방법? > li의 개수를 카운팅한다.
    //const 변수 = li 개수를 카운팅. > querySelector는 li 중 첫번째 요소만 가져옴. 모든 요소를 가져오고 싶을 땐 querySelectorAll.
    //몇개인지 카운팅 > length로 확인
    // > 맨 위에서 따로 빼놓음.

    updateMenuCount();
    //메뉴가 추가되고 나면, input(입력창)은 빈 값으로 초기화하기.

    //메뉴 추가 후 value값 빈값으로 바꾸기
    $("#espresso-menu-name").value = "";

    //사용자 입력값이 빈 값일때 추가되지 않게 예외사항 만들기.
    //>> 메뉴 추가 초반부에 설정함.
  };

  //메뉴 입력 후 확인 버튼을 클릭하면 메뉴 추가하기
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  //메뉴의 이름 입력받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    //3) 엔터키가 아닐 땐 무조건 메뉴 추가 안되게.
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
