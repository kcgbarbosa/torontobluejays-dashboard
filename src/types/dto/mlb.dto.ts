type TeamInfoDTO = {
  id: number;
  name: string;
  link: string;
};

type LinescorePersonRefDTO = {
  id: number;
  fullName: string;
  link: string;
};

type TeamScoreDTO = {
  score: number;
  team: TeamInfoDTO;
  probablePitcher?: LinescorePersonRefDTO;
};

// #TODO FEAT [June 5] implement usage of status for hero game0
type StatusDTO = {
  abstractGameState: string;
  detailedState: string;
  statusCode: string;
};

type LinescoreInningHalfDTO = {
  runs?: number;
  hits: number;
  errors: number;
  leftOnBase: number;
};

type LinescoreInningDTO = {
  num: number;
  ordinalNum: string;
  home: LinescoreInningHalfDTO;
  away: LinescoreInningHalfDTO;
};

type LinescoreTeamTotalsDTO = {
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
  isWinner: boolean;
};

export type LinescoreDTO = {
  currentInning: number;
  currentInningOrdinal: string;
  inningState: string;
  isTopInning: boolean;
  scheduledInnings: number;
  innings: LinescoreInningDTO[];
  teams: {
    home: LinescoreTeamTotalsDTO;
    away: LinescoreTeamTotalsDTO;
  };
  balls: number;
  strikes: number;
  outs: number;
};

export type DecisionsDTO = {
  winner: LinescorePersonRefDTO;
  loser: LinescorePersonRefDTO;
  save?: LinescorePersonRefDTO;
};

export type GameInfoDTO = {
  gamePk: number;
  gameDate: string;
  officialDate: string;
  venue: { name: string };
  teams: {
    away: TeamScoreDTO;
    home: TeamScoreDTO;
  };
  status: StatusDTO;
  linescore?: LinescoreDTO;
  decisions?: DecisionsDTO;
};

export type GameDTO = {
  games: GameInfoDTO[];
};

export type GameResponseDTO = {
  dates: GameDTO[];
};

export type SeasonDTO = {
  seasonStartDate: string;
  seasonEndDate: string;
  seasonId: string;
  hasWildcard: boolean;
  preSeasonStartDate: string;
  preSeasonEndDate: string;
  springStartDate: string;
  springEndDate: string;
  regularSeasonStartDate: string;
  lastDate1stHalf: string;
  allStarDate: string;
  firstDate2ndHalf: string;
  regularSeasonEndDate: string;
  postSeasonStartDate: string;
  postSeasonEndDate: string;
  offseasonStartDate: string;
  offSeasonEndDate: string;
};

export type SeasonResponseDTO = {
  seasons: SeasonDTO[];
};

// LEAGUE RECORD TYPES
export type RecordsResponseDTO = {
  records: TeamRecordsDTO[];
};

export type TeamRecordsDTO = {
  division: TeamDivisionDTO;
  teamRecords: TeamRecordsInfoDTO[];
};

export type TeamRecordsInfoDTO = {
  team: TeamInfoDTO;
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

type TeamDivisionDTO = {
  id: number;
};

export type StreakDTO = {
  streakCode: string;
  streakType: string;
  streakNumber: number;
};

export type RosterResponseDTO = {
  roster: RosterMemberDTO[];
};

export type RosterMemberDTO = {
  person: PersonDTO;
  jerseyNumber: string;
  position: PositionDTO;
  status: StatusCodeDTO;
  parentTeamId: number;
};

// Person Types
export type PersonDTO = {
  id: number;
  link: string;
  useName: string;
  useLastName: string;
  fullName: string;
  boxscoreName: string;
  nickName?: string;
  lastFirstName: string;
  lastInitName: string;

  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince?: string;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;
  primaryPosition: PositionDTO;

  gender: string;
  draftYear: number;
  mlbDebutDate: string;
  batSide: HandednessDTO;
  pitchHand: HandednessDTO;

  stats: PlayerStatGroupDTO[];
};

export type PositionDTO = {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
};

export type StatusCodeDTO = {
  code: string;
  description: string;
};

export type HandednessDTO = {
  code: string;
  description: string;
};

export type MetadataEntityDTO = {
  id: number;
  name?: string;
  fullName?: string;
  link: string;
  abbreviation?: string;
};

export type PlayerStatGroupDTO = {
  type: {
    displayName: 'season' | 'seasonAdvanced';
  };
  group: {
    displayName: 'hitting' | 'pitching' | 'fielding';
  };
  splits: StatSplitDTO[];
};

export type StatSplitDTO = {
  season: string;
  gameType: string;
  team: TeamInfoDTO;
  player: MetadataEntityDTO;
  league: MetadataEntityDTO;
  sport: MetadataEntityDTO;
  stat: PlayerStatsDTO;
};

export type PlayerStatsDTO = {
  age: number;
  gamesPlayed?: number;
  gamesStarted?: number;
  runs?: number;
  doubles?: number;
  triples?: number;
  homeRuns?: number;
  strikeOuts?: number;
  baseOnBalls?: number;
  intentionalWalks?: number;
  hits?: number;
  avg?: string;
  atBats?: number;
  obp?: string;
  slg?: string;
  ops?: string;
  stolenBases?: number;
  plateAppearances?: number;
  hitByPitch?: number;
  extraBaseHits?: number;
  // hitting-specific
  rbi?: number;
  walkOffs?: number;
  // pitching-specific
  era?: string;
  inningsPitched?: string;
  wins?: number;
  losses?: number;
  saves?: number;
  saveOpportunities?: number;
  holds?: number;
  blownSaves?: number;
  earnedRuns?: number;
  whip?: string;
  battersFaced?: number;
  outs?: number;
  gamesPitched?: number;
  completeGames?: number;
  shutouts?: number;
  strikes?: number;
  strikePercentage?: string;
  winPercentage?: string;
  strikeoutsPer9?: string;
  hitsPer9?: string;
  strikesoutsToWalks?: string;
  qualityStarts?: number;
  inningsPitchedPerGame?: string;
};
