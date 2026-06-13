import type { Game } from '../types/models/game.model';
import { isGameInPast } from './dateAndTimeUtilities';

// #TODO NEXT [June 13] Write tests for the other paths
describe.only('isGameInPast', () => {
  it('returns true for a game in the past ', () => {
    // #NOTE [June 13] define game object which contains only the required isGameInPast arguments
    const game = {
      date: '2024-01-01',
      startTime: '2024-01-01T18:00:00Z',
    } as Game; // #NOTE [June 13] 'as Game' to make TS happy. the arg im passing is Game' shaped i swear <3
    expect(isGameInPast(game)).toBe(true);
  });
});
