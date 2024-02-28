import _ from "lodash";

/**
 * CSV 예제
 */
{
  const csvData = "이름,나이,성별\nTom,25,남\nJane,27,여\nSteve,31,남";
  const rawRows = csvData.split("\n"); // ['.., .., ..', '...', '...']
  const headers = rawRows[0].split(","); // ['.., .., ..']

  // 절차형 프로그래밍
  {
    const rows = rawRows.slice(1).map((rowStr) => {
      const row = {};
      rowStr.split(",").forEach((val, i) => {
        row[headers[i]] = val; // {[column: string]: string} 또는 Record<string, string>을 제공해야 한다.
      });
      return row;
    });
  }

  // 함수형 프로그래밍
  // 콜백 함수 로직 ?? (row, val, i) => ((row[headers[i]] = val), row)
  {
    const rows = rawRows.slice(1).map(
      (rowStr) =>
        rowStr
          .split(",")
          .reduce((row, val, i) => ((row[headers[i]] = val), row), {}) // {[column: string]: string} 또는 Record<string, string>을 제공해야 한다.
    );

    console.log(rows);
  }

  // lodash
  // Dictionary<string>은 Record<string, string>과 동일
  {
    const rows = rawRows
      .slice(1)
      .map((rowStr) => _.zipObject(headers, rowStr.split(",")));
    // console.log(rows);
  }
}

/**
 * NBA 예제, 단순(flat) 목록 만들기
 */
interface BasketballPlayer {
  name: string;
  team: string;
  salary: number;
}
declare const roasters: { [team: string]: BasketballPlayer[] };

// 에러
{
  let allPlayers = [];
  for (const players of Object.values(roasters)) {
    allPlayers = allPlayers.concat(players);
  }
}

// 타입구문 추가
{
  let allPlayers: BasketballPlayer[] = [];
  for (const players of Object.values(roasters)) {
    allPlayers = allPlayers.concat(players);
  }
}

// flat
{
  const allPlayers = Object.values(roasters).flat();
}

/**
 * 각 팀별, 연봉 순으로 정렬
 */

{
  const allPlayers = Object.values(roasters).flat();

  // ...

  // 직접 구현
  {
    const teamToPlayers: { [team: string]: BasketballPlayer[] } = {};
    for (const player of allPlayers) {
      const { team } = player;
      teamToPlayers[team] = teamToPlayers[team] || [];
      teamToPlayers[team].push(player);
    }

    for (const players of Object.values(teamToPlayers)) {
      players.sort((a, b) => a.salary - b.salary);
    }

    const bestPaid = Object.values(teamToPlayers).map((players) => players[0]);
    bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);

    console.log(bestPaid);
    /**
     * [
     *   { team: 'Lakers', name: 'LeBron James', salary: 37436858 },
     *   { team: 'Warriors', name: 'Stephen Curry', salary: 37436858 },
     *   { team: 'Bucks', name: 'Giannis Antetokounmpo', salary: 37436858 }
     * ]
     */
  }

  // lodash로 구현
  {
    const bestPaid = _(allPlayers)
      .groupBy((player) => player.team)
      .mapValues((players) => _.maxBy(players, (p) => p.salary)!)
      .values()
      .sortBy((p) => -p.salary)
      .value();
  }

  // _.map은 콜백 대신 속성의 이름을 전달할 수 있다.
  {
    const namesA = allPlayers.map((player) => player.name);
    const namesB = _.map(allPlayers, (player) => player.name);
    const namesC = _.map(allPlayers, "name");
  }

  {
    const salaries = _.map(allPlayers, "salary");
    const teams = _.map(allPlayers, "team");
    const mix = _.map(allPlayers, Math.random() < 0.5 ? "name" : "salary");
  }
}
