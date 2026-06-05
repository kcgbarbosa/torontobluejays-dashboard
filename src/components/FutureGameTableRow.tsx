import { formatTimeForDisplayUtil } from '../utils/dateAndTimeUtilities';
import type { Game } from '../types/models/game.model';
type GameProps = {
  gameData: Game;
};

function FutureGameTableRow({ gameData }: GameProps) {
  const {
    gameID,
    date,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    startTime,
  } = gameData;

  return (
    <tr
      key={gameID}
      className={`border-b border-gray-100 transition-colors duration-150 $`}
    >
      <td
        className={`px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap md:text-base`}
      >
        {date}
      </td>

      <td className="px-6 py-4 text-sm text-gray-900 lg:text-base">
        <div className="flex items-center gap-3">
          <img className="size-6 object-contain" src={awayTeamLogo} />
          <span>{awayTeamName}</span>
          <p>@</p>
          <img className="size-6" src={homeTeamLogo} />
          <span>{homeTeamName}</span>
        </div>
      </td>
      <td className="px-4 py-4">{formatTimeForDisplayUtil(startTime)}</td>
    </tr>
  );
}

export default FutureGameTableRow;
