{
  const rocket = {
    name: "Falcon 9",
    variant: "Block 5",
    thrust: "7,607 kN",
  };

  // 인덱스 시그니처
  type Rocket = { [property: string]: string };
  const rocket2: Rocket = {
    name: "Falcon 9",
    variant: "v1.0",
    thrust: "4,940 kN",
  };

  // 인덱스 시그니처의 부정확한 부분 때문에,, 인터페이스 적용
  interface RocketBetter {
    name: string;
    variant: string;
    thrust_KN: number;
  }
  const falconHeavy: RocketBetter = {
    name: "Falcon Heavy",
    variant: "Block 5",
    thrust_KN: 22_819,
  };

  // 인덱스 시그니처는 동적 데이터를 표현할 때 사용
  function parseCSV(input: string): { [columnName: string]: string }[] {
    const lines = input.split("\n");
    const [header, ...rows] = lines;
    const headerColumns = header.split(",");

    return rows.map((rowStr) => {
      const row: { [columnName: string]: string } = {};
      rowStr.split(",").forEach((cell, i) => {
        row[headerColumns[i]] = cell;
      });

      return row;
    });
  }

  // -> 인덱스 시그니처의 특정 부분을, 타입 단언문으로 적용
  interface ProductRow {
    productId: string;
    name: string;
    price: number;
  }

  let csvData: string;
  const products = parseCSV(csvData) as unknown as ProductRow[];

  // -> 런타임 보장 여부를 알 수 없어 undefined 타입 추가
  function safeParseCSV(
    input: string
  ): { [columnName: string]: string | undefined }[] {
    return parseCSV(input);
  }

  const rows = parseCSV(csvData);
  const prices: { [productId: string]: number } = {};
  for (const row of rows) {
    prices[row.productId] = Number(row.price);
  }

  // -> ??
  const safeRows = safeParseCSV(csvData);
  for (const row of safeRows) {
    prices[row.productId] = Number(row.price);
  }

  // 어떤 타입에 필드의 갯수가 정해진 경우
  interface Row1 {
    [column: string]: number;
  } // No
  interface Row2 {
    a: number;
    b?: number;
    c?: number;
    d?: number;
  } // Best
  type Row3 =
    | { a: number }
    | { a: number; b: number }
    | { a: number; b: number; c: number }
    | { a: number; b: number; c: number; d: number };
  // Hard

  // -> 1) Record를 사용하기
  type Vec3D = Partial<Record<"x" | "y" | "z", number>>;
  const vec3d: Vec3D = { x: 1, y: 2, z: 3 };

  // -> 2) 매핑된 타입 사용
  type Vec3D2 = { [k in "x" | "y" | "z"]?: number };
  const vec3d2: Vec3D2 = { x: 1, y: 2, z: 3 };

  // -> 3) 매핑된 타입 + 키마다 별도 타입 선언
  type Vec3D3 = { [k in "x" | "y" | "z"]?: k extends "x" ? string : number };
  const vec3d3: Vec3D3 = { x: "1", y: 2, z: 3 };
}
