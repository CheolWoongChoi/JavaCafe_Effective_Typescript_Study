/**
 * 자바스크립트 클래스에서
 * 비공개 private를 사용하는 경우
 */
{
  class Foo {
    _private = "secret123";
  }

  const f = new Foo();
  f._private; // 'secret123'
}

/**
 * 타입스크립트에서
 * 접근 제어자를 사용하는 경우
 */
{
  class Diary {
    private secret = "cheated on my English test";
  }

  const diary = new Diary();
  diary.secret;
}

/**
 * 클로저 (Closure)를 사용하여 비공개 기능 구현
 */
declare function hash(text: string): number;

{
  class PasswordChecker {
    checkPassword: (password: string) => boolean;

    constructor(passwordHash: number) {
      // this.checkPassword = (password: string) => {
      //   return hash(password) === passwordHash;
      // };
    }
  }

  const checker = new PasswordChecker(hash("s3cret"));
  checker.checkPassword("s3cret");
}

/**
 * 비공개 필드 기능 사용하기
 */
{
  class PasswordChecker {
    #passwordHash: number;

    constructor(passwordHash: number) {
      this.#passwordHash = passwordHash;
    }

    checkPassword(password: string) {
      return hash(password) === this.#passwordHash;
    }
  }

  const checker = new PasswordChecker(hash("s3cret"));
  checker.checkPassword("secret"); // false
  checker.checkPassword("s3cret"); // true
}
