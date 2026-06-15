import { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import type { Game } from '../types/models/game.model';
import {
  formatTimeForDisplayUtil,
  formatDateForDisplayLongUtil,
} from '../utils/dateAndTimeUtilities';
import StatCard from './StatCard';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { getGameResult } from '../utils/gameResultUtils';

type GameDataProps = {
  gameDataProp: Game | null;
};

function HeroGameCard({ gameDataProp }: GameDataProps) {
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDataProp || !gameDataProp.date)
    return <div>No game data available</div>;

  const innings = gameDataProp.linescore?.innings ?? [];
  const totalInnings = Math.max(9, innings.length);
  const inningNumbers = Array.from({ length: totalInnings }, (_, i) => i + 1);
  const inningMap: Record<number, (typeof innings)[0]> = {};
  innings.forEach((inn) => {
    inningMap[inn.num] = inn;
  });

  const cell = 'px-3 py-4 text-center text-sm';
  const headerCell = `${cell} bg-white font-semibold text-gray-900 text-xs uppercase`;

  const rows = [
    {
      label: gameDataProp.awayTeamName,
      side: 'away' as const,
      totals: gameDataProp.linescore?.away,
    },
    {
      label: gameDataProp.homeTeamName,
      side: 'home' as const,
      totals: gameDataProp.linescore?.home,
    },
  ];

  const { awayWon, bjWon: isBlueJaysWinner } = getGameResult(gameDataProp);

  return (
    <>
      <div className="w-full min-h-110 bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center">
        {/* Game Main Details */}
        <div id="game-preview">
          <div className="text-center pb-6 flex flex-col items-center justify-center">
            <span className="text-medium text-gray-600">
              {formatDateForDisplayLongUtil(gameDataProp.date)}
            </span>
            {gameDataProp.abstractGameState !== 'Preview' && (
              <div>Live 🔴 </div>
            )}
          </div>
          <div
            id="game-main-details"
            className="
            flex justify-center
            gap-20
          "
          >
            <span className="flex flex-col items-center gap-2">
              <div
                className={`border-2 rounded-full p-2 ${gameDataProp.awayTeamName === 'Toronto Blue Jays' ? 'border-blue-600' : 'border-gray-600'}`}
              >
                <img className="w-10 h-10" src={gameDataProp.awayTeamLogo} />
              </div>
              <div className="text-xl font-medium text-gray-700">
                {gameDataProp.awayTeamName}
              </div>
            </span>
            <div className="flex items-center">
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.awayTeamScore}
            </div>

            <div className="flex items-center">
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.homeTeamScore}
            </div>
            <span className="flex flex-col items-center gap-2">
              <div
                className={`border-2 rounded-full p-2 ${gameDataProp.homeTeamName === 'Toronto Blue Jays' ? 'border-blue-600' : 'border-gray-600'}`}
              >
                <img className="w-10 h-10" src={gameDataProp.homeTeamLogo} />
              </div>
              <div className="text-xl font-medium text-gray-700">
                {gameDataProp.homeTeamName}
              </div>
            </span>
          </div>
          <div className="text-center flex flex-col">
            {/* Current Inning Display / Start Time Display */}
            <div className="text-medium text-gray-600 pt-4">
              {gameDataProp.abstractGameState !== 'Preview'
                ? gameDataProp.linescore?.inningState.slice(0, 3) +
                  ' ' +
                  gameDataProp.linescore?.currentInningOrdinal
                : formatTimeForDisplayUtil(gameDataProp.startTime)}
            </div>
            <div className="text-medium text-gray-600">
              {gameDataProp.gameVenue}
            </div>

            {/* Probable Pitchers Display */}
            {gameDataProp.abstractGameState === 'Preview' &&
              gameDataProp.probablePitchers && (
                <span className="text-left pl-10">
                  {gameDataProp.probablePitchers?.away.fullName} vs.{' '}
                  {gameDataProp.probablePitchers?.home.fullName}
                </span>
              )}
          </div>
        </div>

        {/* Game Final - Decisions Pitchers Display  */}
        {gameDataProp.abstractGameState === 'Final' && (
          <div className="flex flex-row p-10  ">
            <div>
              <StatCard
                statName={awayWon ? 'Win' : 'Loss'}
                playerName={gameDataProp.decisions?.winner.fullName}
                playerID={gameDataProp.decisions?.winner.id}
                statAbbreviation={awayWon ? 'W' : 'L'}
              />
            </div>
            <div>
              <StatCard
                statName={awayWon ? 'Loss' : 'Win'}
                playerName={gameDataProp.decisions?.loser.fullName}
                playerID={gameDataProp.decisions?.loser.id}
                statAbbreviation={awayWon ? 'L' : 'W'}
              />
            </div>
          </div>
        )}

        {/* Linescore Table */}
        {gameDataProp.abstractGameState !== 'Preview' && (
          <div className="hidden w-full mt-6 overflow-x-auto sm:block">
            <table className="w-full border-collapse border border-gray-100 text-sm">
              <thead>
                <tr>
                  <th className={headerCell}>Team</th>
                  {inningNumbers.map((n) => (
                    <th key={n} className={headerCell}>
                      {n}
                    </th>
                  ))}
                  <th className={headerCell}>R</th>
                  <th className={headerCell}>H</th>
                  <th className={headerCell}>E</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ label, side, totals }) => (
                  <tr key={side}>
                    <td className={`${cell} font-bold text-center`}>
                      {teamAbbreviator(label)}
                    </td>
                    {inningNumbers.map((n) => (
                      <td key={n} className={`${cell} font-medium`}>
                        {inningMap[n]?.[side].runs ?? '-'}
                      </td>
                    ))}
                    <td className={`${cell} font-semibold`}>
                      {totals?.runs ?? '-'}
                    </td>
                    <td className={`${cell} font-semibold`}>
                      {totals?.hits ?? '-'}
                    </td>
                    <td className={`${cell} font-semibold`}>
                      {totals?.errors ?? '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroGameCard;
