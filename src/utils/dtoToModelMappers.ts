import type {
  DecisionsDTO,
  GameDTO,
  GameInfoDTO,
  GameResponseDTO,
  LinescoreDTO,
  RecordsResponseDTO,
  RosterMemberDTO,
  RosterResponseDTO,
  SeasonDTO,
  SeasonResponseDTO,
  TeamRecordsDTO,
  TeamRecordsInfoDTO,
} from '../types/dto/mlb.dto';
import type {
  Decisions,
  Linescore,
  ProbablePitchers,
} from '../types/models/linescore.model';

export function linescoreModelMapper(dto: LinescoreDTO): Linescore {
  return {
    currentInning: dto.currentInning,
    currentInningOrdinal: dto.currentInningOrdinal,
    inningState: dto.inningState,
    isTopInning: dto.isTopInning,
    scheduledInnings: dto.scheduledInnings,
    innings: dto.innings.map((inning) => ({
      num: inning.num,
      home: {
        runs: inning.home.runs,
        hits: inning.home.hits,
        errors: inning.home.errors,
      },
      away: {
        runs: inning.away.runs,
        hits: inning.away.hits,
        errors: inning.away.errors,
      },
    })),
    home: {
      runs: dto.teams.home.runs,
      hits: dto.teams.home.hits,
      errors: dto.teams.home.errors,
    },
    away: {
      runs: dto.teams.away.runs,
      hits: dto.teams.away.hits,
      errors: dto.teams.away.errors,
    },
    balls: dto.balls,
    strikes: dto.strikes,
    outs: dto.outs,
  };
}

export function decisionsModelMapper(dto: DecisionsDTO): Decisions {
  return {
    winner: {
      id: dto.winner.id,
      fullName: dto.winner.fullName,
      playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${dto.winner.id}/spots/240`,
      playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${dto.winner.id}.jpg`,
    },
    loser: {
      id: dto.loser.id,
      fullName: dto.loser.fullName,
      playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${dto.loser.id}/spots/240`,
      playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${dto.loser.id}.jpg`,
    },
    save: dto.save
      ? {
          id: dto.save.id,
          fullName: dto.save.fullName,
          playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${dto.save.id}/spots/240`,
          playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${dto.save.id}.jpg`,
        }
      : undefined,
  };
}

export function gameModelMapper(result: GameResponseDTO) {
  const formattedResult = result.dates.flatMap((data: GameDTO) => {
    return data.games.map((subData: GameInfoDTO) => {
      const probablePitchers: ProbablePitchers | undefined =
        subData.teams.away.probablePitcher && subData.teams.home.probablePitcher
          ? {
              away: {
                id: subData.teams.away.probablePitcher.id,
                fullName: subData.teams.away.probablePitcher.fullName,
                playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${subData.teams.away.probablePitcher.id}/spots/240`,
                playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${subData.teams.away.probablePitcher.id}.jpg`,
              },
              home: {
                id: subData.teams.home.probablePitcher.id,
                fullName: subData.teams.home.probablePitcher.fullName,
                playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${subData.teams.home.probablePitcher.id}/spots/240`,
                playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${subData.teams.home.probablePitcher.id}.jpg`,
              },
            }
          : undefined;
      return {
        keyID: crypto.randomUUID(),
        date: subData.officialDate,
        startTime: subData.gameDate,
        gamePk: subData.gamePk,
        abstractGameState: subData.status.abstractGameState,
        detailedState: subData.status.detailedState,
        statusCode: subData.status.statusCode,
        awayTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.away.team.id}.svg`,
        awayTeamName: subData.teams.away.team.name,
        awayTeamScore: subData.teams.away.score,
        homeTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.home.team.id}.svg`,
        homeTeamName: subData.teams.home.team.name,
        homeTeamScore: subData.teams.home.score,
        gameVenue: subData.venue.name,
        linescore: subData.linescore
          ? linescoreModelMapper(subData.linescore)
          : undefined,
        decisions: subData.decisions
          ? decisionsModelMapper(subData.decisions)
          : undefined,
        probablePitchers,
      };
    });
  });
  return formattedResult;
}

export function seasonDataModelMapper(result: SeasonResponseDTO) {
  const formattedResult = result.seasons.map((data: SeasonDTO) => {
    return {
      seasonId: data.seasonId,
      springStartDate: data.springStartDate,
      springEndDate: data.springEndDate,
      regularSeasonStartDate: data.regularSeasonStartDate,
      endOfFirstHalf: data.lastDate1stHalf,
      allStarBreakStartDate: data.allStarDate,
      startOfSecondHalf: data.firstDate2ndHalf,
      regularSeasonEndDate: data.regularSeasonEndDate,
      postSeasonStartDate: data.postSeasonStartDate,
      postSeasonEndDate: data.postSeasonEndDate,
    };
  });
  return formattedResult;
}

