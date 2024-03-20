/**
 * type-coverage 패키지 사용해보기
 *
 * 1. npx type-coverage
 *
 * 2. npx type-coverage --detail
 */

/**
 * any가 나타나는 문제
 *
 * 1. any를 명시적으로 사용했기 때문
 */
{
  function getColumnInfo(name: string): any {
    return utils.buildColumnInfo(appState.dataSchema, name); // any 반환
  }
}

/**
 * any가 나타나는 문제
 *
 * 2. 써드파티에서 any 타입을 부여
 */
declare module "my-module";

import { someMethod, someSymbol } from "my-module";

const pt1 = {
  x: 1,
  y: 2,
};

const pt2 = someMethod(pt1, someSymbol); // any 반환
