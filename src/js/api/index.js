const BASE_URL = "http://localhost:3000/api";

const MenuApi = {
  // 카테고리 별 데이터 가져오는 API 함수
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
  },

  // 메뉴 생성하는 API 함수
  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.error("에러가 발생했습니다.", response);
      alert("에러가 발생했습니다.");
    }
  },

  // 메뉴 수정하는 API 함수
  async updateMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.", response);
      alert("에러가 발생했습니다.");
    }
    return response.json();
  },

  // 토글로 품절 처리하는 API 함수
  async toggleSoldOutMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.", response);
      alert("에러가 발생했습니다.");
    }
  },

  // 메뉴 삭제하는 API 함수
  async deleteMenu(category, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.error("에러가 발생했습니다.", response);
      alert("에러가 발생했습니다.");
    }
  },
};

export default MenuApi;
