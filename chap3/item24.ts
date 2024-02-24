/**
 * @item 24
 * @title 일관성 있는 별칭 사용하기
 */

// loc는 별칭 ?
{
  const borough = { name: "Brooklyn", location: [40.688, -73.979] };
  const loc = borough.location;

  loc[0] = 0; // [0, -73.979]
}

// 다각형을 표현하는 자료구조
{
  interface Coordinate {
    x: number;
    y: number;
  }

  interface BoundingBox {
    x: [number, number];
    y: [number, number];
  }

  interface Polygon {
    exteriro: Coordinate[];
    holes: Coordinate[][];
    bbox?: BoundingBox;
  }

  function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
    if (polygon.bbox) {
      if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1]) {
        return false;
      }
    }
    // ...
  }

  // 중복 코드를 줄이기 위해 polygon.bbox를 임시 변수로 뽑아냄
  function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox;

    if (polygon.bbox) {
      if (pt.x < box.x[0] || pt.x > box.y[1]) {
        return false;
      }
    }
    // ...
  }

  // 제어 흐름 체크, box와 polygon.bbox의 타입이 다름
  function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
    polygon.bbox; // BoundingBox | undefined
    const box = polygon.bbox; // BoundingBox | undefined
    box; // BoundingBox | undefined

    if (polygon.bbox) {
      polygon.bbox; // BoundingBox
      box; // BoundingBox | undefined
    }
    // ...
  }

  // 문제 해결 1 - box를 이용하도록 코드 수정, 타입 에러 해결
  function isPointInPolygon4(polygon: Polygon, pt: Coordinate) {
    const box = polygon.bbox; // BoundingBox | undefined

    if (box) {
      if (
        pt.x < box.x[0] ||
        pt.x > box.x[1] ||
        pt.y < box.y[0] ||
        pt.y > box.y[1]
      ) {
        return false;
      }
    }
  }

  // 문제 해결 2 - 객체 비구조화 할당을 통해, 보다 간결하게 bbox를 사용
  function isPointInPolygon5(polygon: Polygon, pt: Coordinate) {
    const { bbox } = polygon;

    if (bbox) {
      const { x, y } = bbox;

      if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
        return false;
      }
    }
  }

  // 비구조화 할당 시, 주의할 점
  // -> bbox와 객체의 bbox의 값이 달라질 수 있다.
  function isPointInPolygon6(polygon: Polygon, pt: Coordinate) {
    const { bbox } = polygon;

    if (!bbox) {
      calculateBoundingBox(polygon); // polygon.bbox가 채워집니다.
      // -> bbox는 여전히 undefined, polygon.bbox는 값이 있음
    }
  }

  // 타입스크립트의 제어 흐름 분석, 객체 속성은 주의!
  function isPointInPolygon7(polygon: Polygon, pt: Coordinate) {
    function fn(p: Polygon) {
      /* something... */
    }

    polygon.bbox;
    if (polygon.bbox) {
      polygon.bbox; // BoundingBox
      fn(polygon); // 실제로는 polygon.bbox가 undefined로 바뀔 수 있음
      polygon.bbox; // BoundingBox
    }
  }
}
