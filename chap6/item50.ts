{
  /**
   * 함수 오버로딩을 사용
   * 모호한 부분 존재
   *
   * string -> string | number 반환
   * number -> string | number 반환
   */
  {
    function double(x: number | string): number | string;
    function double(x: any) {
      return x + x;
    }

    const num = double(12);
    const str = double("x");
  }

  /**
   * 제너릭을 사용하여 동작 모델링
   * => 타입이 너무 과하게 구체적
   */
  {
    function double<T extends number | string>(x: T): T;
    function double(x: any) {
      return x + x;
    }

    const num = double(12);
    const str = double("x");
  }

  /**
   * 여러가지 타입 선언으로 분리하기
   */
  {
    function double(x: number): number;
    function double(x: string): string;
    function double(x: any) {
      return x + x;
    }

    const num = double(12);
    const str = double("x");

    /**
     * 유니온 타입 관련해서는 문제 발생
     */
    function f(x: number | string) {
      return double(x);
    }
  }

  /**
   * 조건부 타입 (conditional type) 사용
   */
  {
    function double<T extends number | string>(
      x: T
    ): T extends string ? string : number;
    function double(x: any) {
      return x + x;
    }

    const num = double(12);
    const str = double("x");

    function f(x: number | string) {
      return double(x);
    }
  }
}
