export type PitcherRef = {
  id: number;
  fullName: string;
};

export type InningScore = {
  num: number;
  home: { runs: number | undefined; hits: number; errors: number };
  away: { runs: number | undefined; hits: number; errors: number };
};

export type LinescoreTotals = {
  runs: number;
  hits: number;
  errors: number;
};

export type Linescore = {
  currentInning: number;
  currentInningOrdinal: string;
  inningState: string;
  isTopInning: boolean;
  scheduledInnings: number;
  innings: InningScore[];
  home: LinescoreTotals;
  away: LinescoreTotals;
  balls: number;
  strikes: number;
  outs: number;
};

export type Decisions = {
  winner: PitcherRef;
  loser: PitcherRef;
  save?: PitcherRef;
};

export type ProbablePitchers = {
  away: PitcherRef;
  home: PitcherRef;
};
