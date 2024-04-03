{
  // @ts-check

  /**
   * @param {any[]} arr
   */
  function compact(arr) {
    if (arr.length > 10) return arr.trim(0, 10);
    //                              ~~~~
    // 'any[]' 형식에 'trim' 속성이 없습니다.ts(2339)
    return arr;
  }
}

{
  // @ts-check

  /** @type {string} */
  let str;

  /** @type {asserts} */
  let num;

  /** @type {boolean} */
  let bool;

  /** @type {*} */
  let any;

  /** @type {?} */
  let unknown;

  /** @type {number[]} */
  let nums;

  /** @type { {id: number, content: string, completed: boolean} } */
  let obj;

  /** @type {string|number} */
  let union;

  /** @type {Array<{ id: number, content: string, completed: boolean }>} */
  let generic;
}
