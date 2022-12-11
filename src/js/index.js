/*
- 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
- 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- 총 메뉴 갯수를 count하여 상단에 보여준다.
- 메뉴가 추가되고 나면, input(입력창)은 빈 값으로 초기화한다.
- 사용자 입력값이 빈 값이라면 추가되지 않는다.

*/

const $ = (selector) => document.querySelector(selector);
//document.querySeletor가 반복적으로 사용되고 있음. $(달러)표시는 JS에서의 DOM Element를 가져올 때 관용적으로 많이 사용되는데,  이 $ 표시를 이용해서 이러한 document.querySelector를 리턴해주는 형태로 만들어 이걸 재사용할 것. 여기 문법에서는 한줄로 코드를 썼는데 이렇게 한줄로 쓰면 이걸 바로 리턴해준다는 의미임.

function App() {
  //form 태그가 자동으로 전송되는 걸 방지하기. (엔터키를 누르면 자동으로 전송됨 > 이를 막기)
  //자동으로 전송되는 이벤트가 "submit", 그 이벤트를 막기 위해 preventDefault() 설정하기

  //$로 바꾸기 전.
  // document
  //   .querySelector("#espresso-menu-form")
  //   .addEventListener("submit", (e) => {
  //     e.preventDefault();
  //   });

  //$로 교체한 이후 (코드가 짧아짐.)
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //메뉴의 이름 입력받기
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    //엔터키입력을 눌렀을 때 입력창에 있는 값 콘솔에 찍어보기
    if (e.key === "Enter") {
      //value가 가져오는 값을 변수에 담아서 활용하기
      const espressMenuName = $("#espresso-menu-name").value;

      //추가되는 메뉴의 마크업 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입하기

      //추가된 메뉴 템플릿 만들기 (메뉴이름 + 수정/삭제)
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
      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
      $(".menu-count").innerText = `총 ${menuCount} 개`;
    }
  });
}

App();
