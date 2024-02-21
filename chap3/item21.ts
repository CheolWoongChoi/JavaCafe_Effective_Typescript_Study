// getComponent 함수는 ‘x’ | ‘y’ | ‘z’ 타입을 기대했지만, 넓히기로 string으로 추론
{
  interface Vector3 {
    x: number;
    y: number;
    z: number;
  }
  function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
    return vector[axis];
  }

  let x = "x";
  let vec = { x: 10, y: 20, z: 30 };
  getComponent(vec, x);
}

// TS는 명확성과 유연성 사이의 균형을 유지하려고 함.
{
  const mixed = ["x", 1];

  let x = "x";
  x = "a";
  x = "Four score and seven years ago...";
}

/**
 * 넓히기 과정을 제어할 수 있도록 몇 가지 방법을 제공
 **/

// const 사용하기
{
  // 성공 사례
  interface Vector3 {
    x: number;
    y: number;
    z: number;
  }
  function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
    return vector[axis];
  }

  const x = "x";
  let vec = { x: 10, y: 20, z: 30 };
  getComponent(vec, x);
}

// 객체의 경우 : let으로 할당된 것처럼 타입을 다룸
{
  const v = {
    x: 1,
  };

  v.x = 3;
  v.x = "3";
  v.y = 4;
  v.name = "Pythagoras";
}

/**
 * TS의 기본 동작을 재정의 하는 세가지 방법 (타입 추론의 강도를 직접 제어하기)
 **/

// 1. 명시적 타입 구문 제공
{
  const v: { x: 1 | 3 | 5 } = {
    x: 1,
  };
}

// 2. 타입 체커에 추가적인 문맥 (ex> 함수의 매개변수로 값을 전달?)

// 3. const 단언문 사용하기
{
  // 객체 예시
  const v1 = {
    x: 1,
    y: 2,
  }; // { x: number, y: number}

  const v2 = {
    x: 1 as const,
    y: 2,
  }; // { x: 1, y: number}

  const v3 = {
    x: 1,
    y: 2,
  } as const; // { readonly x: 1, readonly y: 2 }

  // 튜플 예시
  const a1 = [1, 2, 3]; // number[]
  const a2 = [1, 2, 3] as const; // readonly [1, 2, 3]
}
