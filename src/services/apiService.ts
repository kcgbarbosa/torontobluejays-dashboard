import type {
  GameResponseDTO,
  SeasonResponseDTO,
  RecordsResponseDTO,
  RosterResponseDTO,
} from '../types/dto/mlb.dto';
import type { Game, Season } from '../types/models/game.model';
import { getHeroGameDateUtil } from '../utils/dateAndTimeUtilities';

import {
  alTeamRecordsDataModelMapper,
  gameModelMapper,
  rosterDataModelMapper,
  scheduleDataModelMapper,
  seasonDataModelMapper,
} from '../utils/dtoToModelMappers';

const BASE_URL = import.meta.env.VITE_MLB_BASE_URL;
const SEASON_DATA_URL = `${BASE_URL}/seasons?sportId=1`;
const AL_STANDINGS_URL = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2026&standingsTypes=regularSeason`;

export async function fetchSeasonData() {
  const response = await fetch(SEASON_DATA_URL);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as SeasonResponseDTO;
  const formattedResult = seasonDataModelMapper(result);
  return formattedResult;
}

export async function fetchSchedule(seasonData: Season[]) {
  const data = seasonData[0];
  if (data === undefined) {
    console.log(`Error: seasonData is undefined`);
  }
  const FULL_TEAM_SCHEDULE = `${BASE_URL}/schedule?sportId=1&teamId=141&startDate=${data?.springStartDate}&endDate=${data?.postSeasonEndDate}`;
  const response = await fetch(FULL_TEAM_SCHEDULE);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = scheduleDataModelMapper(result);
  return formattedResult;
}

async function fetchGameData(url: string): Promise<Game | null> {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`response status: ${response.status}`);
    return null;
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = gameModelMapper(result);
  return formattedResult[0];
}

export async function fetchHeroGameData(
  scheduleData: Game[]
): Promise<Game | null> {
  if (scheduleData === undefined) {
    console.log(`Error: scheduleData is undefined`);
    return null;
  }
  const heroGame = getHeroGameDateUtil(scheduleData);
  if (heroGame?.gamePk === undefined) {
    console.log(`Error: no gamePk found`);
    return null;
  }
  const PRE_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=probablePitcher`;
  const LIVE_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=linescore`;
  const POST_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=decisions`;
  switch (heroGame?.abstractGameState) {
    case 'Preview': {
      let gamePreviewData = await fetchGameData(PRE_GAME_DATA);
      return gamePreviewData;
    }
    case 'Live': {
      const gameLiveData = await fetchGameData(LIVE_GAME_DATA);
      return gameLiveData;
    }
    case 'Final': {
      const gameFinalResultData = await fetchGameData(POST_GAME_DATA);
      return gameFinalResultData;
    }
    default: {
      console.warn(
        `Unexpected abstractGameState: ${heroGame?.abstractGameState}`
      );
      return null;
    }
  }
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
  const response = await fetch(
    `${BASE_URL}/teams/141/roster?rosterType=40Man&season=2026&hydrate=person(stats(group=[hitting,pitching],type=[season,seasonAdvanced],season=${new Date().getFullYear()})%3A%29`
  );

  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }

  const result = (await response.json()) as RosterResponseDTO;
  const formattedResult = rosterDataModelMapper(result);
  return formattedResult;
}
