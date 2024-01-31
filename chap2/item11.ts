{
  // 구조적 타이핑은 할당할 때 실패
  interface Room {
    numDoors: number;
    ceilingHeightFt: number;
  }

  const r1: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: "present",
  };

  // 다른 변수가 같은 타입을 가지면 할당 가능 (구조적 타이핑)
  const r2: Room = r1;
}

{
  // 잉여 속성 체크 (함수 매개변수)

  interface Options {
    title: string;
    darkMode?: boolean;
  }

  function createWindow(options: Options) {}

  // 함수 매개변수로 객체 리터럴 전달 시 에러
  createWindow({
    title: "Spider",
    darkmode: true, // -> 의도와 다르다고 판단
  });
}

{
  interface Options {
    title: string;
    darkMode?: boolean;
  }

  const o = { darkmode: true, title: "t" } as Options;
}

{
  interface Options {
    darkMode?: boolean;
    [others: string]: unknown;
  }

  const o: Options = { darkmode: true };
}

{
  interface LineChartOptions {
    logscale?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
  }

  const opts = { logScale: true };
  const o: LineChartOptions = opts;
}

/**
 * 테스트
 */

{
  // 넓은 타입인 Options
  interface Options {
    title: string;
    darkMode?: boolean;
  }

  const o1: Options = document;
  const o2: Options = new HTMLAnchorElement();

  const docu = document;
  docu.title;
  const anchor = new HTMLAnchorElement();
  anchor.title;

  // 잉여 속성 체크 : 객체 리터럴에 알 수 없는 속성 허용 X
  const o3: Options = {
    title: "Ski Free or Die Hard",
    darkmode: true,
    rest: "rest spread",
  };
  const o4: Options = o3;

  const intermidate = {
    darkmode: true,
    title: "Ski Free",
    c: "c",
    d: Symbol("d"),
  };
  const o5: Options = intermidate;

  const o6 = { darkmode: true, title: "Ski Free", reset: "reset" } as Options;
}

// 잉여 속성을 원하지 않는다.
{
  interface Options {
    darkMode?: boolean;
    [otherOptions: string]: unknown;
  }

  const o: Options = { darkmode: true };
}

{
  interface LineChartOptions {
    logscale?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
  }

  const opts = { logScale: true };
  const o: LineChartOptions = opts;
}
