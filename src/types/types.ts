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

// needs renaming - make general use
export type RecentGame = {
  date: Date;
  games: GameInfo[];
};

// needs renaming - make general use

export type CleanRecentGame = {
  gameID: number;
  awayTeamName: string;
  homeTeamName: string;
  awayTeamScore?: number; 
  homeTeamScore?: number ;
  gameVenue: string;
};

// needs renaming - make general use
export type CleanRecentGameData = {
  date: Date;
  gameInfo: CleanRecentGame[];
};

// END OF RECENT GAME TYPES

// ------------------------------
// ------------------------------
// ------------------------------

// START OF SCHEDULE TYPES
export type ScheduleData = {
  date: Date;
  scheduleInfo: 
}



// START OF GENERAL USE TYPES

// NOTE: change type for common use? 
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

export type FullSchedule = {};
