/**
 * @types
 */

export type Game = {
  date: Date;
  gameID: number;
  awayTeamName: string;
  homeTeamName: string;
  awayTeamScore?: number;
  homeTeamScore?: number;
  gameVenue: string;
};

export type Season = {
  seasonStartDate: string;
  seasonEndDate: string;
};
