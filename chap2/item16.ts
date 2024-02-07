{
  // 객체의 키를 문자열로 바꾸는 JS
  const x = {};
  x[[1, 2, 3]] = 2; // x == { '1,2,3': 2 }

  const y = { 1: 2, 3: 4 };

  // 문자열 키와 숫자열 키를 별개로 인식 ???
  const xsArray = [1, 2, 3];
  // const xs = [1,2,3] as const;
  const xs = [1, 2, 3];
  const x0 = xs[0];
  const x1 = xs[1];
  const x12 = xs["1"]; // OK 인데?

  // ???
  xsArray[10]; // 일반 배열은 갯수를 모르니까 체크 못함
  xs[10]; // length 체크하는 듯
  xs["as"];
  xs["bbb"];

  // ??? -> k가 string 이어도 잘 동작
  function get<T>(array: T[], k: string): T {
    return array[k];
  }

  // 배열을 순회하는 코드 스타일에 대한 실용적인 허용
  const keys = Object.keys(xs);
  for (const key in xs) {
    key; // string 타입
    const x = xs[key]; // key가 string 타입이지만, 타입에러 없음
  }

  // -> for of
  for (const x of xs) {
    x; // number 타입
  }

  // -> Array.prototype.forEach
  xs.forEach((x) => {
    x; // number 타입
  });

  // for
  for (let i = 0; i < xs.length; i++) {
    xs[i]; // number 타입
  }
}

// 배열과 유사하되, Array 타입의 다른 속성을 배제하고 싶다 (튜플, Array 타입)
{
  function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
    if (i < xs.length) {
      return xs[i];
    }

    throw new Error("Out of bounds");
  }
  checkedAccess([1, 2, 3], 2); // 3
  checkedAccess([1, 2, 3], 5); // Out of bounds

  // 숫자 키, 문자열 키 모두 허용
  const tupleLike: ArrayLike<string> = {
    "0": "a",
    "1": "b",
    2: "2",
    length: 2,
  };
}
