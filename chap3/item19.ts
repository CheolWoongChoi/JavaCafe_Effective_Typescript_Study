// 타입 추론해주는 TS
{
  // number 타입 추론
  let x = 12;

  // 객체 타입 추론
  const person = {
    name: "Jack",
    born: {
      where: "Seoul",
      when: "1994",
    },
    died: {
      where: "Seoul",
      when: "2018",
    },
  };

  // 함수 반환 타입 추론
  const square = (nums: number[]) => nums.map((x) => x * x);
  const squares = square([1, 2, 3, 4, 5]);

  // 문자열을 넘어, 문자열 리터럴 타입으로 추론
  const axis1: string = "x";
  const axis2 = "y";
}

// 타입 추론을 통해 리팩터링이 용이
{
  interface Product {
    // id: number;
    id: string; // id를 string으로 변경한다면 ?
    name: string;
    price: number;
  }

  // 명시적으로 변수를 선언
  function logProduct(product: Product) {
    const id: number = product.id;
    const name: string = product.name;
    const price: number = product.price;
    console.log(id, name, price);
  }

  // 비구조화 할당문 사용, product 매개변수의 타입은 타입 선언시 결정
  function logProduct2(product: Product) {
    const { id, name, price } = product;
    // const { id, name, price }: { id: string; name: string; price: number } =
    //   product;
    console.log(id, name, price);
  }
}

// 타입 구문을 생략하는 경우
{
  // 매개변수에 기본값을 설정하는 경우
  function parseNumber(str: string, base = 10) {
    return parseInt(str, base);
  }

  // 라이브러리에서 콜백 함수의 매개변수 타입은 자동으로 추론
  // express HTTP 서버 라이브러리 예시
  app.get("/health", (req, res) => {
    res.send("OK");
  });
}

// 타입 추론이 되어도, 타입을 명시하고 싶은 경우
{
  // 필요한 인터페이스, 함수 셋팅
  interface Product {
    id: string;
    name: string;
    price: number;
  }
  function logProduct(product: Product) {}

  // 객체 리터럴에 타입을 명시: 초과 속성 체크 동작
  const elmo: Product = {
    name: "Tickle Me Elmo",
    id: "123 456 789",
    price: 28.99,
  };
  logProduct(elmo); // OK

  const furby = {
    name: "Furby",
    id: 456,
    price: 200,
  };
  logProduct(furby); // Error: id 타입 불일치

  const furby2: Product = {
    name: "Furby",
    id: 456,
    price: 200,
  };

  // 함수의 반환에도 타입을 명시하여 오류 방지
  const cache: { [ticker: string]: number } = {};
  async function getQuote(ticker: string): Promise<number> {
    if (ticker in cache) {
      return cache[ticker];
    }
    return fetch(`https://quotes.example.com/?q=${ticker}`)
      .then((res) => res.json())
      .then((quote) => {
        cache[ticker] = quote;
        return quote;
      });
  }

  getQuote("AAPL").then((quote) => console.log(quote));

  // TS는 타입 추론을 통해 타입을 추론하지만, 명시적으로 타입을 선언하는 것이 좋다.
  interface Vector2D {
    x: number;
    y: number;
  }
  function add(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x + b.x, y: a.y + b.y };
  }
}
