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
            {gameDataProp.abstractGameState !== 'Preview' && (
              <div>Live 🔴 </div>
            )}
            <div className="pt-4">
              {formatDateForDisplayLongUtil(gameDataProp.date)}
            </div>
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
            <div>
              {gameDataProp.abstractGameState !== 'Preview'
                ? gameDataProp.linescore?.currentInning
                : formatTimeForDisplayUtil(gameDataProp.startTime)}
            </div>
            <div>{gameDataProp.gameVenue}</div>
            <div>{formatTimeForDisplayUtil(gameDataProp.startTime)}</div>
          </div>
        </div>

        {/* Game Final - Decisions Pitchers Display  */}
        {/* TEMPORARY COMMENT OUT FOR DEVELOPMENT. USE BELOW FOR DEPLOYMENT */}
        {gameDataProp.abstractGameState === 'Final' && (
          <div className="flex flex-row p-10  ">
            <div>
              <StatCard
                statName="Win"
                // #TODO FEAT [June 10] write logic to match the decision winner with the correct pitcher so that i can display the pitcher with all of the information displayed in the stat card.
                playerName={gameDataProp.decisions?.winner.fullName}
                playerID={gameDataProp.decisions?.winner.id}
                statAbbreviation="W"
              />
            </div>
            <div>
              <StatCard
                statName="Loss"
                // #TODO FEAT [June 10] write logic to match the decision loser with the correct pitcher so that i can display the pitcher with all of the information displayed in the stat card.
                playerName={gameDataProp.decisions?.loser.fullName}
                playerID={gameDataProp.decisions?.loser.id}
                statAbbreviation="L"
              />
            </div>
          </div>
        )}

        {/* Linescore Table */}
        {gameDataProp.abstractGameState !== 'Preview' && (
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
        )}
      </div>
    </>
  );
}

export default HeroGameCard;
