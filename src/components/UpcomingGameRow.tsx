import { formatTimeForDisplayUtil } from '../utils/dateAndTimeUtilities';
import type { Game } from '../types/models/game.model';
import { teamAbbreviator } from '../utils/teamAbbreviator';
type GameProps = {
  gameData: Game;
};

function UpcomingGameRow({ gameData }: GameProps) {
  const {
    keyID,
    date,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    startTime,
  } = gameData;

  return (
    <tr
      key={keyID}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
    >
      <td className="pl-4 pr-2 py-2.5 sm:px-4 sm:py-3 text-xs font-medium text-gray-500 whitespace-nowrap w-px">
        {date}
      </td>

      <td className="px-2 py-2.5 sm:px-4 sm:py-3 min-w-0 sm:text-center">
        <div className="flex items-center gap-1.5 font-medium text-gray-900 text-sm sm:justify-center">
          <img
            className="size-5 shrink-0 object-contain"
            src={awayTeamLogo}
            alt={awayTeamName}
          />
          <span className="sm:hidden">{teamAbbreviator(awayTeamName)}</span>
          <span className="hidden sm:inline">{awayTeamName}</span>
          <span className="text-gray-300 text-xs">@</span>
          <img
            className="size-5 shrink-0 object-contain"
            src={homeTeamLogo}
            alt={homeTeamName}
          />
          <span className="sm:hidden">{teamAbbreviator(homeTeamName)}</span>
          <span className="hidden sm:inline">{homeTeamName}</span>
        </div>
        <div className="sm:hidden mt-0.5 text-xs text-gray-500">
          {formatTimeForDisplayUtil(startTime)}
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap hidden sm:table-cell">
        {formatTimeForDisplayUtil(startTime)}
      </td>
    </tr>
  );
}

export default UpcomingGameRow;
