{
  /**
   * 선언되지 않은 클래스 멤버
   */
  class Greeting {
    greeting: string;
    name: any;

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
  const state2 = {
    name: "New York",
    capital: "Albany",
  };

  interface State {
    name: string;
    capital: string;
  }
  const state3 = {} as State;
  state3.name = "New York";
  state3.capital = "Albany";

  /** 예제2 */
  function double2(num) {
    return 2 * num;
  }

  double2("trouble");
}
