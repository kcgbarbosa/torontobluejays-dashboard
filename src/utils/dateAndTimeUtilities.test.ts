import type { Game } from '../types/models/game.model';
import { isGameInPast } from './dateAndTimeUtilities';

describe('isGameInPast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // set controlled current time to make tests deterministic
    vi.setSystemTime(new Date('2026-06-14T20:00:00Z'));
  });
  it('returns true for a game in the past', () => {
    const gameFromPast = {
      date: '2024-01-01',
      startTime: '2024-01-01T18:00:00Z',
    } as Game;
    expect(isGameInPast(gameFromPast)).toBe(true);
  });
  it('returns false if game is not in past', () => {
    const gameInFuture = {
      date: '2027-01-01',
      startTime: '2027-01-01T18:00:00Z',
    } as Game;
    expect(isGameInPast(gameInFuture)).toBe(false);
  });
  it('returns true if game is on the current date and the current time is past the game startTime', () => {
    const gameTodayThatHasStarted = {
      date: '2026-06-14',
      startTime: '2026-06-14T19:07:00Z',
    } as Game;
    expect(isGameInPast(gameTodayThatHasStarted)).toBe(true);
  });
  it('returns false if game is on the current date and the current time is prior to the game startTime', () => {
    const gameTodayThatHasNotStarted = {
      date: '2026-06-14',
      startTime: '2026-06-14T21:07:00Z',
    } as Game;
    expect(isGameInPast(gameTodayThatHasNotStarted)).toBe(false);
  });
  afterEach(() => {
    vi.useRealTimers(); // cleanup
  });
});
