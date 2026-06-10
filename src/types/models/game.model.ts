import type { Decisions, Linescore, ProbablePitchers } from './linescore.model';

export type Game = {
  keyID: string;
  date: string;
  startTime: string;
  gamePk: number;
  abstractGameState: string; // Preview, Live, Final
  detailedState: string;
  statusCode: string;
  awayTeamLogo: string;
  awayTeamName: string;
  homeTeamLogo: string;
  homeTeamName: string;
  awayTeamScore?: number;
  homeTeamScore?: number;
  gameVenue: string;
  linescore?: Linescore;
  decisions?: Decisions;
  probablePitchers?: ProbablePitchers;
};

export type Season = {
  seasonId: string;
  springStartDate: string;
  springEndDate: string;
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
  endOfFirstHalf: string;
  allStarBreakStartDate: string;
  startOfSecondHalf: string;
  postSeasonStartDate: string;
  postSeasonEndDate: string;
};
