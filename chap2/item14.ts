/**
 * 타입에 이름 붙이기
 */
{
  // 단순 인터페이스
  interface Point2D {
    x: number;
    y: number;
  }
  function distance(a: Point2D, b: Point2D) {
    return null;
  }

  // 함수형 : 명명된 타입
  type Options = any;
  type Response = any;
  type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

  // function get(url: string, opts: Options): Promise<Response> {
  //   return null;
  // }
  // function post(url: string, opts: Options): Promise<Response> {
  //   return null;
  // }

  const get: HTTPFunction = (url, opts) => null;
  const post: HTTPFunction = (url, opts) => null;

  // 인터페이스 확장하기
  interface Person {
    firstName: string;
    lastName: string;
  }

  // interface PersonWithBirthDate extends Person {
  //   birth: Date;
  // }
  type PersonWithBirthDate = Person & { birth: Date };

  // 부분 집합으로 타입을 정의하는 경우
  interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
  }
  // interface TopNavState {
  //   userId: string;
  //   pageTitle: string;
  //   recentFiles: string[];
  // }

  // 1) 기존 타입을 인덱싱하여 타입 중복 제거
  interface TopNavState {
    userId: State["userId"];
    pageTitle: State["pageTitle"];
    recentFiles: State["recentFiles"];
  }

  // 2) 매핑된 타입 적용 : 기존 타입의 변화를 그대로 반영, type만 가능
  type TopNavState2 = {
    [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
  };

  // Pick을 사용
  type Pick<T, K extends keyof T> = { [k in K]: T[k] };
  interface SaveAction {
    type: "save";
  }
  interface LoadAction {
    type: "load";
  }
  type Action = SaveAction | LoadAction;
  type ActionType = Action["type"];

  // -> Pick을 사용하여 ActionRec 타입을 정의
  type ActionRec = Pick<Action, "type">;

  // 기존 타입을 선택적 필드로 변경하고 싶은 경우
  interface Options2 {
    width: number;
    height: number;
    color: string;
    label: string;
  }
  interface OptionsUpdate {
    width?: number;
    height?: number;
    color?: string;
    label?: string;
  }

  type OptionsUpdateBetter = { [k in keyof Options2]?: Options2[k] };
  type OptionsUpdateBetter2 = Partial<Options2>;

  // 값의 형태에 해당하는 타입 정의하고 싶을 때 (typeof 사용)
  const INIT_OPTIONS = {
    width: 640,
    height: 480,
    color: "#00FF00",
    label: "VGA",
  };
  interface Options3 {
    width: number;
    height: number;
    color: string;
    label: string;
  }

  type Options3Better = typeof INIT_OPTIONS;

  // 함수나 메서드의 반환 값에 명명된 타입을 만들고 싶을 때
  function getUserInfo(userId: string) {
    const returnObject = {
      userId: userId,
      name: "John Doe",
      age: 34,
      height: 6,
      weight: 200,
      favoriteColor: "blue",
    };

    return returnObject;
  }

  type UserInfo = ReturnType<typeof getUserInfo>;

  // 제네릭 타입에서 매개 변수를 제한하는 방법 (extends 사용)
  interface Name {
    first: string;
    last: string;
  }
  type DancingDuo<T extends Name> = [T, T];

  const couple1: DancingDuo<Name> = [
    { first: "Fred", last: "Astaire" },
    { first: "Ginger", last: "Rogers" },
  ]; // OK
  const couple2: DancingDuo<{ first: string }> = [
    { first: "Fred" },
    { first: "Ginger" },
  ]; // Error

  // -> 제네릭은 선언부에 작성하도록 되어 있음
  const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;
  const couple3 = dancingDuo([
    { first: "Fred", last: "Astaire" },
    { first: "Ginger", last: "Rogers" },
  ]); // OK

  const couple4 = dancingDuo([{ first: "Fred" }, { first: "Ginger" }]); // Error
}
