/**
 * @types
 *
 * #TODO [Apr 24] Add team logo Types to be displayed with recent game and schedule
 *    - will need to update fetch data, add new types, and display new data
 *
 * #TODO [Apr 26] Add team abrv data to be used in the preview game schedule for the HomePage (full team names is too long for the use case)
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
