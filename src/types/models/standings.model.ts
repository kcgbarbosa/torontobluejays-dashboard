/**
 * @types
 */

// #TODO [May 8] Update ALRecords DTO and Model to include an ID for keys
  export type ALRecords = {
  divisionId: number;
  teamName: string;
  divisionRank: number;
  gamesPlayed: number;
  gamesBack: number;
  wins: number;
  losses: number;
  runDiff: number;
  winPercentage: string;
  hasWildCard: boolean;
  hasClinched: false;
  streakAbbr: string;
  streakType: string;
  streakLength: number;
};
