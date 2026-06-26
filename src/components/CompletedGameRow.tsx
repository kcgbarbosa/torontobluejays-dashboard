import type { Game } from '../types/models/game.model';
import { getGameResult } from '../utils/gameResultUtils';
import WinLossBadge from './WinLossBadge';
import { teamAbbreviator } from '../utils/teamAbbreviator';

type GameProps = {
  gameData: Game;
};

export function CompletedGameRow({ gameData }: GameProps) {
  const {
    keyID,
    date,
    homeTeamScore,
    awayTeamScore,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    detailedState,
  } = gameData;

  if (detailedState === 'Postponed') {
    return (
      <tr className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors duration-150 ">
        <td className="">
          <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-900 rounded text-xs font-medium">
            Postponed
          </span>
        </td>
        <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 sm:justify-center">
            <img
              className="size-5 shrink-0 object-contain opacity-40"
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
            <span className="hidden sm:inline">{awayTeamName}</span>
            <span className="text-gray-200 text-xs">@</span>
            <img
              className="size-5 shrink-0 object-contain opacity-40"
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
            <span className="hidden sm:inline">{homeTeamName}</span>
            <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-900 rounded text-xs font-medium">
              Postponed
            </span>
          </div>
        </td>
      </tr>
    );
  }

  const { awayWon, bjWon: isBlueJaysWinner } = getGameResult(gameData);
  const homeWon = !awayWon;

  return (
    <tr
      key={keyID}
      className={`border-b border-gray-100 transition-colors duration-150 ${
        isBlueJaysWinner
          ? 'bg-amber-50 hover:bg-amber-100/60'
          : 'bg-gray-50 hover:bg-gray-100/60'
      }`}
    >
      <td className="pl-4 pr-2 py-2.5 sm:px-4 sm:py-3 text-xs font-medium text-gray-500 whitespace-nowrap w-px">
        {date}
      </td>
      <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
        <div className="flex items-center gap-2 text-sm sm:justify-center">
          <div
            className={`flex items-center gap-1.5 ${awayWon ? 'font-bold text-gray-900' : 'text-gray-500'}`}
          >
            <img
              className={`size-5 shrink-0 object-contain ${!awayWon && 'opacity-50'}`}
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
            <span className="hidden sm:inline">{awayTeamName}</span>
            <span>{awayTeamScore}</span>
          </div>
          <span className="text-gray-300 text-xs">@</span>
          <div
            className={`flex items-center gap-1.5 ${homeWon ? 'font-bold text-gray-900' : 'text-gray-500'}`}
          >
            <img
              className={`size-5 shrink-0 object-contain ${!homeWon && 'opacity-50'}`}
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
            <span className="hidden sm:inline">{homeTeamName}</span>
            <span>{homeTeamScore}</span>
          </div>
          <WinLossBadge won={isBlueJaysWinner} />
        </div>
      </td>
    </tr>
  );
}

export default CompletedGameRow;
