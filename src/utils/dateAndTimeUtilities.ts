/**
 * @utils
 *
 * dataAndTimeUtilities.ts : Consolidation of all time and date utilities
 *
 * NOTES:
 *
 * Dates() read from an external state (system clock) which makes them IMPURE
 * They return something different each time you call it, therefore, they SHOULD NOT BE CACHED. They should be called EXACTLY when needed.
 *
 *  YYYY-MM-DD
 *  - typically used by apis as field values and as parameters
 *  - can be extracted from ISOString fornat (YYYY-MM-DDTHH:mm:ss.sssZ)
 *    SYNTAX: new Date().toLocaleDateString('en-CA');
 *
 */

import type { Game } from '../types/models/game.model';

export const CURRENT_YEAR = new Date().getFullYear();

export const isGameInPast = (game: Game) => {
  const todaysDate = new Date().toLocaleDateString('en-CA');

  if (game.date < todaysDate) return true;
  if (game.date > todaysDate) return false;

  return game.startTime < new Date().toISOString();
};

// # TODO [May 26] Change these 2 functions to 1 multi-use function for homepage hero

export const getRecentGameDateUtil = (scheduleData: Game[]): Game | null => {
  const pastGames = scheduleData.filter((game) => isGameInPast(game));
  if (pastGames.length === 0) return null;

  return pastGames.reduce((prevGame, game) =>
    new Date(game.date).getTime() > new Date(prevGame.date).getTime()
      ? game
      : prevGame
  );
};

export const getNextGameDateUtil = (scheduleData: Game[]): Game | null => {
  const upcomingGames = scheduleData.filter((game) => !isGameInPast(game));
  if (upcomingGames.length === 0) return null;

  return upcomingGames.reduce((nextGame, game) =>
    new Date(game.date).getTime() < new Date(nextGame.date).getTime()
      ? game
      : nextGame
  );
};

export const getHeroGameDateUtil = (scheduleData: Game[]): Game | null => {
  const todaysDate = new Date().toLocaleDateString('en-CA');

  const todaysGame = scheduleData.find((d) => d.date === todaysDate);
  if (todaysGame) {
    return todaysGame;
  }
  const upcomingGames = scheduleData.filter((game) => !isGameInPast(game));
  if (upcomingGames.length === 0) return null;

  return upcomingGames.reduce((nextGame, game) =>
    new Date(game.date).getTime() < new Date(nextGame.date).getTime()
      ? game
      : nextGame
  );
};

export const formatTimeForDisplayUtil = (dateString: string): string => {
  const stringToDate = new Date(dateString);
  if (!stringToDate) return 'Date not found';

  let hours = stringToDate.getHours();
  let AMorPM = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  let minutes = stringToDate.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${AMorPM}`.toString();
};
