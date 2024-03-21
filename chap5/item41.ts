{
  /**
   * 처음 예시
   */
  {
    function range(start: number, end: number): number[] {
      const out = []; // any[]
      for (let i = start; i <= end; i++) {
        out.push(i);
      }
      return out; // number[]
    }
  }

  /**
   * 타입의 진화
   */
  const result = [];
  result.push("a");
  result; // string[]

  result.push(1);
  result; // (string | number)[]

  /**
   * 조건문
   */
  {
    let val;
    if (Math.random() < 0.5) {
      val = /hello/;
      val; // RegExp
    } else {
      val = 12;
      val; // number
    }
    val; // RegExp | number
  }

  /**
   * try/catch
   */
  {
    let val = null;
    val;
    try {
      // someThingDangerous();
      val = 12;
      val; // number
    } catch (e) {
      console.warn("error");
    }
    val; // number | null
  }

  /**
   * any 유지
   */
  {
    let val: any;

    if (Math.random() < 0.5) {
      val = /hello/;
      val;
    } else {
      val = 12;
      val;
    }
    val;
  }

  /**
   * 암시적 any 변수에 할당 안하고 사용하는 경우
   * 암시적 any 에러 발생
   */
  {
    function range(start: number, limit: number) {
      const out = []; // any[]

      if (start === limit) {
        return out;
      }

      for (let i = start; i <= limit; i++) {
        out.push(i);
      }
      return out; // number[]
    }
  }

  /**
   * 암시적 any 타입은 함수 호출을 거쳐도 진화하지 않음
   */
  {
    function makeSquares(start: number, limit: number) {
      const out = [];

      [1, 1, 1].forEach((i) => out.push(i * i));

      return out;
    }
  }
}
