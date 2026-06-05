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
 * # TODO NEXT [Jun 5] Implement isGameInPast across all relevant components
 *
 */

import type { Game } from '../types/models/game.model';

export const isGameInPast = (game: Game) => {
  const todaysDate = new Date().toLocaleDateString('en-CA');

  if (game.date < todaysDate) return true;
  if (game.date > todaysDate) return false;

  return game.startTime < new Date().toISOString();
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

export const formatDateForDisplayLongUtil = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};

export const formatDateForDisplayShortUtil = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};
