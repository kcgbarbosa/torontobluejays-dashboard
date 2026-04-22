/**
 * @types
 *
 * #TODO : add calendarEventID dto for access to first pitch times, will be used in recent game and schedule data display and will require updates for all
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
