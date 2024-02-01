{
  interface Person {
    name: string;
  }

  const alice: Person = { name: "Alice" };

  const bob = { name: "Bob" } as Person;

  // 오류 무시
  const bob2 = {} as Person; // 빈 객체
  const bob3 = { name: "bob", age: 10 } as Person; // 속성 추가

  const bob2Person: Person = bob2; // 타입선언 -> OK
  const bob3Person: Person = bob3; // 타입선언 -> OK
}

{
  interface Person {
    name: string;
  }

  const people = ["alice", "bob"].map((name) => ({ name }));

  // 타입 단언
  const peopleAssertion = ["alice", "bob"].map((name) => ({ name } as Person));
  const peopleAssertion2 = ["alice", "bob"].map((name) => ({} as Person)); // 런타임 에러!

  // 타입 선언
  const peopleOk = ["alice", "bob"].map((name) => {
    const person: Person = { name };
    return person;
  });

  const peopleOk2 = ["alice", "bob"].map((name): Person => ({ name }));
}

{
  document.querySelector("#myButton")!.addEventListener("click", (e) => {
    e.currentTarget; // EventTarget
    const button = e.currentTarget; // EventTarget

    const buttonElement = button as HTMLButtonElement; // 타입 단언
    button;
  });
}

{
  const elNull = document.getElementById("foo");
  const el = document.getElementById("foo")!;
}

{
  interface Person {
    name: string;
  }
  const body = document.body;

  const el = body as Person;

  const elOk = body as unknown as Person;

  const elOk2: {} = elOk;
}
