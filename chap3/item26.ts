/* 문자열 리터럴의 경우 */
{
  // 값을 변수로 분리하면, 타입스크립트는 할당 시점에 타입을 추론
  type Language = "JavaScript" | "TypeScript" | "Python";
  function setLanguage(language: Language) {
    /* */
  }
  setLanguage("JavaScript");

  let language = "JavaScript";
  setLanguage(language);

  // 1. 타입 선언에서 language의 가능한 값을 제한
  let language2: Language = "JavaScript";
  setLanguage(language2); // OK

  // 2. language를 상수로 만들기
  const language3 = "JavaScript";
  setLanguage(language3); // OK
}

/* 튜플 사용 시 */
{
  function panTo(where: [number, number]) {}
  panTo([10, 20]); // OK

  const loc = [10, 20];
  panTo(loc); // 에러

  // 1. 타입 선언 제공
  const loc2: [number, number] = [10, 20];
  panTo(loc2); // OK

  // 2. 상수 문맥 (as const) 제공
  function panTo2(where: readonly [number, number]) {}

  const loc3 = [10, 20] as const;
  panTo2(loc3);

  // as const의 문제, 타입 정의에 실수가 있다면 호출되는 곳에서 문제 발생
  const loc4 = [10, 20, 30] as const;
  panTo2(loc4); // 에러
}

/* 객체 사용 시 */
{
  // 문맥에서 값을 분리할 때 문제
  type Language = "JavaScript" | "TypeScript" | "Python";
  interface GovernedLanguage {
    language: Language;
    organization: string;
  }

  function complain(language: GovernedLanguage) {}
  complain({ language: "TypeScript", organization: "Microsoft" }); // OK

  const ts = {
    language: "TypeScript",
    orginazation: "Microsoft",
  };
  complain(ts); // 에러

  // 타입 선언 제공
  const ts2: GovernedLanguage = {
    language: "TypeScript",
    organization: "Microsoft",
  };
  complain(ts2); // OK

  // as const
  const ts3 = {
    language: "TypeScript",
    organization: "Microsoft",
  } as const;
  complain(ts3); // OK
}

/* 콜백 사용 시 */
{
  function callWithRandomNumber(fn: (n1: number, n2: number) => void) {
    fn(Math.random(), Math.random());
  }
  callWithRandomNumber((a, b) => {
    a;
    b;
    console.log(a + b);
  });

  // 콜백을 상수로 뽑으면 ?
  const fn = (a, b) => {
    console.log(a + b);
  };
  callWithRandomNumber(fn);

  // 매개 변수에 타입 구문을 추가해주기
  const fn2 = (a: number, b: number) => {
    console.log(a + b);
  };
  callWithRandomNumber(fn2);
}
