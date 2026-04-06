import React, { useEffect, useState } from 'react';

// TEMPORARY URL
// TODO: implement way to determine most recent game.
// NOTE: May require the GamePK or could be date related
const RECENT_GAME_URL =
  'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId=141&date=04/05/2026'; // TEMPORARY URL

function HomePage() {
  // TODO: requires Generics
  const [recentGameData, setRecentGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  type rawRecentGameAPIData = {
    gamePk: number;
    venue: {
      name: string;
    };
    teams: {
      away: {
        score: number;
        team: {
          name: string;
        };
      };
      home: {
        score: number;
        team: {
          name: string;
        };
      };
    };
  };

  type rawRecentGameDate = {
    date: string;
    games: rawRecentGameAPIData[];
  };

  type cleanRecentGame = {
    gameID: number;
    awayTeamName: string;
    homeTeamName: string;
    awayTeamScore: number;
    homeTeamScore: number;
    gameVenue: string;
  };

  type cleanRecentGameData = {
    date: string;
    gameInfo: cleanRecentGame[];
  };

  const fetchRecentGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(RECENT_GAME_URL);
      if (!response.ok) {
        throw new Error(`response status;: ${response.status}`);
      }
      const result = await response.json();
      const formattedResult = result.dates.map((data: recentGameMapping) => {
        const gameDetails = data.games.map((subData: recentGameInfo) => {
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
      setError(error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

  // todo: fetch other required data

  //TODO: load data on mount
  useEffect(() => {}, []);

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
          {/* TODO: MAP through data to confirm its working */}
          {/* {recentGameData.map((data) => 
          <ul key={data.gameDetails.gameID}></ul>
          )} */}
        </section>
        <aside id="player-stat-leaders" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam
          facere similique a praesentium rem alias velit eveniet quos beatae
          molestias ut nemo consectetur omnis ratione, ipsum eligendi autem
          quis.
        </aside>
      </main>
    </div>
  );
}

export default HomePage;
