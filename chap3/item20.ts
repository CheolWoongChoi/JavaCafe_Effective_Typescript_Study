// id 예제
{
  // 변수의 값은 바뀔 수 있지만, 타입은 보통 바뀌지 않는다.
  const fetchProduct = (id: string) => {};
  const fetchProductBySerialNumber = (id: number) => {};

  let id = "12-34-56";
  id = 123456;

  fetchProduct(id);
  fetchProductBySerialNumber(id);

  // id 타입을 유니온 타입으로 확장
  let id2: string | number = "12-34-56";
  fetchProduct(id);

  id2 = 123456;
  fetchProductBySerialNumber(id2);

  // 차라리 별도의 변수로 사용하자
  const productId: string = "12-34-56";
  fetchProduct(productId);

  const serialNumber: number = 123456;
  fetchProductBySerialNumber(serialNumber);

  // 가려지는 변수 예제
  const id3 = "12-34-56";
  fetchProduct(id3);

  {
    const id3 = 123456;
    fetchProductBySerialNumber(id3);
  }
}
