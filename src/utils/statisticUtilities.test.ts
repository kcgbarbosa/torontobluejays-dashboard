import type { Player } from '../types/models/person.model';
import { getStatLeader } from './statisticUtilities';

describe('retrieve leader of given statistic', () => {
  it('retrieve home run leader from array of multiple players', () => {
    const playerData = [
      {
        firstName: 'MrWinner',
        hitting: {
          homeRuns: 999,
        },
      },
      {
        firstName: 'MissInBetweener',
        hitting: {
          homeRuns: 10,
        },
      },
      {
        firstName: 'SirLoser',
        hitting: {
          homeRuns: 1,
        },
      },
    ] as Player[];
    expect(getStatLeader(playerData, (d) => d.hitting?.homeRuns ?? -1)).toEqual(
      {
        firstName: 'MrWinner',
        hitting: {
          homeRuns: 999,
        },
      }
    );
  });

  it('retrieve home run leader from array with a single player', () => {
    const playerData = [
      {
        firstName: 'DefaultDude',
        hitting: {
          homeRuns: 325,
        },
      },
    ] as Player[];
    expect(getStatLeader(playerData, (d) => d.hitting?.homeRuns ?? -1)).toEqual(
      {
        firstName: 'DefaultDude',
        hitting: {
          homeRuns: 325,
        },
      }
    );
  });
});
