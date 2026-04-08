  export type TeamInfo = {
    id: number;
    name: string;
    link: string;
  };

  export type TeamStats = {
    score: number;
    team: TeamInfo;
  };

  export type GameInfo = {
    gamePk: number;
    venue: { name: string };
    teams: {
      away: TeamStats;
      home: TeamStats;
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
  