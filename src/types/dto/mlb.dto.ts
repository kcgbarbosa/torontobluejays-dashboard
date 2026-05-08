/**
 * @types
 *
 */

type TeamInfoDTO = {
  id: number;
  name: string;
  link: string;
};

type TeamScoreDTO = {
  score: number;
  team: TeamInfoDTO;
};

export type GameInfoDTO = {
  gamePk: number;
  calendarEventID: string;
  venue: { name: string };
  teams: {
    away: TeamScoreDTO;
    home: TeamScoreDTO;
  };
};

export type GameDTO = {
  date: Date;
  games: GameInfoDTO[];
};

export type GameResponseDTO = {
  dates: GameDTO[];
};

export type SeasonDTO = {
  seasonStartDate: string;
  seasonEndDate: string;
};

export type SeasonResponseDTO = {
  seasons: SeasonDTO[];
};

// LEAGUE RECORD TYPES (bottom to top for nested property access )
type RecordsResponseDTO = {
  records: TeamRecordsDTO[];
};

type TeamRecordsDTO = {
  teamRecords: TeamRecordsInfoDTO[];
};

type TeamRecordsInfoDTO = {
  divisionRank: number;
  gamesPlayed: number;
  divisionGamesBack: number;
  wins: number;
  losses: number;
  runDifferential: number;
  winningPercentage: string;
  hasWildCard: boolean;
  clinched: false;
  streak: StreakDTO;
};

type StreakDTO = {
  streakCode: string;
  streakType: string;
  streakNumber: number;
};
