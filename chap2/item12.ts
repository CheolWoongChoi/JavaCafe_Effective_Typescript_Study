
{
  /**
   * 다양한 함수 선언 방식과 타입 선언
   */
  function rollDice1(sides: number): number { return 1}
  const rollDice2 = function(sides: number): number { return 1 };
  const rollDice3 = (sides: number): number => { return 1 };
}


{
  /**
   * 함수 표현식에 타입 적용하기
   */
  type DiceRollFn = (sides: number) => number;
  const rollDice: DiceRollFn = (sides) => Math.floor(Math.random() * sides) + 1;
}

{
  /**
   * 함수 타입 선언의 장점
   * - 1) 불필요한 코드의 반복을 줄인다.
   * - 2) 함수 선언문에서 사용한 타입선언보다 타입 구문이 적다.
   * - 3) 함수 구현부와 타입이 분리되어 있어 로직이 분명해 보인다.
   * - 예제) 사칙연산을 하는 함수
   */
  function add(a: number, b: number) { return a + b; }
  function sub(a: number, b: number) { return a - b; }
  function mul(a: number, b: number) { return a * b; }
  function div(a: number, b: number) { return a / b; }
  

  type BinaryFn = (a: number, b: number) => number;
  const add: BinaryFn = (a, b) => a + b;
  const sub: BinaryFn = (a, b) => a - b;
  const mul: BinaryFn = (a, b) => a * b;
  const div: BinaryFn = (a, b) => a / b;
}

{
  /**
   * fetch 관련
   * - fetch 함수 타입은 lib.dom.d.ts에 정의되어 있다.
   */

  (async () => {
    /**
     * 함수 선언문으로 작성한 checkedFetch 
    **/
    // async function checkedFetch(input: RequestInfo, init?: RequestInit) {
    //   const response = await fetch(input, init);
    //   if (!response.ok) {
    //     throw new Error(`Request failed: ${response.status}`);
    //   }
    //   return response;
    // }

    const checkedFetch: typeof fetch = async (input, init) => {
      const response = await fetch(input, init);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
        
        // 에러를 return 하면 ?
        // return new Error(`Request failed: ${response.status}`);
      }
      return response;
    }

    // const response = await checkedFetch('/api/users');
    // const quote = await response.json();
  })()
}

{
  (async () => {
    try {
      const response = await fetch('https://api.github.com1/users/???');
      const json = await response.json();

      console.log(json)
    } catch(e) {
      console.log('error!')
      console.log(e);
    }
  })()
}