{
  const r = "primitive".charAt(3);
  console.log(r); // m
}

{
  function getStringLen(foo: String) {}

  getStringLen("foo");
  getStringLen(new String("foo"));
}

{
  function isGreeting(phrase: string) {}

  isGreeting(new String("foo"));
}

{
  const s: String = "foo";
  const n: Number = 1;
  const b: Boolean = true;
  const sy: Symbol = Symbol("foo");
  const bi: BigInt = BigInt(1);
}
