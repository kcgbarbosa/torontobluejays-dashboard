/**
 * @services
 */

import type {
  GameResponseDTO,
  SeasonDTO,
  SeasonResponseDTO,
  RecordsResponseDTO,
  RosterResponseDTO,
} from '../types/dto/mlb.dto';

import { CURRENT_YEAR } from '../utils/dateAndTimeUtilities';
import {
  alTeamRecordsDataModelMapper,
  recentGameModelMapper,
  rosterDataModelMapper,
  scheduleDataModelMapper,
  seasonDataModelMapper,
} from '../utils/dtoToModelMappers';

const BASE_URL = import.meta.env.VITE_MLB_BASE_URL;
const MLB_SCHEDULE_DATES = `${BASE_URL}/seasons?sportId=1`;
const RECENT_GAME_URL = `${BASE_URL}/schedule/?sportId=1&season=${CURRENT_YEAR}&teamId=141&date=04/07/2026`;
const AL_STANDINGS_URL = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2026&standingsTypes=regularSeason`;
const ROSTER_DATA_URL = `${BASE_URL}/teams/141/roster?rosterType=40Man&season=2026&hydrate=person(stats(group=[hitting,pitching],type=[season,seasonAdvanced],season=${CURRENT_YEAR})%3A%29`;

export async function fetchRecentGame() {
  const response = await fetch(RECENT_GAME_URL);
  if (!response.ok) {
    throw new Error(`response status;: ${response.status}`);
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = recentGameModelMapper(result);
  return formattedResult;
}

export async function fetchSeasonData() {
  const response = await fetch(MLB_SCHEDULE_DATES);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as SeasonResponseDTO;
  const formattedResult = seasonDataModelMapper(result);
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
  const formattedResult = scheduleDataModelMapper(result);
  return formattedResult;
}

export async function fetchALTeamRecords() {
  const response = await fetch(AL_STANDINGS_URL);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as RecordsResponseDTO;
  const formattedResult = alTeamRecordsDataModelMapper(result);
  return formattedResult;
}

export async function fetchRosterData() {
  const response = await fetch(ROSTER_DATA_URL);

  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }

  const result = (await response.json()) as RosterResponseDTO;
  const formattedResult = rosterDataModelMapper(result);
  return formattedResult;
}
