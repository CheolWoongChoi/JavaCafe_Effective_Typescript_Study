{
  // 웹 어플리케이션 설계, 페이지를 선택하면 페이지의 내용을 로드하고 화면에 표시
  {
    interface State {
      pageText: string;
      isLoading: boolean;
      error?: string;
    }

    function renderPage(state: State) {
      if (state.error) {
        return `Error! Unable to load ${"currentPage"}: ${state.error}`;
      } else if (state.isLoading) {
        return `Loading ${"currentPage"}...`;
      }

      return `<h1>currentPage</h1>\n${state.pageText}`;
    }

    async function changePage(state: State, newPage: string) {
      state.isLoading = true;

      try {
        const response = await fetch(`getUrlForPage(${newPage})`);
        if (!response.ok) {
          throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }

        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;
      } catch (e) {
        state.error = "" + e;
      }
    }
  }

  // 상태를 명확하게 구분해서 개선
  {
    interface RequestPending {
      state: "pending";
    }
    interface RequestError {
      state: "error";
      error: string;
    }
    interface RequestSuccess {
      state: "ok";
      pageText: string;
    }
    type RequestState = RequestPending | RequestError | RequestSuccess;

    interface State {
      currentPage: string;
      requests: { [page: string]: RequestState };
    }

    function renderPage(state: State) {
      const { currentPage } = state;
      const requestState = state.requests[currentPage];

      switch (requestState.state) {
        case "pending":
          return `Loading ${currentPage}...`;
        case "error":
          return `Error! Unable to load ${currentPage}: ${requestState.error}`;
        case "ok":
          return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
      }
    }

    async function changePage(state: State, newPage: string) {
      state.requests[newPage] = { state: "pending" };
      state.currentPage = newPage;

      try {
        const response = await fetch(`getUrlForPage(${newPage})`);
        if (!response.ok) {
          throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }

        const pageText = await response.text();
        state.requests[newPage] = { state: "ok", pageText };
      } catch (e) {
        state.requests[newPage] = { state: "error", error: "" + e };
      }
    }
  }

  // 비행기 에어버스 330의 이중 입력모드상태
  {
    // 스틱 정보
    interface CockpitControls {
      /* 0 = 중립, + = 앞으로 */
      leftSidestick: number;
      /* 0 = 중립, + = 앞으로 */
      rightSidestick: number;
    }

    // 현재 스틱의 설정을 계산
    function getStickSetting(controls: CockpitControls) {
      const { leftSidestick, rightSidestick } = controls;

      if (leftSidestick === 0) {
        return rightSidestick;
      }
      return leftSidestick;
    }
  }
}