export function scheduleDataModelMapper(result: GameResponseDTO) {
  const formattedResult = result.dates.flatMap((data: GameDTO) => {
    return data.games.map((subData: GameInfoDTO) => {
      const probablePitchers: ProbablePitchers | undefined =
        subData.teams.away.probablePitcher && subData.teams.home.probablePitcher
          ? {
              // #TODO NEXT - Add additional stats for the probable pitchers Preview Game display
              away: {
                id: subData.teams.away.probablePitcher.id,
                fullName: subData.teams.away.probablePitcher.fullName,
                playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${subData.teams.away.probablePitcher.id}/spots/240`,
                playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${subData.teams.away.probablePitcher.id}.jpg`,
              },
              home: {
                id: subData.teams.home.probablePitcher.id,
                fullName: subData.teams.home.probablePitcher.fullName,
                playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${subData.teams.home.probablePitcher.id}/spots/240`,
                playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${subData.teams.home.probablePitcher.id}.jpg`,
              },
            }
          : undefined;
      return {
        keyID: crypto.randomUUID(),
        date: subData.officialDate,
        startTime: subData.gameDate,
        gamePk: subData.gamePk,
        abstractGameState: subData.status.abstractGameState,
        detailedState: subData.status.detailedState,
        statusCode: subData.status.statusCode,
        awayTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.away.team.id}.svg`,
        awayTeamName: subData.teams.away.team.name,
        awayTeamScore: subData.teams.away.score,
        homeTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.home.team.id}.svg`,
        homeTeamName: subData.teams.home.team.name,
        homeTeamScore: subData.teams.home.score,
        gameVenue: subData.venue.name,
        linescore: subData.linescore
          ? linescoreModelMapper(subData.linescore)
          : undefined,
        decisions: subData.decisions
          ? decisionsModelMapper(subData.decisions)
          : undefined,
        probablePitchers,
      };
    });
  });
  return formattedResult;
}

export function alTeamRecordsDataModelMapper(result: RecordsResponseDTO) {
  const formattedResult = result.records.flatMap((data: TeamRecordsDTO) => {
    return data.teamRecords.map((subdata: TeamRecordsInfoDTO) => {
      return {
        keyID: crypto.randomUUID(),
        divisionId: data.division.id,
        teamName: subdata.team.name,
        divisionRank: subdata.divisionRank,
        gamesPlayed: subdata.gamesPlayed,
        gamesBack: subdata.divisionGamesBack,
        wins: subdata.wins,
        losses: subdata.losses,
        runDiff: subdata.runDifferential,
        winPercentage: subdata.winningPercentage,
        hasWildCard: subdata.hasWildCard,
        hasClinched: subdata.clinched,
        streakAbbr: subdata.streak.streakCode,
        streakType: subdata.streak.streakType,
        streakLength: subdata.streak.streakNumber,
      };
    });
  });
  return formattedResult;
}

