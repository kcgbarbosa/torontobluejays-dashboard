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
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
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
  useName: string;
  useLastName: string;
  middleName?: string;
  boxscoreName: string;
  nickName?: string;
  gender: string;
  draftYear: number;
  mlbDebutDate: string;
  batSide: HandednessDTO;
  pitchHand: HandednessDTO;
  nameFirstLast: string;
  nameSlug: string;
  firstLastName: string;
  lastFirstName: string;
  lastInitName: string;
  initLastName: string;
  fullFMLName: string;
  fullLFMName: string;
  strikeZoneTop: number;
  strikeZoneBottom: number;
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
  hitBatsmen?: number;
  winPercentage?: string;
  pitchesPerInning?: string;
  winningPercentage?: string;
  strikeoutsPer9?: string;
  hitsPer9?: string;
  strikesoutsToWalks?: string;
  qualityStarts?: number;
  inningsPitchedPerGame?: string;
};
