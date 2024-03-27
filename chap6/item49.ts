import { JSDOM } from "jsdom";

const DOM_STRING = `
  <!DOCTYPE html>
  <html>
    <body>
      <input type="text" />
    </body>
  </html>
`;

const { window, document, alert } = new JSDOM(DOM_STRING).window;

{
  /**
   * class 메서드에 this를 사용
   */
  class C {
    vals = [1, 2, 3];
    logSquares() {
      console.log(this);

      for (const val of this.vals) {
        console.log(val * val);
      }
    }
  }

  const c = new C();
  c.logSquares();

  /**
   * method에 c.logSquares를 할당
   */
  const method = c.logSquares;
  method();

  /**
   * call을 이용해서 this를 바인딩
   */
  const c2 = new C();
  const method2 = c.logSquares;
  // method2.call(c2);

  /**
   * DOM 이벤트 핸들러에서 this는 이벤트가 발생한 엘리먼트를 가리킴
   */
  document.querySelector("input")!.addEventListener("change", function (e) {
    console.log(this);
  });

  /**
   * ResetButton에서 onClick을 호출하면, this 바인딩 문제로 "Reset이 정의되지 않았습니다" ?
   * 잘 되는데?
   */
  const makeButton = (config: { text: string; onClick: () => void }) => {
    const $button = document.createElement("button");

    $button.textContent = config.text;
    $button.addEventListener("click", config.onClick);

    document.body.appendChild($button);

    return $button;
  };

  class ResetButton {
    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }
    onClick() {
      console.log(this);
      console.log(`Reset ${this}`);
    }
  }

  const resetButton = new ResetButton();
  resetButton.render();

  const btn = document.querySelector("button");
  btn?.click();

  // resetButton.onClick();
  // console.dir(resetButton);

  /**
   * ResetButton의 onClick에 this를 바인딩
   */
  class ResetButton2 {
    constructor() {
      this.onClick = this.onClick.bind(this);
    }

    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }

    onClick() {
      console.log(this);
      console.log(`Reset ${this}`);
    }
  }

  const resetButton2 = new ResetButton2();
  // console.dir(resetButton2);

  /**
   * onClick 함수를 화살표 함수로 변경
   */
  class ResetButton3 {
    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }

    onClick = () => {
      console.log(this);
      console.log(`Reset ${this}`);
    };
  }

  /**
   * 콜백 함수의 매개변수에 this를 추가하고, 콜백 함수를 call로 호출
   */
  function addKeyListener(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
  ) {
    el.addEventListener("keydown", (e) => {
      fn.call(el, e);
    });
  }
  addKeyListener(
    document.querySelector("input")!,
    function (this: HTMLElement, e) {
      console.log(this);
    }
  );

  /**
   * call을 제거하고 fn을 두 개의 매개변수로 호출
   */
  function addEventListener2(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
  ) {
    el.addEventListener("keydown", (e) => {
      // fn(el, e);
    });
  }

  /**
   *
   */
  function addKeyListener3(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
  ) {
    el.addEventListener("keydown", (e) => {
      // fn(e);
    });
  }
}
