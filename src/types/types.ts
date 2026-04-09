/**
 * @types
 *
 */

export type TeamInfo = {
  id: number;
  name: string;
  link: string;
};

export type TeamScore = {
  score: number;
  team: TeamInfo;
};

export type GameInfo = {
  gamePk: number;
  venue: { name: string };
  teams: {
    away: TeamScore;
    home: TeamScore;
  };
};

export type RecentGame = {
  date: Date;
  games: GameInfo[];
};

export type CleanRecentGame = {
  gameID: number;
  awayTeamName: string;
  homeTeamName: string;
  awayTeamScore: number;
  homeTeamScore: number;
  gameVenue: string;
};

export type CleanRecentGameData = {
  date: Date;
  gameInfo: CleanRecentGame[];
};

export type APIResponse = {
  dates: RecentGame[];
};

/**
 *
 *
 *
 */

export type MLBScheduleDates = {
  regularSeasonStartDate: string;
  regularSeasonEndDate: string;
};

export type FullSchedule = {
  
};