export function rosterDataModelMapper(result: RosterResponseDTO) {
  const formattedResult = result.roster.map((data: RosterMemberDTO) => {
    const hittingGroup = data.person.stats?.find(
      (g) =>
        g.type.displayName === 'season' && g.group.displayName === 'hitting'
    );
    const hittingStats = hittingGroup?.splits?.[0]?.stat;

    const pitchingGroup = data.person.stats?.find(
      (g) =>
        g.type.displayName === 'season' && g.group.displayName === 'pitching'
    );
    const pitchingStats = pitchingGroup?.splits?.[0]?.stat;

    const isPitcher = data.person.primaryPosition.type === 'Pitcher';

    return {
      id: data.person.id,
      link: data.person.link,
      firstName: data.person.useName,
      lastName: data.person.useLastName,
      fullName: data.person.fullName,
      boxscoreName: data.person.boxscoreName,
      nickname: data.person.nickName,
      lastFirstName: data.person.lastFirstName,
      lastInitName: data.person.lastInitName,

      jerseyNumber: data.jerseyNumber,
      playerHeadshotUrl: `https://midfield.mlbstatic.com/v1/people/${data.person.id}/spots/240`,
      playerActionShotUrl: `https://securea.mlb.com/images/players/action_shots/${data.person.id}.jpg`,
      primaryNumber: data.person.primaryNumber,
      birthDate: data.person.birthDate,
      currentAge: data.person.currentAge,
      birthCity: data.person.birthCity,
      birthStateProvince: data.person.birthStateProvince,
      birthCountry: data.person.birthCountry,
      height: data.person.height,
      weight: data.person.weight,
      active: data.person.active,

      // --- Position Info  ---
      positionCode: data.person.primaryPosition.code,
      positionName: data.person.primaryPosition.name,
      positionType: data.person.primaryPosition.type,
      positionAbbreviation: data.person.primaryPosition.abbreviation,
      isPitcher: isPitcher,

      gender: data.person.gender,
      draftYear: data.person.draftYear,
      mlbDebutDate: data.person.mlbDebutDate,

      // --- Handedness ---
      batSideCode: data.person.batSide.code,
      batSideDescription: data.person.batSide.description,
      pitchHandCode: data.person.pitchHand.code,
      pitchHandDescription: data.person.pitchHand.description,

      // --- Hitting Stats  ---
      hitting: hittingStats
        ? {
            age: hittingStats.age,
            gamesPlayed: hittingStats.gamesPlayed ?? 0,
            gamesStarted: hittingStats.gamesStarted ?? 0,
            runs: hittingStats.runs ?? 0,
            doubles: hittingStats.doubles ?? 0,
            triples: hittingStats.triples ?? 0,
            homeRuns: hittingStats.homeRuns ?? 0,
            strikeOuts: hittingStats.strikeOuts ?? 0,
            baseOnBalls: hittingStats.baseOnBalls ?? 0,
            intentionalWalks: hittingStats.intentionalWalks ?? 0,
            hits: hittingStats.hits ?? 0,
            avg: hittingStats.avg ?? '.000',
            atBats: hittingStats.atBats ?? 0,
            obp: hittingStats.obp ?? '.000',
            slg: hittingStats.slg ?? '.000',
            ops: hittingStats.ops ?? '.000',
            stolenBases: hittingStats.stolenBases ?? 0,
            plateAppearances: hittingStats.plateAppearances ?? 0,
            hitByPitch: hittingStats.hitByPitch ?? 0,
            extraBaseHits: hittingStats.extraBaseHits ?? 0,
            rbi: hittingStats.rbi ?? 0,
            walkOffs: hittingStats.walkOffs ?? 0,
          }
        : undefined,

      // --- Pitching Stats ---
      pitching: pitchingStats
        ? {
            age: pitchingStats.age,
            gamesPlayed: pitchingStats.gamesPlayed ?? 0,
            gamesStarted: pitchingStats.gamesStarted ?? 0,
            runsAllowed: pitchingStats.runs ?? 0,
            doublesAllowed: pitchingStats.doubles ?? 0,
            triplesAllowed: pitchingStats.triples ?? 0,
            homeRunsAllowed: pitchingStats.homeRuns ?? 0,
            strikeOuts: pitchingStats.strikeOuts ?? 0,
            walksAllowed: pitchingStats.baseOnBalls ?? 0,
            intentionalWalksAllowed: pitchingStats.intentionalWalks ?? 0,
            hitsAllowed: pitchingStats.hits ?? 0,
            opponentAvg: pitchingStats.avg ?? '.000',
            opponentAtBats: pitchingStats.atBats ?? 0,
            opponentObp: pitchingStats.obp ?? '.000',
            opponentSlg: pitchingStats.slg ?? '.000',
            opponentOps: pitchingStats.ops ?? '.000',
            stolenBasesAllowed: pitchingStats.stolenBases ?? 0,
            battersFaced: pitchingStats.battersFaced ?? 0,
            hitBatsmen: pitchingStats.hitByPitch ?? 0,
            extraBaseHitsAllowed: pitchingStats.extraBaseHits ?? 0,
            era: pitchingStats.era ?? '-.--',
            inningsPitched: pitchingStats.inningsPitched ?? '0.0',
            wins: pitchingStats.wins ?? 0,
            losses: pitchingStats.losses ?? 0,
            saves: pitchingStats.saves ?? 0,
            saveOpportunities: pitchingStats.saveOpportunities ?? 0,
            holds: pitchingStats.holds ?? 0,
            blownSaves: pitchingStats.blownSaves ?? 0,
            earnedRuns: pitchingStats.earnedRuns ?? 0,
            whip: pitchingStats.whip ?? '-.--',
            outsRecorded: pitchingStats.outs ?? 0,
            gamesPitched: pitchingStats.gamesPitched ?? 0,
            completeGames: pitchingStats.completeGames ?? 0,
            shutouts: pitchingStats.shutouts ?? 0,
            strikesThrown: pitchingStats.strikes ?? 0,
            strikePercentage: pitchingStats.strikePercentage ?? '.000',
            winPercentage: pitchingStats.winPercentage ?? '.000',
            strikeoutsPer9: pitchingStats.strikeoutsPer9 ?? '0.0',
            hitsPer9: pitchingStats.hitsPer9 ?? '0.0',
            strikeoutsToWalksRatio: pitchingStats.strikesoutsToWalks ?? '0.0',
            qualityStarts: pitchingStats.qualityStarts ?? 0,
            inningsPitchedPerGame: pitchingStats.inningsPitchedPerGame ?? '0.0',
          }
        : undefined,
    };
  });

  return formattedResult;
}
