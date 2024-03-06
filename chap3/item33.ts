{
  /**
   * 음악 컬렉션 예제
   * 앨범의 타입을 정의
   */
  {
    /**
     * string 타입을 남발해서 사용했다.
     * 몇 개 필드는 구체적인 값이 필요하다.
     * 주석으로 표시했는데, 주석과 타입은 항상 일치하지 않는다.
     */
    interface Album {
      artist: string;
      title: string;
      releaseDate: string; // YYYY-MM-DD
      recordingType: string; // "studio" | "live"
    }

    /**
     * @desc 잘못된 예시
     * releaseDate와 recordingType은 실제값과 다르다.
     */
    const kindOfBlue: Album = {
      artist: "Miles Davis",
      title: "Kind of Blue",
      releaseDate: "August 17th 1959", // 실제값과 다름
      recordingType: "Studio", // 실제값과 다름
    };

    /**
     * @desc 잘못된 예시
     * 파라미터 순서가 잘못되었지만, 오류없이 정상처리됨
     */
    function recordRelease(title: string, date: string) {}
    recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);
  }

  /**
   * @title Album 타입을 개선한 예시
   * @desc releaseDate와 recordingType을 구체적인 타입으로 변경
   */
  {
    // string 타입에서 더 구체적인 타입으로 변경
    /** 이 녹음은 어떤 환경에서 이루어졌는지를 알려준다 */
    type RecordingType = "studio" | "live";

    interface Album {
      artist: string;
      title: string;
      releaseDate: Date;
      recordingType: RecordingType;
    }

    const kindOfBlue: Album = {
      artist: "Miles Davis",
      title: "Kind of Blue",
      releaseDate: new Date("August 17, 1959"),
      recordingType: "Studio", // 에러
    };

    /**
     * @title 장점1
     * @desc 반환 타입 내부에 필드가 string보다 구체적인 타입으로 정의됨
     */
    {
      function getAlbumsOfType(recordingType: string): Album[] {}
    }

    /**
     * @title 장점2
     * @desc 타입의 의미를 설명하는 주석을 붙여넣을 수 있다.
     */
    {
      function getAlbumsOfType(recordingType: RecordingType): Album[] {}
    }

    /**
     * @title 장점3
     * @desc keyof 연산자로 세밀하게 객체의 속성을 체크할 수 있다.
     */
    {
      /**
       * @desc 첫 예제
       * any가 있어서 별로다.
       */
      function pluck1(records: any[], key: string): any[] {
        return records.map((r) => r[key]);
      }

      /**
       * @desc 개선1
       */
      function pluck2<T>(records: T[], key: string): any[] {
        return records.map((r) => r[key]);
      }

      const albums: Album[] = [kindOfBlue];

      /**
       * @desc 개선2
       *
       * 반환타입을 더 좁힙 필요가 있음
       */
      function pluck3<T>(records: T[], key: keyof T): T[keyof T][] {
        return records.map((r) => r[key]);
      }
      const releaseDates = pluck3(albums, "releaseDate"); // (string | Date)[] 타입을 반환

      /**
       * @desc 개선3
       */
      function pluck4<T, K extends keyof T>(records: T[], key: K): T[K][] {
        return records.map((r) => r[key]);
      }
      pluck4(albums, "releaseDate"); // Date[] 반환
      pluck4(albums, "artist"); // string[] 반환
      pluck4(albums, "recordingType"); // RecordingType[] 반환
      pluck4(albums, "title"); // string[] 반환
    }
  }
}
