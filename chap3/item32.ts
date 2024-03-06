{
  // 벡터를 그리는 프로그램
  // 기하학적 타입을 가지는 계층의 인터페이스를 정의
  {
    /**
     * 공통 인터페이스
     * Layout과 Paint
     */
    interface FillLayout {}
    interface LineLayout {}
    interface PointLayout {}

    interface FillPaint {}
    interface LinePaint {}
    interface PointPaint {}

    /**
     * @desc 예제1
     * Layer
     * 모양과 스타일이 불일치한다는 문제점이 있다.
     */
    {
      interface Layer {
        layout: FillLayout | LineLayout | PointLayout;
        paint: FillPaint | LinePaint | PointPaint;
      }
    }

    /**
     * @desc 예제1 개선
     * 모양과 스타일이 불일치하면 안된다.
     * ex) LineLayout이면서, FillPaint 타입은 허용하면 안됨.
     *
     * 따라서, Layer들을 분리해서 정의한다.
     */
    {
      interface FillLayer {
        layout: FillLayout;
        paint: FillPaint;
      }
      interface LineLayer {
        layout: LineLayout;
        paint: LinePaint;
      }
      interface PointLayer {
        layout: PointLayout;
        paint: PointPaint;
      }
      type Layer = FillLayer | LineLayer | PointLayer;
    }

    /**
     * @desc 예제2
     *
     * type, layout, paint가 불일치할 수 있는 문제점이 있다.
     * 유니온들의 인터페이스 타입
     */
    {
      interface Layer {
        type: "fill" | "line" | "point";
        layout: FillLayout | LineLayout | PointLayout;
        paint: FillPaint | LinePaint | PointPaint;
      }
    }

    /**
     * @desc 예제2 개선
     *
     * Layer가 인터페이스의 유니온을 갖도록 함
     */
    {
      interface FillLayer {
        type: "fill";
        layout: FillLayout;
        paint: FillPaint;
      }
      interface LineLayer {
        type: "line";
        layout: LineLayout;
        paint: LinePaint;
      }
      interface PointLayer {
        type: "point";
        layout: PointLayout;
        paint: PointPaint;
      }
      type Layer = FillLayer | LineLayer | PointLayer;

      /**
       * @desc 예제3
       *
       * type을 이용하여 Layer의 타입을 좁히는 예제
       */
      function drawLayer(layer: Layer) {
        if (layer.type === "fill") {
          const { paint, layout } = layer; // FillPaint, FillLayout
        } else if (layer.type === "line") {
          const { paint, layout } = layer; // LinePaint, LineLayout
        } else {
          const { paint, layout } = layer; // PointPaint, PointLayout
        }
      }

      /**
       * 결론,
       *
       * 태그된 유니온 타입
       * 인터페이스에 type 필드로 타입명을 지정하고, 인터페이스를 유니온으로 묶은 타입
       * 위 예제에서의 Layer 같은 것.
       */
    }
  }

  /**
   * 여러 개의 선택적 필드가 동시에 값이 있거나 동시에 undefined인 경우도
   * 태그된 유니온 타입이 잘 맞는다.
   */
  {
    /**
     *  @desc Person 예제
     */
    {
      interface Person {
        name: string;
        placeOfBirth?: string;
        dateOfBirth?: Date;
      }
    }

    /**
     * @desc Person 개선
     * 관련된 속성을 하나의 객체로 모음
     */
    {
      interface Person {
        name: string;
        birth?: {
          place: string;
          date: Date;
        };
      }

      // 사용 예시
      const alanT: Person = {
        name: "Alan Turing",
        birth: {
          place: "London",
          // date: new Date("1912-06-23"),
        },
      };

      /**
       * 선택적 속성이 하나이므로 (birth),
       * birth의 유무만 체크하면 된다.
       */
      function eulogize(p: Person) {
        console.log(p.name);
        const { birth } = p;

        if (birth) {
          console.log(`was born on ${birth.date} in ${birth.place}`);
        }
      }
    }

    /**
     * 타입의 구조를 손 댈 수 없는 상황,
     * 인터페이스의 유니온을 사용해서 속성 사이의 관계를 모델링할 수 있음
     */
    {
      // API, 타입의 구조를 못 바꿈
      interface Name {
        name: string;
      }

      interface PersonWithBirth extends Name {
        placeOfBirth: string;
        dateOfBirth: Date;
      }

      // 유니온 타입 사용
      type Person = Name | PersonWithBirth;

      function eulogize(p: Person) {
        // PersonWithBirth만 가지고 있는 속성으로 타입 구분
        if ("placeOfBirth" in p) {
          p;
          const { dateOfBirth } = p;
        }
      }
    }
  }
}
