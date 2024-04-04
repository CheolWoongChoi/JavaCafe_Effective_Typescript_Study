/// <reference path="./types.d.ts" />
// @ts-check

{
  /**
   * @type {{first: string, last: string}}
   */
  const person = { first: "Grace", last: "Hopper" };
  person.firsd;

  /**
   * User 관련
   */
  console.log(user.firstName);

  /**
   * jQuery 관련
   */
  $("#graph").css({ width: "100px", height: "100px" });

  /**
   * DOM 관련
   */
  const ageEl = /**
   * @type {HTMLInputElement}
   */ (document.getElementById("age"));
  ageEl.value = "12";

  const ageEl2 = document.getElementById("age");
  /** @type {HTMLInputElement} */ (ageEl2).value = "13";

  /**
   * 엘리먼트의 크기 (픽셀 단위)를 가져 옵니다.
   * @param {Element} el 해당 엘리먼트
   * @return {{ width: number, height: number }} 크기
   */
  function getSize(el) {
    const bounds = el.getBoundingClientRect();

    return { width: bounds.width, height: bounds.height };
  }

  /**
   * JSDoc을 활용하여 타입을 점진적으로 추가
   */

  /**
   * 예제1
   * @param {number} val
   * @returns
   */
  function double(val) {
    return 2 * val;
  }

  /**
   * 예제2
   * @param {{
   *  files: { forEach: (arg0: (file: any) => Promise<void>) => void; }
   * }} data
   */
  function loadData(data) {
    data.files.forEach(async (file) => {});
  }
}
