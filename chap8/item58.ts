/**
 * CommonJS 모듈 시스템
 */
// {
//   // a.js
//   const b = require("./b");
//   console.log(b.name);

//   // b.js
//   const name = "Module B";
//   module.exports = { name };
// }

/**
 * ECMAScript module
 */
// {
//   // a.js
//   import * as b from "./b";
//   console.log(b.name);

//   // b.js
//   export const name = "Module B";
// }

/**
 * 프로토타입
 */
{
  function Person(first: string, last: string) {
    this.first = first;
    this.last = last;
  }

  Person.prototype.getName = function () {
    return this.first + " " + this.last;
  };

  const marie = new Person("Marie", "Curie");
  const personName = marie.getName();
}

/**
 * 클래스
 */
{
  class Person {
    first: string;
    last: string;

    constructor(first: string, last: string) {
      this.first = first;
      this.last = last;
    }

    getName() {
      return this.first + " " + this.last;
    }
  }

  const marie = new Person("Marie", "Curie");
  const personName = marie.getName();
}

/**
 * 함수 표현식보다 화살표 함수 사용하기
 */
{
  class Foo {
    method() {
      console.log(this);
      [1, 2].forEach(function (this: Foo) {
        console.log(this);
      });
    }

    method2() {
      console.log(this);
      [1, 2].forEach((i) => {
        console.log(this);
      });
    }
  }

  const f = new Foo();

  // strict 모드에서 Foo, undefined, undefined 출력
  // non-strict 모드에서 Foo, window, window 출력
  f.method();
  f.method2();
}

/**
 * 연관 배열에 객체 대신 Map과 Set 사용하기
 */

// 객체
{
  function countWords(text: string) {
    const counts: { [word: string]: number } = {};

    console.log(text.split(/[\s,.]+/));
    // console.dir({}["constructor"]);
    // console.log(1 + counts["constructor"]);

    for (const word of text.split(/[\s,.]+/)) {
      counts[word] = 1 + (counts[word] || 0);
    }

    return counts;
  }

  console.log(countWords("Objects have a constructor"));
}

// Map
{
  function countWordsMap(text: string) {
    const counts = new Map<string, number>();
    for (const word of text.split(/[\s,.]+/)) {
      counts.set(word, 1 + (counts.get(word) || 0));
    }
    return counts;
  }

  console.log(countWordsMap("Objects have a constructor"));
}
