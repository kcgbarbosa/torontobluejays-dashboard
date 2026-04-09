/**
 * @component HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics
 *
 * @todo [Apr 4]Implement dynamic determination of most recent game (may require GamePK or date logic)
 * @todo [Apr 7]Fetch other required data in useEffect
 * will need to include additional team info for graphics and team records
 *
 * @todo [Apr 8] Review state management and error handling implementation
 */

import React, { useEffect, useState } from 'react';
import type {
  APIResponse,
  RecentGame,
  GameInfo,
  CleanRecentGameData,
} from '../types/types';

const BASE_URL = `https://statsapi.mlb.com/api/v1`;
const MLB_SCHEDULE_DATES = `${BASE_URL}seasons?sportId=1`;
const RECENT_GAME_URL = `${BASE_URL}/schedule/?sportId=1&teamId=141&date=04/07/2026`; // TEMP URL

function HomePage() {
  const [recentGameData, setRecentGameData] = useState<CleanRecentGameData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

        {/* temp */}
        <section id="recent-game" className="w-1/2 flex-auto">
          <div id="scoreboard">
            {recentGameData.map((data) =>
              data.gameInfo.map((d) => (
                <>
                  <span>Date: {`${data.date}`}</span>
                  <p>
                    {`Away Team: ${d.awayTeamName} - ${d.awayTeamScore} vs. Home Team: ${d.homeTeamName} - ${d.homeTeamScore}`}
                  </p>
                  <span>Location: {d.gameVenue}</span>
                </>
              ))
            )}
          </div>
        </section>

        <aside id="player-stat-leaders" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam
          facere similique a praesentium rem alias velit eveniet quos beatae
          molestias ut nemo consectetur omnis ratione, ipsum eligendi autem
          quis.
        </aside>
      </main>
      <pre>{JSON.stringify(recentGameData, null, 2)}</pre>
    </div>
  );
}

export default HomePage;
