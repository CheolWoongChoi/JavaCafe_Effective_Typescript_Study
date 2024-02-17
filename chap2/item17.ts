import { DeepReadonly } from "ts-essentials";

{
  // 삼각수를 출력
  function printTriangles(n: number) {
    const nums = [];
    for (let i = 0; i < n; i++) {
      nums.push(i + 1);

      console.log(arraySum3(nums));
    }
  }

  // 기존 : 잘못된 예제
  function arraySum(arr: number[]) {
    let sum = 0,
      num;
    while ((num = arr.pop()) !== undefined) {
      sum += num;
    }
    return sum;
  }

  // readonly 배열을 사용한 예제
  function arraySum2(arr: readonly number[]) {
    let sum = 0,
      num;
    while ((num = arr.pop()) !== undefined) {
      sum += num;
    }

    return num;
  }

  function arraySum3(arr: readonly number[]) {
    let sum = 0;
    for (const num of arr) {
      sum += num;
    }

    return sum;
  }

  // printTriangles(5);
}

{
  // 상위집합과 부분집합
  let strLiteral: "hello" = "hello"; // 'hello'만 할당 가능
  let str: string = "hello"; // 'hello'뿐만 아니라 다른 문자열도 할당 가능

  // strLiteral은 str의 부분집합
  // strLietral은 str의 서브타입 (더 구체적인 타입)
  // strLiteral (= str
  // 부분집합(서브타입)은 상위집합에 할당할 수 있다. (반대는 불가)
  str = strLiteral;
  strLiteral = str;

  // readonly number[] 는 number[]의 상위집합
  const a: number[] = [1, 2, 3];
  const b: readonly number[] = a;
  const c: number[] = b;
}

// 빈 줄을 기준으로 구분되는 단락으로 나누는 기능
{
  const lines = [
    "Frankenstein; or, the Modern Prometheus",
    "by Mary Shelley",
    "",
    "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.",
    "",
    "I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight.",
  ];

  function parseTaggedText(lines: string[]): string[][] {
    const paragraphs: string[][] = [];
    const currPara: string[] = [];

    const addParagraph = () => {
      if (currPara.length) {
        paragraphs.push(currPara);
        currPara.length = 0; // 배열을 비움
      }
    };

    for (const line of lines) {
      if (!line) {
        addParagraph();
      } else {
        currPara.push(line);
      }

      console.log();
    }

    addParagraph();
    return paragraphs;
  }

  // readonly를 사용해서 currParr를 수정 불가능하게 하기
  function parseTaggedText2(lines: string[]): string[][] {
    const paragraphs: string[][] = [];
    const currPara: readonly string[] = [];

    const addParagraph = () => {
      if (currPara.length) {
        paragraphs.push(currPara);
        currPara.length = 0;
      }
    };

    for (const line of lines) {
      if (!line) {
        addParagraph();
      } else {
        currPara.push(line);
      }

      console.log();
    }

    addParagraph();
    return paragraphs;
  }

  // 최종 수정
  function parseTaggedText3(lines: string[]): (readonly string[])[] {
    const paragraphs: (readonly string[])[] = [];
    // const paragraphs: readonly string[][] = [];
    let currPara: readonly string[] = [];

    const addParagraph = () => {
      if (currPara.length) {
        paragraphs.push([...currPara]); // currPara의 복사본을 전달
        // paragraphs.push(currPara); // currPara의 복사본을 전달
        currPara = []; // 배열을 비움
      }
    };

    for (const line of lines) {
      if (!line) {
        addParagraph();
      } else {
        currPara = currPara.concat([line]); // 원본을 수정하지 않고 새 배열을 반환
      }
    }

    addParagraph();
    return paragraphs;
  }

  /**
   * 사용처
   */

  // console.log(parseTaggedText(lines)); // 문제
  // console.log(parseTaggedText2(lines)); // 문제
  // console.log(parseTaggedText3(lines)); // 해결
}

// readonly는 얕게 동작한다.
{
  // 배열의 요소가 객체인 경우 객체의 프로퍼티는 수정할 수 있다.
  const dates: readonly Date[] = [new Date(), new Date()];
  dates.push(new Date());
  dates[0].setFullYear(2020);
  console.log(dates);

  // Readonly 제네릭
  interface Outer {
    inner: {
      x: number;
    };
  }
  const o: Readonly<Outer> = { inner: { x: 0 } };
  o.inner = { x: 1 }; // 에러
  o.inner.x = 1; // 가능

  // 타입 별칭에 Readonly 적용
  type T = Readonly<Outer>;

  // 인덱스 시그니처에 readonly 적용
  let obj: { readonly [k: string]: number } = {};
  let obj2: Readonly<{ [k: string]: number }> = {};

  obj.hi = 45;
  obj = { ...obj, hi: 45 };
  obj = { ...obj, bye: 123 };

  obj2.hi = 45; // 에러
  obj2 = { ...obj2, hi: 45 };

  // DeepReadonly (ts-essentials)
  const o2: DeepReadonly<Outer> = { inner: { x: 0 } };
  o2.inner = { x: 1 }; // 에러
  o2.inner.x = 1; // 에러

  // const와 readonly의 차이 ?
  const ca = { x: 1 };
  ca.x = 2;

  const ra: { readonly x: number } = { x: 1 };
  ra.x = 2; // 에러
}

// readonly 사용처
{
  const ta: readonly number[] = [1, 2, 3];
  const ta2: { readonly x: string } = { x: "hi", y: "bye" };
  const ta3: readonly number[] = [1, 2, 3];

  ta2.x = "bye";
  ta2.y = "hi";
  ta3[0] = 4;
}
