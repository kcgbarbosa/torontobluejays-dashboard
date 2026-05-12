/**
 * @utils
 *
 * dtoToModelMappers - Util functions which
 *
 *
 */
import type {
  GameDTO,
  GameInfoDTO,
  GameResponseDTO,
  RecordsResponseDTO,
  RosterMemberDTO,
  RosterResponseDTO,
  SeasonDTO,
  SeasonResponseDTO,
  TeamRecordsDTO,
  TeamRecordsInfoDTO,
} from '../types/dto/mlb.dto';

export function recentGameModelMapper(result: GameResponseDTO) {
  const formattedResult = result.dates.flatMap((data: GameDTO) => {
    return data.games.map((subData: GameInfoDTO) => {
      return {
        date: new Date(data.date),
        startTime: subData.calendarEventID,
        gameID: subData.gamePk,
        awayTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.away.team.id}.svg`,
        awayTeamName: subData.teams.away.team.name,
        awayTeamScore: subData.teams.away.score,
        homeTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.home.team.id}.svg`,
        homeTeamName: subData.teams.home.team.name,
        homeTeamScore: subData.teams.home.score,
        gameVenue: subData.venue.name,
      };
    });
  });
  return formattedResult;
}

export function seasonDataModelMapper(result: SeasonResponseDTO) {
  const formattedResult = result.seasons.map((data: SeasonDTO) => {
    return {
      seasonStartDate: data.seasonStartDate,
      seasonEndDate: data.seasonEndDate,
    };
  });
  return formattedResult;
}

export function scheduleDataModelMapper(result: GameResponseDTO) {
  const formattedResult = result.dates.flatMap((data: GameDTO) => {
    return data.games.map((subData: GameInfoDTO) => {
      return {
        date: new Date(data.date),
        startTime: subData.calendarEventID,
        gameID: subData.gamePk,
        awayTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.away.team.id}.svg`,
        awayTeamName: subData.teams.away.team.name,
        awayTeamScore: subData.teams.away.score,
        homeTeamLogo: `https://www.mlbstatic.com/team-logos/${subData.teams.home.team.id}.svg`,
        homeTeamName: subData.teams.home.team.name,
        homeTeamScore: subData.teams.home.score,
        gameVenue: subData.venue.name,
      };
    });
  });
  const seenGames = new Set();
  const filteredScheduleData = formattedResult.filter((d) => {
    if (seenGames.has(d.gameID)) return false;
    seenGames.add(d.gameID);
    return true;
  });
  return filteredScheduleData;
}

export function alTeamRecordsDataModelMapper(result: RecordsResponseDTO) {
  const formattedResult = result.records.flatMap((data: TeamRecordsDTO) => {
    return data.teamRecords.map((subdata: TeamRecordsInfoDTO) => {
      return {
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
    // defining hitting and pitching groups to ensure accurate stat access, regardless of specific players json response
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
      imageUrl: `#TODO [May 11] Determine URL for Headshot`,
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
