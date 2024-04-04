// @ts-check

{
  /**
   * 선언되지 않은 클래스 멤버
   */
  class Greeting {
    constructor(name) {
      this.greeting = "Hello";
      this.name = name;
    }

    greet() {
      return this.greeting + " " + this.name;
    }
  }

  /**
   * 타입이 바뀌는 값
   */

  /** 예제1 */
  const state = {};
  state.name = "New York";
  state.capital = "Albany";

  /** 예제2 */
  /**
   * @param {number} num
   */
  function double(num) {
    return 2 * num;
  }

  double("trouble");
}
