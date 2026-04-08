import React, { useEffect, useState } from 'react';

// TEMPORARY URL
// TODO: implement way to determine most recent game.
// NOTE: May require the GamePK or could be date related
const RECENT_GAME_URL =
  'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId=141&date=04/05/2026'; // TEMPORARY URL

function HomePage() {
  // todo: review
  const [recentGameData, setRecentGameData] = useState<CleanRecentGameData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  type TeamInfo = {
    id: number;
    name: string;
    link: string;
  };

  type TeamStats = {
    score: number;
    team: TeamInfo;
  };

  type GameInfo = {
    gamePk: number;
    venue: { name: string };
    teams: {
      away: TeamStats;
      home: TeamStats;
    };
  };

  type RecentGame = {
    date: Date;
    games: GameInfo[];
  };

  type CleanRecentGame = {
    gameID: number;
    awayTeamName: string;
    homeTeamName: string;
    awayTeamScore: number;
    homeTeamScore: number;
    gameVenue: string;
  };

  type CleanRecentGameData = {
    date: Date;
    gameInfo: CleanRecentGame[];
  };

  type APIResponse = {
    dates: RecentGame[];
  };
  //todo: relocate type defintions to designated file

  useEffect(() => {
    async function fetchRecentGame() {
      setIsLoading(true);
      try {
        const response = await fetch(RECENT_GAME_URL);
        if (!response.ok) {
          throw new Error(`response status;: ${response.status}`);
        }
        const result = (await response.json()) as APIResponse;
        const formattedResult = result.dates.map((data: RecentGame) => {
          const gameDetails = data.games.map((subData: GameInfo) => {
            return {
              gameID: subData.gamePk,
              awayTeamName: subData.teams.away.team.name,
              awayTeamScore: subData.teams.away.score,
              homeTeamName: subData.teams.home.team.name,
              homeTeamScore: subData.teams.home.score,
              gameVenue: subData.venue.name,
            };
          });
          return {
            date: data.date,
            gameInfo: gameDetails,
          };
        });
        setRecentGameData(formattedResult);
      } catch (err) {
        console.log(err);
        // set error
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentGame();
    // todo: fetch other required data
  }, []);

  return (
    <div id="page-container">
      <header>
        <h3> Blue Jays Dashboard</h3>
      </header>
      <nav>
        <span> Home </span>
        <span> Schedule </span>
        <span> Roster </span>
      </nav>
      <main id="home-main" className="flex gap-4">
        <aside id="upcoming-schedule" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          veritatis id ad rem minus, provident quisquam molestias fugit ut aut
          blanditiis, odio reprehenderit, quas in optio dignissimos impedit sint
          quod.
        </aside>
        <section id="recent-game" className="w-1/2 flex-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic incidunt
          veritatis quo! Distinctio fuga saepe totam? Voluptatem consequatur
          minima non rerum commodi molestiae dolor accusamus, quisquam animi
          possimus dolorum optio.
        </section>
        <aside id="player-stat-leaders" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam
          facere similique a praesentium rem alias velit eveniet quos beatae
          molestias ut nemo consectetur omnis ratione, ipsum eligendi autem
          quis.
        </aside>

        <pre>{JSON.stringify(recentGameData, null, 2)}</pre>
      </main>
    </div>
  );
}

export default HomePage;
