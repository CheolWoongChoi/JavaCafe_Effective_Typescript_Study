/**
 * named Type 정의하는 방법 두 가지 : 타입, 인터페이스, 클래스
 */
{
  type TState = {
    name: string;
    capital: string;
  };
  interface IState {
    name: string;
    capital: string;
  }
  class CState {
    name: string;
    capital: string;
  }

  const s1: TState = {
    name: "Alabama",
    capital: "Montgomery",
  };
  const s2: IState = {
    name: "Alaska",
    capital: "Juneau",
  };
  const s3: CState = {
    name: "Arizona",
    capital: "Phoenix",
  };

  /**
   * 타입 선언과 인터페이스 선언의 공통점
   */

  /**
   * 1. 객체 리터럴에 초과 속성 할당 시 에러
   */
  const wyoming: TState = {
    name: "Wyoming",
    capital: "Cheyenne",
    population: 573720,
  };
  const wyoming2: IState = {
    name: "Wyoming",
    capital: "Cheyenne",
    population: 573720,
  };
  const wyoming3: CState = {
    name: "Wyoming",
    capital: "Cheyenne",
    population: 573720,
  };

  /**
   * 2. 인덱스 시그니처 사용 가능
   */
  type TDict = { [key: string]: string };
  interface IDict {
    [key: string]: string;
  }
  class CDict {
    [key: string]: string;
  }

  /**
   * 3. 함수 타입 사용 가능
   */
  type TFn = (x: number) => string;
  interface IFn {
    (x: number): string;
  }
  class CFn {
    // 안됨
    fn: (x: number) => string;
  }

  // 예제
  const toStrT: TFn = (x) => String(x);
  const toStrI: IFn = (x) => String(x);
  const toStrC: CFn["fn"] = (x) => String(x);

  /**
   * 함수 타입에 추가적인 속성이 있는 경우
   */
  type TFnWithProperties = {
    (x: number): string;
    prop: string;
  };
  interface IFnWithProperties {
    (x: number): string;
    prop: string;
  }
  class CFnWithProperties {
    fn: (x: number) => string;
    prop: string;
  }

  const toStrWithPropT: TFnWithProperties = (x) => String(x);
  toStrWithPropT.prop = "hi";
  const toStrWithPropI: IFnWithProperties = (x) => String(x);
  toStrWithPropI.prop = "hi";

  /**
   * 5. 제네릭 가능
   */
  type TPair<T> = {
    first: T;
    second: T;
  };
  interface IPair<T> {
    first: T;
    second: T;
  }

  /**
   * 6. 확장 가능
   * 인터페이스는 타입을 확장할 수 있다 (주의할 점 : 유니온 타입 같은 복잡한 타입은 확장 못함)
   * 타입은 인터페이스를 확장할 수 있다
   */
  interface IStateWithPop extends TState {
    population: number;
  }
  type TStateWithPop = IState & { population: number };

  /**
   * 7. 클래스 구현(implements) 가능
   */
  class StateT implements TState {
    name: string = "South Korea";
    capital: string = "Seoul";
  }
  class StateI implements IState {
    name: string = "South Korea";
    capital: string = "Seoul";
  }

  const stateT: StateT = new StateT();
  const stateI: StateI = new StateT();
  // console.log(stateT);
  // console.log(stateI);
}

/**
 * 타입과 인터페이스의 다른 점
 */
{
  type AorB = "a" | "b";

  /**
   * 1. 인터페이스는 유니온 타입을 확장할 수 없음, 타입은 가능
   */
  type Input = { input: string };
  type Output = { output: string };

  // 조건적으로 Input 또는 Output을 상속할 수 없음
  interface VariableMap extends Input, Output {}
  interface VariableMapWithNamed extends VariableMap {
    name: string;
  }
  const variableMapWithNamed1: VariableMapWithNamed = {
    input: "input",
    output: "output",
    name: "1",
  };

  type NamedVariable = (Input | Output) & { name: string };
  const namedVarable1: NamedVariable = { name: "1", input: "input" };
  const namedVarable2: NamedVariable = { name: "2", output: "output" };
  const namedVarable3: NamedVariable = {
    name: "3",
    input: "input",
    output: "output",
  };

  /**
   * 2. 타입은
   * - 유니온 타입을 사용 가능
   * - 매핑된 타입을 사용 가능
   * - 조건부 타입을 사용 가능
   */
  type TUnion = Input | Output;
  const tUnion1: TUnion = { input: "input" };
  const tUnion2: TUnion = { output: "input" };
  const tUnion3: TUnion = { input: "input", output: "output" };

  type TMapping = { [K in "a" | "b"]: boolean };
  const tMapping: TMapping = { a: true, b: false };

  type TConditional = AorB extends string ? Input : Output;
  const tConditional: TConditional = { input: "input" };

  /**
   * 3. 튜플과 배열 타입도 간결하게 표현 가능
   */
  type Pair = [string, string];
  const pair: Pair = ["a", "b"];
  pair.length;
  pair.concat(["c", "d"]);

  // 인터페이스는 튜플 타입 표현이 한계가 있음
  interface IPair {
    0: string;
    1: string;
    length: 2;
  }
  const pair2: IPair = ["a", "b"];
  pair2.length;
  pair2.concat(["c", "d"]);

  type StringList = string[];
  const stringList: StringList = ["a", "b", "c"];
  stringList.length;
  stringList.concat(["d", "e"]);

  interface IStringList {
    [index: number]: string;
  }
  const stringList2: IStringList = ["a", "b", "c"];
  stringList2.length;

  type NamedNums = [string, ...number[]];
  const namedNums: NamedNums = ["a", 1, 2, 3, 4, 5];
}

/**
 * 인터페이스의 보강(augment)
 *
 * 속성을 확장하는 것을 선언 병합 (declaration merging)이라고 함
 */
{
  interface IState {
    name: string;
    capital: string;
  }
  interface IState {
    population: number;
  }

  const wyoming: IState = {
    name: "Wyoming",
    capital: "Cheyenne",
    population: 573720,
  };
}

/**
 * 표준 라이브러리에서 타입 보강이 사용된다
 * - Array 인터페이스
 */

{
  type Fn = () => void;

  // lib.es5.d.ts
  interface Array {
    forEach: Fn;
    map: Fn;
    filter: Fn;
    reduce: Fn;
  }

  // lib.es2015.d.ts
  interface Array {
    flat: Fn;
    flatMap: Fn;
  }
}
