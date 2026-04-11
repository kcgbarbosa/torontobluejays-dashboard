/**
 * #component HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics
 * 
 * #TODO UP NEXT: GIT MANAGEMENT
 *
 */

import React, { useEffect, useState } from 'react';
import type {
  APIResponse,
  RecentGame,
  GameInfo,
  CleanRecentGameData,
  MLBScheduleDates,
  FullSchedule,
} from '../types/types';

const BASE_URL = `https://statsapi.mlb.com/api/v1`;
const MLB_SCHEDULE_DATES = `${BASE_URL}seasons?sportId=1`;

// #TODO [N/A] Implement dynamic determination of most recent game (may require GamePK or date logic)
const RECENT_GAME_URL = `${BASE_URL}/schedule/?sportId=1&teamId=141&date=04/07/2026`;

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recentGameData, setRecentGameData] = useState<CleanRecentGameData[]>(
    []
  );
  const [seasonDateData, setSeasonDateData] = useState<MLBScheduleDates[]>([]); // correct Type?
  const [scheduleData, setScheduleData] = useState<FullSchedule[]>([]); // correct Type?

  async function fetchRecentGame() {
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
      return formattedResult;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        throw error;
      }
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSeasonData() {
    try {
      const response = await fetch(MLB_SCHEDULE_DATES);
      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      const result = await response.json();
      const formattedResult = result.map((data: MLBScheduleDates) => {
        return {
          seasonStartDate: data.regularSeasonStartDate,
          seasonEndDate: data.regularSeasonEndDate,
        };
      });
      return formattedResult;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        throw error;
      }
      return []; // REQUIRED because without this, the error path would return undefined which is a big no-no. Need to provide default for every possible path.
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSchedule() {
    try {
      const seasonStartDate = seasonDateData.map(
        (d) => d.regularSeasonStartDate
      );
      const seasonEndDate = seasonDateData.map((d) => d.regularSeasonEndDate);
      const FULL_TEAM_SCHEDULE = `${BASE_URL}/schedule?sportId=1&teamId=141&startDate=${seasonStartDate}5&endDate=${seasonEndDate}`;

      const response = await fetch(FULL_TEAM_SCHEDULE);

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
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
      return formattedResult;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        throw error;
      }
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  // #TODO [APR 10] Define types & confirm fetchAllData is working

  useEffect(() => {
    const fetchAllData = async () => {
      const season = await fetchSeasonData();
      setSeasonDateData(season);
      const recentGame = await fetchRecentGame();
      setRecentGameData(recentGame);
      const schedule = await fetchSchedule();
      setScheduleData(schedule);
    };
    fetchAllData();
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
    </div>
  );
}

export default HomePage;
