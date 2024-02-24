declare let hasMiddle: boolean;
declare let hasDates: boolean;

/* 
  2차원 점을 표현하는 객체를 생성하는 방법.
  → 빈 객체를 할당하는 경우, 타입 단언문 사용하기
  → 객체를 생성할 때, 한꺼번에 값을 정의해주는 것이 좋음. 
*/

{
  // {} 객체에 2차원 점 속성을 할당한 경우, 에러
  const pt = {};
  pt.x = 3;
  pt.y = 4;

  // Point 인터페이스 정의 후, 점 속성을 할당한 경우, 에러
  interface Point {
    x: number;
    y: number;
  }
  const pt2: Point = {};
  pt2.x = 3;
  pt2.y = 4;

  // 타입 단언(as)을 사용해서 타입체커를 통과시키는 경우, 성공
  const pt3 = {} as Point;
  pt3.x = 3;
  pt3.y = 4;

  // 객체를 한꺼번에 전달하는 경우, 성공
  const ptAtOnce: Point = {
    x: 3,
    y: 4,
  };
}

/* 
  작은 객체들을 조합해서 큰 객체를 만들어야 하는 경우,
  → 객체 전개 연산자를 이용하기. 
*/
{
  interface Point {
    x: number;
    y: number;
  }

  // 작은 객체를 조합해서 큰 객체를 만드는 경우, 에러
  const pt4 = { x: 3, y: 4 };
  const id = { name: "Pythagoras" };
  const namedPoint = {};
  Object.assign(namedPoint, pt4, id);
  namedPoint.name;

  // 작은 객체를 조합해서 큰 객체를 만드는 경우 with 전개 연산자, 성공
  const namedPoint2 = { ...pt4, ...id };
  namedPoint2.name; // string

  // 업데이트 마다 새 변수를 사용하여 새로운 타입을 얻는다.
  // -> 예시가 너무 억지스러움.
  const ptEmpty = {};
  const ptWithX = { ...ptEmpty, x: 3 };
  const ptWithXY: Point = { ...ptWithX, y: 4 };
}

/* 
  특정값의 유무 (조건)에 따라 객체에 속성을 추가하기
  → 객체 전개 연산자 + 삼항 연산자 
*/
{
  // 조건에 따라 속성을 추가하기
  // declare let hasMiddle: boolean;
  const firstLast = { first: "Harry", last: "Truman" };
  const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };

  // 조건에 따라 여러 속성 추가하기
  // -> 책과 다르게 선택적 필드로 타입추론 됨, TS PG 홈페이지에서 해봐도 마찬가지
  // declare let hasDates: boolean;
  const nameTitle = { name: "Khufu", title: "Pharaoh" };
  const pharaoh = {
    ...nameTitle,
    ...(hasDates ? { start: -2589, end: -2566 } : {}),
  };

  pharaoh.start;

  // 헬퍼 함수를 이용해서, 선택적 필드 방식으로 표현하기
  // -> 헬퍼 함수 안써도, 추가적인 속성이 선택적 필드로 타입 추론됨
  function addOptional<T extends object, U extends object>(
    a: T,
    b: U | null
  ): T & Partial<U> {
    return { ...a, ...b };
  }

  const pharaoh2 = addOptional(
    nameTitle,
    hasDates ? { start: -2589, end: -2566 } : null
  );
  pharaoh2.start;
}
