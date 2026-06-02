import type { Game } from '../types/models/game.model';

export const CURRENT_YEAR = new Date().getFullYear();
export const now = new Date();

export const todayStr = now.toLocaleDateString('en-CA'); // FORMAT :YYYY-MM-DD
export const currentTimeStr = now.toLocaleDateString('en-CA', {
  // FORMAT: HH:MM AM/PM
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

// #TODO-Refactor [may 26] the newly fetched api date is already formatted correctly, so this should be able to be removed
export function normalizeToLocalDateString(dateString: any): string {
  if (!dateString) return '';

  const dateStr = String(dateString).trim();

  // early exit if the format is already proper
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  const parsedDate = new Date(dateStr);

  if (isNaN(parsedDate.getTime())) return dateStr;

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const isGameInPast = (game: Game) => {
  if (game.date < todayStr) return true;
  if (game.date > todayStr) return false;

  return game.startTime < currentTimeStr;
};

// #TODO [May 26] Change these 2 functions to 1 multi-use function for homepage hero

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

// #NOTE [may 26] I suspect there will be complications with this when we get to rendering. Will require additional logic using the status field to determine which game should be displayed and at what time. Could be done on the front end but may be better to handle this in the service layer
export const getHeroGameDateUtil = (scheduleData: Game[]): Game | null => {
  const todaysGame = scheduleData.find((d) => d.date === todayStr);
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

export const formatTimeUtil = (dateString: string): string => {
  const stringToDate = new Date(dateString);
  if (!stringToDate) return 'Date not found';

  let hours = stringToDate.getHours();
  let AMorPM = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  let minutes = stringToDate.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${AMorPM}`.toString();
};
