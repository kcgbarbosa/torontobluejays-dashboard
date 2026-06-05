import type { Game } from '../types/models/game.model';

export function getGameResult(game: Game) {
  const scoresAvailable =
    game.awayTeamScore !== undefined && game.homeTeamScore !== undefined;
  const awayWon = scoresAvailable && game.awayTeamScore! > game.homeTeamScore!;
  const bjIsAway = game.awayTeamName.includes('Blue Jays');
  const bjWon = scoresAvailable && (bjIsAway ? awayWon : !awayWon);

  return { scoresAvailable, awayWon, bjWon };
}
