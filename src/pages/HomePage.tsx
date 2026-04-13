/**
 * #component HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics
 *
 *
 * #TODO [N/A] Implement dynamic determination of most recent game (may require GamePK or date logic)
 *
 * #TODO [Apr 12] relocate fetch logic and data mappers to different files
 *
 *
 */

import React, { useEffect, useState } from 'react';
import type {
  GameResponseDTO,
  GameDTO,
  GameInfoDTO,
  SeasonDTO,
  SeasonResponseDTO,
} from '../types/dto/mlb.dto';

import type { Game, Season } from '../types/models/game.model';

const BASE_URL = `https://statsapi.mlb.com/api/v1`;
const MLB_SCHEDULE_DATES = `${BASE_URL}/seasons?sportId=1`;

const RECENT_GAME_URL = `${BASE_URL}/schedule/?sportId=1&teamId=141&date=04/07/2026`;

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recentGameData, setRecentGameData] = useState<Game[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);

  async function fetchRecentGame() {
    try {
      const response = await fetch(RECENT_GAME_URL);
      if (!response.ok) {
        throw new Error(`response status;: ${response.status}`);
      }
      const result = (await response.json()) as GameResponseDTO;
      const formattedResult = result.dates.flatMap((data: GameDTO) => {
        return data.games.map((subData: GameInfoDTO) => {
          return {
            date: data.date,
            gameID: subData.gamePk,
            awayTeamName: subData.teams.away.team.name,
            awayTeamScore: subData.teams.away.score,
            homeTeamName: subData.teams.home.team.name,
            homeTeamScore: subData.teams.home.score,
            gameVenue: subData.venue.name,
          };
        });
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
      const result = (await response.json()) as SeasonResponseDTO;
      const formattedResult = result.seasons.map((data: SeasonDTO) => {
        return {
          seasonStartDate: data.seasonStartDate,
          seasonEndDate: data.seasonEndDate,
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

  async function fetchSchedule(seasonStartAndEndDates: SeasonDTO[]) {
    try {
      const seasonData = seasonStartAndEndDates.find((d) => d.seasonStartDate);
      if (seasonData === undefined) {
        console.log(`Error: seasonData is undefined`);
      }
      const FULL_TEAM_SCHEDULE = `${BASE_URL}/schedule?sportId=1&teamId=141&startDate=${seasonData?.seasonStartDate}&endDate=${seasonData?.seasonEndDate}`;
      const response = await fetch(FULL_TEAM_SCHEDULE);

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      const result = (await response.json()) as GameResponseDTO;
      const formattedResult = result.dates.flatMap((data: GameDTO) => {
        return data.games.map((subData: GameInfoDTO) => {
          return {
            date: data.date,
            gameID: subData.gamePk,
            awayTeamName: subData.teams.away.team.name,
            awayTeamScore: subData.teams.away.score,
            homeTeamName: subData.teams.home.team.name,
            homeTeamScore: subData.teams.home.score,
            gameVenue: subData.venue.name,
          };
        });
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

  useEffect(() => {
    const fetchAllData = async () => {
      const recentGame = await fetchRecentGame();
      setRecentGameData(recentGame);

      const season = await fetchSeasonData();
      setSeasonData(season);

      const schedule = await fetchSchedule(season);
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
            {recentGameData.map((data) => (
              <>
                <span>Date: {`${data.date}`}</span>
                <p>
                  {`Away Team: ${data.awayTeamName} - ${data.awayTeamScore} vs. Home Team: ${data.homeTeamName} - ${data.homeTeamScore}`}
                </p>
                <span>Location: {data.gameVenue}</span>
              </>
            ))}
          </div>
        </section>

        <aside id="player-stat-leaders" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam
          facere similique a praesentium rem alias velit eveniet quos beatae
          molestias ut nemo consectetur omnis ratione, ipsum eligendi autem
          quis.
        </aside>
      </main>
      <div>
        <h3>Testing Schedule Data</h3>
        {scheduleData.map((data) => (
          <ul key={data.gameID}>
            <li>Date: {`${data.date}`} </li>
            <li>Game: {` ${data.homeTeamName} vs. ${data.awayTeamName}`} </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
