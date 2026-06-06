import type { Player } from '../types/models/person.model';

export const getStatLeader = (
  playerData: Player[],
  selectStat: (value: Player) => number
) => {
  return playerData.reduce<Player | null>((leader, curr) => {
    if (leader === null) return curr;
    if (selectStat(curr) > selectStat(leader)) {
      return curr;
    } else {
      return leader;
    }
  }, null);
};
