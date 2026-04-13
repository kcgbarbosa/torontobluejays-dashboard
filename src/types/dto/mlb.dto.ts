/**
 * @types
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
