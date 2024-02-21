/**
 * 타입 좁히기
 **/
// if 분기문으로 타입 좁히기
{
  const el = document.getElementById("foo");
  if (el) {
    el; // 타입이 HTMLElement로 좁혀짐

    el.innerHTML = "Party Time";
  } else {
    el; // 타입이 null로 좁혀짐

    alert("No such element");
  }
}

// 예외를 던지기 타입 좁히기
{
  const el = document.getElementById("foo");
  if (!el) {
    throw new Error("No such element");
  }

  el; // HTMLElement로 좁혀짐
  el.innerHTML = "Party Time";
}

// instanceof로 타입 좁히기
{
  function contains(text: string, search: string | RegExp) {
    if (search instanceof RegExp) {
      search; // 타입이 RegExp로 좁혀짐
      return;
    }

    search; // 타입이 string으로 좁혀짐
    return text.includes(search);
  }
}

// 속성 체크(in 연산자) 로 타입 좁히기
{
  interface A {
    a: number;
  }
  interface B {
    b: number;
  }
  function pickAB(ab: A | B) {
    if ("a" in ab) {
      ab; // 타입이 A로 좁혀짐
    } else {
      ab; // 타입이 B로 좁혀짐
    }
  }
}

// Array.isArray 로 타입 좁히기
{
  function contains(text: string, search: string | string[]) {
    const termList = Array.isArray(search) ? search : [search];
  }
}

// 잘못된 타입 좁히기 (typeof로 null 체크)
{
  const el = document.getElementById("foo");
  if (typeof el === "object") {
    el; // 타입이 HTMLElement로 좁혀질 것 같지만 실제로는 HTMLElement | null로 좁혀짐
  }
}

// 잘못된 타입 좁히기 (typeof로 undefined 체크)
{
  function foo(x?: number | string | null) {
    if (!x) {
      // 타입이 number | string로 좁혀질 것 같지만
      // 실제로는 number | string | undefined로 좁혀짐
      x;
    }
  }
}

/**
 * 타입을 좁히는 또 다른 일반적인 방법
 */

// 명시적 태그 붙이기
// 태그된 유니온, 구별된 유니온이라고도 부름
{
  interface UploadEvent {
    type: "upload";
    filename: string;
    contents: string;
  }
  interface DownloadEvent {
    type: "download";
    filename: string;
  }
  type AppEvent = UploadEvent | DownloadEvent;

  function handleEvent(e: AppEvent) {
    switch (e.type) {
      case "download":
        e; // 타입이 DownloadEvent로 좁혀짐
        break;
      case "upload":
        e; // 타입이 UploadEvent로 좁혀짐
        break;
    }
  }
}

// 타입 가드로 타입 좁히기
{
  // 1. HTMLElement
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return "value" in el;
  }
  function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
      el; // 타입이 HTMLInputElement로 좁혀짐
      return el.value;
    }
    el; // 타입이 HTMLElement로 좁혀짐
    return el.textContent;
  }

  // 2. 배열에서 어떤 탐색

  // undefined가 안 걸러짐
  const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Michael"];
  const members = ["Janet", "Mike", "Alice", "Michael"]
    .map((who) => jackson5.find((n) => n === who))
    .filter((who) => who != undefined);

  // 타입가드로 undefined 걸러내기
  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }
  const members2 = ["Janet", "Mike", "Alice", "Michael"]
    .map((who) => jackson5.find((n) => n === who))
    .filter(isDefined);
}
