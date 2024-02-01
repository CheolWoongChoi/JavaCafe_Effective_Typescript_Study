{
  interface Cylinder {
    radius: number;
    height: number;
  }

  const Cylinder = (radius: number, height: number) => ({ radius, height });

  function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder) {
      shape;
    }
  }
}

{
  class Cylinder {
    radius = 1;
    height = 1;
  }

  function calculateVolume2(shape: unknown) {
    if (shape instanceof Cylinder) {
      shape;
      shape.radius;
    }
  }

  type C1 = Cylinder;
  interface C2 extends Cylinder {}

  type C3 = C1["height"];
  type C4 = C2["radius"];
}

{
  interface Person {
    first: string;
    last: string;
  }
  const p: Person = { first: "Jane", last: "Jacobs" };

  function email(p: Person, subject: string, body: string): string[] {
    return [];
  }

  type T1 = typeof p;
  type T2 = typeof email;

  const v1 = typeof p;
  const v2 = typeof email;
}

{
  interface Person {
    first: string;
    last: string;
  }

  function email2(options: {
    person: Person;
    subject: string;
    body: string;
  }): void {}

  function email3({ person: Person, subject: string, body: string }) {}

  function email4({
    person,
    subject,
    body,
  }: {
    person: Person;
    subject: string;
    body: string;
  }): void {}
}
