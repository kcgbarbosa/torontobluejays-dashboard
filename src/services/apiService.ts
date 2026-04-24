/**
 * @services
 *
 */

import type {
  GameResponseDTO,
  GameDTO,
  GameInfoDTO,
  SeasonDTO,
  SeasonResponseDTO,
} from '../types/dto/mlb.dto';

const BASE_URL = import.meta.env.VITE_MLB_BASE_URL;
const MLB_SCHEDULE_DATES = `${BASE_URL}/seasons?sportId=1`;
const RECENT_GAME_URL = `${BASE_URL}/schedule/?sportId=1&teamId=141&date=04/07/2026`;

export async function fetchRecentGame() {
  const response = await fetch(RECENT_GAME_URL);
  if (!response.ok) {
    throw new Error(`response status;: ${response.status}`);
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = result.dates.flatMap((data: GameDTO) => {
    return data.games.map((subData: GameInfoDTO) => {
      return {
        date: data.date,
        startTime: subData.calendarEventID,
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
}

export async function fetchSeasonData() {
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
}

export async function fetchSchedule(seasonStartAndEndDates: SeasonDTO[]) {
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
        startTime: subData.calendarEventID,
        gameID: subData.gamePk,
        awayTeamName: subData.teams.away.team.name,
        awayTeamScore: subData.teams.away.score,
        homeTeamName: subData.teams.home.team.name,
        homeTeamScore: subData.teams.home.score,
        gameVenue: subData.venue.name,
      };
    });
  });
  const seenGames = new Set();
  const filteredScheduleData = formattedResult.filter((d) => {
    if (seenGames.has(d.gameID)) return false;
    seenGames.add(d.gameID);
    return true;
  });
  return filteredScheduleData;
}
