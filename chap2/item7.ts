{
  interface Person {
    name: string;
  }

  interface Lifespan {
    birth: Date;
    death?: Date;
  }

  // 인터섹션 타입
  type PersonSpan = Person & Lifespan;

  const ps: PersonSpan = {
    name: "Alan Turing",
    birth: new Date("1912/06/23"),
    death: new Date("1912/06/23"),
  };

  type K = keyof (Person | Lifespan);

  type A = { a: string };
  type B = { b: string };

  type AB = A & B;
  type AnB = keyof (A & B);
  type AnB2 = keyof (A | B);
  type AnB3 = keyof A | keyof B;
  type AnB4 = keyof A & keyof B;

  // ???
  // keyof (A&B) = (keyof A) | (keyof B)
  // keyof (A|B) = (keyof A) & (keyof B)
}

/**
 * extends 키워드
 */
{
  interface Vector1D {
    x: number;
  }
  interface Vector2D extends Vector1D {
    y: number;
  }
  interface Vector3D extends Vector2D {
    z: number;
  }

  const v1d: Vector1D = { x: 10 };
  const v2d: Vector2D = { x: 10, y: 20 };
  const v3d: Vector3D = { x: 10, y: 20, z: 30 };
}

/**
 * extends 키워드와 집합의 관점
 */
{
  function getKey<K extends string>(val: any, key: K) {}

  getKey({}, "x");
  getKey({}, Math.random() < 0.5 ? "a" : "b");
  getKey({}, document.title);
  getKey({}, 12);
}

/**
 * keyof T
 */
{
  interface Point {
    x: number;
    y: number;
  }
  type PointKeys = keyof Point; // 'x' | 'y'

  function sortBy<T, K extends keyof T>(vals: T[], key: K): T[] {
    return vals;
  }

  const pts: Point[] = [
    { x: 1, y: 2 },
    { x: 2, y: 0 },
  ];

  sortBy(pts, "x");
  sortBy(pts, "y");
  sortBy(pts, Math.random() < 0.5 ? "x" : "y");
  sortBy(pts, "z");
}

/**
 * 타입은 집합이라는 관점
 */
{
  // #1
  type StringOrDate = string | Date;
  type StringOrNumber = string | number;

  type Intersection = StringOrDate & StringOrNumber;

  const I: Intersection = "s";

  // #2
  const list = [1, 2];
  const tuple: [number, number] = list;

  const list2: number[] = tuple;
  const list3: Array<number> = tuple;

  // #3
  const triple: [number, number, number] = [1, 2, 3];
  const double: [number, number] = triple;

  const a: { x: number; y: number } = { x: 1, y: 2 };
  const b: { x: number } = a;

  // #4
  type T = Exclude<string | Date, string | number>;
  type NonZeroNums = Exclude<number, 0 | 1.1>;

  const nonZeroNums: NonZeroNums = 0;
}
