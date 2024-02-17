// 산점도 (Scatter Plot)
{
  interface ScatterProps {
    // 데이터
    xs: number[];
    ys: number[];

    // 디스플레이
    xRange: [number, number];
    yRange: [number, number];
    color: string;

    // 이벤트
    onClick: (x: number, y: number, index: number) => void;
  }

  // 최적화 : 첫 번째 방법
  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      if (oldProps[k] !== newProps[k]) {
        if (k !== "onClick") return true;
      }
    }
  }

  // 최적화 : 두 번째 방법
  function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
    return (
      oldProps.xs !== newProps.xs ||
      oldProps.ys !== newProps.ys ||
      oldProps.xRange !== newProps.xRange ||
      oldProps.yRange !== newProps.yRange ||
      oldProps.color !== newProps.color
      // (onClick은 체크 안함)
    );
  }

  // 타입 체커가 동작하도록 개선한 코드 : 매핑된 타입과 객체 사용
  const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
    // new
    // onDoubleClick: false,
  };

  const PROPS_REQUIRING_UPDATE: (keyof ScatterProps)[] = [
    "xs",
    "ys",
    "xRange",
    "yRange",
    "color",
  ];

  // REQUIRES_UPDATE를 사용한 최적화
  function shouldUpdate3(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      // for .. in 문을 쓰는 것이 좋을까?
      if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
        return true;
      }
    }
    return false;
  }

  // REQUIRES_UPDATE를 사용한 최적화2
  function shouldUpdate3second(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;

    for (const [prop, value] of Object.entries(REQUIRES_UPDATE) as [
      keyof ScatterProps,
      boolean
    ][]) {
      if (oldProps[prop] !== newProps[prop] && value) {
        return true;
      }
    }
    return false;
  }

  // PROPS_REQUIRING_UPDATE를 사용한 최적화
  function shouldUpdate4(oldProps: ScatterProps, newProps: ScatterProps) {
    for (const k of PROPS_REQUIRING_UPDATE) {
      if (oldProps[k] !== newProps[k]) {
        return true;
      }
    }
    return false;
  }
}
