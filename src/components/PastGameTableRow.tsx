import type { Game } from '../types/models/game.model';

type GameProps = {
  gameData: Game;
};

export function PastGameTableRow({ gameData }: GameProps) {
  const {
    gameID,
    date,
    homeTeamScore,
    awayTeamScore,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
  } = gameData;

  if (awayTeamScore === undefined || homeTeamScore === undefined) {
    return (
      <tr className="border-b border-gray-100 bg-white hover:bg-gray-50/50 transition-colors duration-150 ">
        <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap">
          {date}
        </td>
        <td className="px-6 py-4 text-base text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <img
              className="size-6 object-contain opacity-40"
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span>{awayTeamName}</span>
            <span className="text-gray-200">@</span>
            <img
              className="size-6 object-contain opacity-40"
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span>{homeTeamName}</span>
            <span className="ml-4 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">
              Postponed / TBD
            </span>
          </div>
        </td>
      </tr>
    );
  }

  const awayWon = awayTeamScore > homeTeamScore;
  const homeWon = homeTeamScore > awayTeamScore;
  const isBlueJaysWinner =
    (awayWon && awayTeamName.includes('Blue Jays')) ||
    (homeWon && homeTeamName.includes('Blue Jays'));

  return (
    <tr
      key={gameID}
      className={`border-b border-gray-100 transition-colors duration-150 ${
        isBlueJaysWinner
          ? 'bg-green-100/50 hover:bg-green-100'
          : 'bg-gray-100/50 hover:bg-gray-100'
      }`}
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap md:text-base">
        {date}
      </td>
      <td className="px-6 py-4 text-sm lg:text-base">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 ${awayWon ? 'font-bold text-gray-900' : 'text-gray-500'}`}
          >
            <img
              className={`size-6 object-contain ${!awayWon && 'opacity-60'}`}
              src={awayTeamLogo}
              alt={awayTeamName}
            />
            <span>{awayTeamName}</span>
            <span className="text-base ml-1">{awayTeamScore}</span>
          </div>
          <span className="text-gray-300 ml-1">@</span>
          <div
            className={`flex items-center gap-2 ${homeWon ? 'font-bold text-gray-900' : 'text-gray-500'}`}
          >
            <img
              className={`size-6 object-contain ${!homeWon && 'opacity-60'}`}
              src={homeTeamLogo}
              alt={homeTeamName}
            />
            <span>{homeTeamName}</span>
            <span className="text-base ml-1">{homeTeamScore}</span>
          </div>
          {isBlueJaysWinner ? (
            <span className="ml-4 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold tracking-wider uppercase">
              W
            </span>
          ) : (
            <span className="ml-4 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold tracking-wider uppercase">
              L
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

export default PastGameTableRow;
