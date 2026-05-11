export type Player = {
  id: number;
  link: string;
  firstName: string; // Mapped from useName
  lastName: string; // Mapped from useLastName
  fullName: string;
  boxscoreName: string;
  nickname?: string; // Mapped from nickName
  lastFirstName: string;
  lastInitName: string;

  jerseyNumber: string;
  imageUrl: string; // created for player headshots
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince?: string;
  birthCountry: string;
  height: string;
  weight: number;
  active: boolean;

  positionCode: string; // Mapped from primaryPosition.code
  positionName: string; // Mapped from primaryPosition.name
  positionType: string; // Mapped from primaryPosition.type
  positionAbbreviation: string; // Mapped from primaryPosition.abbreviation
  isPitcher: boolean; // Derived flag: true if positionType === "Pitcher"

  gender: string;
  draftYear: number;
  mlbDebutDate: string;

  // Handedness (Flattened from batSide and pitchHand)
  batSideCode: string; // Mapped from batSide.code
  batSideDescription: string; // Mapped from batSide.description
  pitchHandCode: string; // Mapped from pitchHand.code
  pitchHandDescription: string; // Mapped from pitchHand.description

  // --- Hitting Statistics (Optional) ---
  hitting?: {
    age: number;
    gamesPlayed: number;
    gamesStarted: number;
    runs: number;
    doubles: number;
    triples: number;
    homeRuns: number;
    strikeOuts: number;
    baseOnBalls: number;
    intentionalWalks: number;
    hits: number;
    avg: string;
    atBats: number;
    obp: string;
    slg: string;
    ops: string;
    stolenBases: number;
    plateAppearances: number;
    hitByPitch: number;
    extraBaseHits: number;
    rbi: number; // Hitting-specific
    walkOffs: number; // Hitting-specific
  };

  // --- Pitching Statistics (Optional) ---
  pitching?: {
    age: number;
    gamesPlayed: number; // Overlaps with hitter gamesPlayed
    gamesStarted: number; // Overlaps with hitter gamesStarted
    runsAllowed: number; // Mapped from runs (Overlaps with hitter runs)
    doublesAllowed: number; // Mapped from doubles (Overlaps with hitter doubles)
    triplesAllowed: number; // Mapped from triples (Overlaps with hitter triples)
    homeRunsAllowed: number; // Mapped from homeRuns (Overlaps with hitter homeRuns)
    strikeOuts: number;
    walksAllowed: number; // Mapped from baseOnBalls (Overlaps with hitter baseOnBalls)
    intentionalWalksAllowed: number; // Mapped from intentionalWalks (Overlaps with hitter intentionalWalks)
    hitsAllowed: number; // Mapped from hits (Overlaps with hitter hits)
    opponentAvg: string; // Mapped from avg (Overlaps with hitter avg)
    opponentAtBats: number; // Mapped from atBats (Overlaps with hitter atBats)
    opponentObp: string; // Mapped from obp (Overlaps with hitter obp)
    opponentSlg: string; // Mapped from slg (Overlaps with hitter slg)
    opponentOps: string; // Mapped from ops (Overlaps with hitter ops)
    stolenBasesAllowed: number; // Mapped from stolenBases (Overlaps with hitter stolenBases)
    battersFaced: number; // Overlaps with hitter plateAppearances
    hitBatsmen: number; // Mapped from hitByPitch (Overlaps with hitter hitByPitch)
    extraBaseHitsAllowed: number; // Mapped from extraBaseHits (Overlaps with hitter extraBaseHits)
    era: string;
    inningsPitched: string;
    wins: number;
    losses: number;
    saves: number;
    saveOpportunities: number;
    holds: number;
    blownSaves: number;
    earnedRuns: number;
    whip: string;
    outsRecorded: number; // Mapped from outs (Pitching-specific)
    gamesPitched: number;
    completeGames: number;
    shutouts: number;
    strikesThrown: number; // Mapped from strikes (Pitching-specific)
    strikePercentage: string;
    winPercentage: string;
    strikeoutsPer9: string;
    hitsPer9: string;
    strikeoutsToWalksRatio: string; // Mapped from strikesoutsToWalks (Pitching-specific)
    qualityStarts: number;
    inningsPitchedPerGame: string;
  };
};
