import { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import type { Game } from '../types/models/game.model';
import {
  formatTimeForDisplayUtil,
  formatDateForDisplayLongUtil,
} from '../utils/dateAndTimeUtilities';
import StatCard from './StatCard';

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

  const cell = 'border border-gray-200 px-3 py-2 text-center text-sm';
  const headerCell = `${cell} bg-gray-50 font-semibold text-gray-500 text-xs uppercase`;

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

  return (
    <>
      <div className="w-full min-h-110 bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center">
        {/* Game Preview - Game Info Placeholder */}
        <div id="game-preview">
          <div className="text-center pb-6">
            <div>{formatDateForDisplayLongUtil(gameDataProp.date)}</div>
          </div>
          <div
            id="game-main-details"
            className="
            flex justify-center
            gap-20
          "
          >
            <span className="flex">
              <img
                className="size-10 object-contain"
                src={gameDataProp.awayTeamLogo}
              />
              <div>{gameDataProp.awayTeamName}</div>
            </span>
            <div>
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.awayTeamScore}
            </div>

            <div>
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.homeTeamScore}
            </div>
            <span className="flex">
              <div>{gameDataProp.homeTeamName}</div>
              <img
                className="size-10 object-contain"
                src={gameDataProp.homeTeamLogo}
              />
            </span>
          </div>
          <div className="text-center flex flex-col">
            <div>{gameDataProp.gameVenue}</div>
            <div>{formatTimeForDisplayUtil(gameDataProp.startTime)}</div>
          </div>
        </div>

        {/* Game Preview - Probable Pitchers Matchup Display  */}
        {/* TEMPORARY COMMENT OUT FOR DEVELOPMENT. USE BELOW FOR DEPLOYMENT */}
        {/* {gameDataProp.abstractGameState === 'Preview' && ( */}
        {gameDataProp.abstractGameState === 'Live' && (
          <div className="flex flex-row p-10  ">
            <div>
              <StatCard
                playerName={gameDataProp.probablePitchers?.away.fullName}
                playerID={gameDataProp.probablePitchers?.away.id}
                statAbbreviation="SP"
              />
            </div>
            <div>
              <StatCard
                playerName={gameDataProp.probablePitchers?.home.fullName}
                playerID={gameDataProp.probablePitchers?.home.id}
                statAbbreviation="SP"
              />
            </div>
          </div>
        )}

        {/* Linescore Table */}
        <div className="w-full mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
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
                  <td className={`${cell} font-medium text-left`}>{label}</td>
                  {inningNumbers.map((n) => (
                    <td key={n} className={cell}>
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
      </div>
    </>
  );
}

export default HeroGameCard;
