import React from 'react';
import type { Game } from '../types/models/game.model';
import { formatTimeUtil } from '../utils/dateAndTimeUtilities';

type GameProps = {
  gameData: Game;
};

{
  /* # TODO [June 1] Add scores from game and style conditionallye */
}

export function PastGameTableRow({ gameData }: GameProps) {
  return (
    <tr
      key={gameData.gameID}
      className="bg-white hover:bg-gray-100 transition-colors duration-200"
    >
      <td className="px-4 py-4">{gameData.date}</td>
      <td className="px-4 py-4">
        <div className="flex align-left gap-2">
          <img className="size-6" src={gameData.awayTeamLogo} />
          <span>{gameData.awayTeamName}</span>
          <p>@</p>
          <img className="size-6" src={gameData.homeTeamLogo} />
          <span>{gameData.homeTeamName}</span>
        </div>
      </td>
    </tr>
  );
}
