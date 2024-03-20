{
  /**
   * 객체에 속성을 추가할 수 있는 기능
   * 자바스크립트는 가능
   **/
  {
    window.monkey = "hello";
    document.monkey = "hello";

    const el = document.getElementById("foo");
    el.home = "home";
  }

  /**
   * 프로토타입에 속성 추가했을 때
   */
  {
    RegExp.prototype.monkey = "Capuchin";

    /123/.monkey; // Capuchin
  }

  /**
   * 타입체커는 임의의 추가한 속성을 모름
   * as 단언문으로 타입 체커 통과시키기
   * 그러나 언어서비스 지원 못받음
   */
  {
    document.monkey = "Tamarin";

    (document as any).monky = "Tamarin"; // 오타도 허용

    (document as any).monkey = /Tamarin/; // 잘못된 값도 할당
  }
}

/**
 * DOM과 데이터를 분리해서 해결하기
 *
 * 1. interface 보강 사용하기
 */
export {};
declare global {
  interface Document {
    monkey: string;
  }
}
document.monkey = "Tamarin";

/**
 * DOM과 데이터를 분리해서 해결하기
 *
 * 2. 더 구체적인 타입 단언문 사용하기
 */
{
  interface MonkeyDocument extends Document {
    monkey: string;
  }
  (document as MonkeyDocument).monkey = "Tamarin";
}
