/**
 * @types
 */

export type Game = {
  keyID: string;
  date: string;
  startTime: string;
  gameID: number;
  awayTeamLogo: string;
  awayTeamName: string;
  homeTeamLogo: string;
  homeTeamName: string;
  awayTeamScore?: number;
  homeTeamScore?: number;
  gameVenue: string;
};

export type Season = {
  seasonStartDate: string;
  seasonEndDate: string;
};