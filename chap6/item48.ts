{
  /**
   * 인라인 주석은 편집기가 표시해주지 않는다.
   */

  // 인사말을 생성합니다. 결과는 보기 좋게 꾸며집니다.
  function greet(name: string, title: string) {
    return `Hello, ${title} ${name}!`;
  }

  /**
   * JSDoc 스타일
   * JSDoc에는 @param과 @returns 같은 일반적 규칙 사용가능
   *
   * TS 관점에서는 TSDoc이라고도 부름
   */

  /**
   * 인사말을 생성합니다.
   * @param name 이름
   * @param title 칭호
   * @returns 인사말
   */
  function greetFullTSDoc(name: string, title: string) {
    return `Hello, ${title} ${name}!`;
  }

  greetFullTSDoc("이름", "칭호");

  /**
   * 타입 정의에 TSDoc을 사용
   */

  /** 특정 시간과 장소에서 수행된 측정 */
  interface Measurement {
    /** 시간 */
    time: Date;
    /** 위치 */
    place: string;
  }

  /**
   * TSDoc 주석은 마크다운 형식으로 꾸며짐
   * 굵은 글씨, 기울임 글씨, 글머리기호 목록 사용 가능
   */

  /**
   * 이 _interface는 **세 가지** 속성을 가집니다.
   * 1. x
   * 2. y
   * 3. z
   */
  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }
}
