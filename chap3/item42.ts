{
  /**
   * parseYAML 예제
   */
  function parseYAML(yaml: string): any {
    // ...
  }
  interface Book {
    name: string;
    author: string;
  }

  {
    /**
     * 반환값을 원하는 값으로 할당한 경우
     */
    const book: Book = parseYAML(`
      name: Effective TypeScript,
      author: CCW
    `);

    /**
     * 반환값이 암시적 any 타입이 됨
     **/

    const book2 = parseYAML(`
      name: Effective TypeScript,
      author: CCW
    `);

    alert(book2.title); // 런타임 에러
    book2("read"); // 런타임 에러
  }

  /**
   * safeParseYAML 예제
   */
  {
    function safeParseYAML(yaml: string): unknown {
      return parseYAML(yaml);
    }

    /**
     * unknown 타입으로 반환
     */
    const book = safeParseYAML(`
      name: Effective TypeScript,
      author: CCW
      `);

    alert(book.title); // 에러
    book("read"); // 에러

    /**
     * unknown 타입을 다른 타입으로 변환
     */
    const book2 = safeParseYAML(`
      name: Effective TypeScript,
      author: CCW
    `) as Book;

    alert(book2.title); // 에러
    book2("read"); // 에러
  }

  /**
   * 타입을 예상할 수 없을 때 unknown을 사용
   **/
  {
    interface Geometry {}

    interface Feature {
      id?: string | number;
      geometry: Geometry;
      properties: unknown;
    }
  }

  /**
   * instanceof로 unknown에서 원하는 타입으로 변환
   */
  {
    function processValue(val: unknown) {
      if (val instanceof Date) {
        val; // Date
      }
    }
  }

  /**
   * 타입 가드로 unknown에서 원하는 타입으로 변환
   */
  {
    function isBook(val: unknown): val is Book {
      return (
        typeof val === "object" &&
        val !== null &&
        "name" in val &&
        "author" in val
      );
    }

    function processValue(val: unknown) {
      if (isBook(val)) {
        val; // Book
      }
    }
  }

  /**
   * 제네릭을 사용하여 safeParseYAML 함수를 선언
   *
   * 제네릭을 사용하는 것은 타입 단언문과 기능적으로 동일하다?
   */
  {
    function safeParseYAML<T>(yaml: string): T {
      return parseYAML(yaml);
    }

    const book = safeParseYAML<Book>(`
      name: Effective TypeScript,
      author: CCW
    `);
  }

  /**
   * 이중 단언문에서 any 대신 unknown 사용하기
   */
  {
    type Foo = {};
    type Bar = {};
    let foo;

    let barAny = foo as any as Bar;
    let barUnknown = foo as unknown as Bar;
  }

  /**
   * {} 타입과 object 타입 그리고 unknown 타입
   */
  {
    let num: {} = 123;
    let str: {} = "str";
    let bool: {} = true;
    let obj: {} = { a: 1 };
    let nul: {} = null;
    let undef: {} = undefined;

    let obj1: object = 123;
    let obj2: object = "str";
    let obj3: object = true;
    let obj4: object = { a: 1 };
    let obj5: object = [1, 2, 3];
    let obj6: object = new Map();

    let unk1: unknown = 123;
    let unk2: unknown = "str";
    let unk3: unknown = true;
    let unk4: unknown = { a: 1 };
    let unk5: unknown = [1, 2, 3];
    let unk6: unknown = new Map();
    let unk7: unknown = null;
    let unk8: unknown = undefined;

    const a1 = unk1 as number;
    const a2 = unk2 as number;
    const a3 = unk3 as number;
  }
}
