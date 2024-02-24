{
  const url1 = "https://example.com/page1";
  const url2 = "https://example.com/page2";
  const url3 = "https://example.com/page3";

  function fetchURL(url: string, cb: (response: string) => void) {
    return fetch(url)
      .then((response) => response.text())
      .then(cb);
  }

  {
    // await 키워드는 각각의 프로미스가 처리(resolve)될 때까지 fetchPages 함수의 실행을 멈춤.
    async function fetchPages() {
      try {
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
        // ...
      } catch (e) {
        // ...
      }
    }

    // 병렬로 페이지를 로드하고 싶으면,,
    async function fetchPages2() {
      const [response1, response2, response3] = await Promise.all([
        fetch(url1),
        fetch(url2),
        fetch(url3),
      ]);
    }

    // 콜백 함수로 동일한 코드를 작성하려면,,
    function fetchPagesCB() {
      let numDone = 0;
      const responses: string[] = [];
      const done = () => {
        const [response1, response2, response3] = responses;

        // ...
        console.log(response1, response2, response3);
      };
      const urls = [url1, url2, url3];
      urls.forEach((url, i) => {
        fetchURL(url, (r) => {
          responses[i] = r;
          numDone++;
          if (numDone === urls.length) done();
        });
      });
    }

    // Promise.race를 사용하여 프로미스에 타임아웃을 추가하는 방법
    // 공집합과의 유니온은 아무런 효과가 없다?
    function timeout(millis: number): Promise<never> {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject("timeout"), millis);
      });
    }

    async function fetchWithTimeout(url: string, ms: number) {
      return Promise.race([fetch(url), timeout(ms)]);
    }

    // 프로미스를 생성하기보다는,
    // async/await를 사용하자.

    // function getNumber1(): Promise<number>
    async function getNumber2() {
      return 42;
    }
    const getNumber3 = async () => 42;
    const getNumber4 = () => Promise.resolve(42);
  }

  // fetchURL 호출 시, 캐시가 있으면 캐시 리턴 (동기 or 비동기를 반환)
  {
    const _cache: { [url: string]: string } = {};
    function fetchWithCache(url: string, callback: (text: string) => void) {
      if (url in _cache) {
        callback(_cache[url]);
      } else {
        fetchURL(url, (text) => {
          _cache[url] = text;
          callback(text);
        });
      }
    }

    let requestStatus: "loading" | "success" | "error";
    function getUser(userId: string) {
      fetchWithCache(`/user/${userId})`, (profile) => {
        requestStatus = "success";
      });
      requestStatus = "loading";
    }
  }

  // async를 두 함수에 모두 사용하면, 일관적인 동작을 강제 (프로미스를 반환)
  {
    const _cache: { [url: string]: string } = {};
    async function fetchWithCache(url: string) {
      if (url in _cache) {
        return _cache[url];
      }

      const response = await fetch(url);
      const text = await response.text();
      _cache[url] = text;
      return text;
    }

    let requestStatus: "loading" | "success" | "error";

    async function getUser(userId: string) {
      requestStatus = "loading";
      const profile = await fetchWithCache(`/user/${userId}`);
      requestStatus = "success";
    }
  }

  // async 함수에서 프로미스를 반환하면 또 다른 프로미스로 래핑되지 않음.
  // function getJSON(url: string): Promise<any>
  async function getJSON(url: string) {
    const response = await fetch(url);
    const jsonPromise = response.json();
    return jsonPromise;
  }
}
