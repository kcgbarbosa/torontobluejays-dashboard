import type { Game } from '../types/models/game.model';
import {
  formatTimeForDisplayUtil,
  formatDateForDisplayLongUtil,
} from '../utils/dateAndTimeUtilities';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import PitcherMatchupCard from './PitcherMatchupCard';
import type { Linescore } from '../types/models/linescore.model';
import { motion } from 'motion/react';

type GameDataProps = {
  gameDataProp: Game | null;
};

type LinescoreTableProps = {
  linescore: Linescore;
  awayTeamName: string;
  homeTeamName: string;
};

function LinescoreTable({
  linescore,
  awayTeamName,
  homeTeamName,
}: LinescoreTableProps) {
  const innings = linescore?.innings ?? [];
  const totalInnings = Math.max(9, innings.length);
  const inningNumbers = Array.from({ length: totalInnings }, (_, i) => i + 1);
  const inningMap: Record<number, (typeof innings)[0]> = {};
  innings.forEach((inn) => {
    inningMap[inn.num] = inn;
  });

  const cell = 'px-3 py-4 text-center text-sm border border-gray-100';
  const headerCell = `${cell} bg-white font-semibold text-gray-900 text-xs uppercase`;

  const rows = [
    {
      label: awayTeamName,
      side: 'away' as const,
      totals: linescore?.away,
    },
    {
      label: homeTeamName,
      side: 'home' as const,
      totals: linescore?.home,
    },
  ];
  return (
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
              <td className={`${cell} font-semibold`}>{totals?.runs ?? '-'}</td>
              <td className={`${cell} font-semibold`}>{totals?.hits ?? '-'}</td>
              <td className={`${cell} font-semibold`}>
                {totals?.errors ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OutsIndicator({ outs }: { outs: number }) {
  return (
    <div className="flex items-center gap-2 ">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`size-3 rounded-full ${i < outs ? 'bg-blue-600' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  );
}

function HeroGameCard({ gameDataProp }: GameDataProps) {
  if (!gameDataProp || !gameDataProp.date)
    return <div>No game data available</div>;

  return (
    <>
      {/* Card Container */}
      <motion.div
        className="w-full min-h-110 bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      >
        {/* Scoreboard Container */}
        <div className="w-full flex flex-col">
          {/* Date Status */}
          <span className="text-medium text-gray-600 flex justify-between pb-2">
            {gameDataProp.abstractGameState === 'Live' && (
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-base font-medium tracking-tight uppercase text-red-700 ">
                Live
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              </span>
            )}
            {formatDateForDisplayLongUtil(gameDataProp.date)}
          </span>
          {/* Names Logo Scores */}
          <div className="flex justify-center items-center gap-10 md:gap-20">
            <span className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`border-4 rounded-full p-2 ${gameDataProp.awayTeamName === 'Toronto Blue Jays' ? 'border-blue-600' : 'border-gray-600'}`}
              >
                <img
                  className="w-15 h-15 rounded-full"
                  src={gameDataProp.awayTeamLogo}
                />
              </div>
              <div className="hidden text-xl font-medium text-gray-700 md:block">
                {gameDataProp.awayTeamName}
              </div>
              <div className="text-xl font-medium text-gray-700 md:hidden">
                {teamAbbreviator(gameDataProp.awayTeamName)}
              </div>
            </span>
            <div className="w-8 pb-3 text-center text-7xl font-barlow-condensed md:text-8xl ">
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.awayTeamScore}
            </div>

            <div className="w-8 pb-2 text-center text-7xl font-barlow-condensed md:text-8xl ">
              {gameDataProp.abstractGameState === 'Preview'
                ? '-'
                : gameDataProp.homeTeamScore}
            </div>
            <span className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`border-4 rounded-full p-2 ${gameDataProp.homeTeamName === 'Toronto Blue Jays' ? 'border-blue-600' : 'border-gray-600'}`}
              >
                <img
                  className="w-15 h-15 rounded-full"
                  src={gameDataProp.homeTeamLogo}
                />
              </div>
              <div className="hidden text-xl font-medium text-gray-700 md:block">
                {gameDataProp.homeTeamName}
              </div>
              <div className="text-xl font-medium text-gray-700 md:hidden">
                {teamAbbreviator(gameDataProp.homeTeamName)}
              </div>
            </span>
          </div>
          {/* Inning StartTime Venue */}
          <div className="items-center flex flex-col">
            <div className="text-medium text-gray-600 pt-4">
              {gameDataProp.abstractGameState === 'Live' &&
                gameDataProp.linescore?.inningState.slice(0, 3) +
                  ' ' +
                  gameDataProp.linescore?.currentInningOrdinal}
              {gameDataProp.abstractGameState === 'Preview' &&
                formatTimeForDisplayUtil(gameDataProp.startTime)}
            </div>
            <div className="py-2">
              {/* future location for strikes-balls counter and runners-on-base-diagram  */}
              {gameDataProp.abstractGameState === 'Live' && (
                <OutsIndicator outs={gameDataProp.linescore?.outs ?? 0} />
              )}
              {gameDataProp.abstractGameState === 'Final' && (
                <h3 className="text-gray-700 font-extrabold">Final</h3>
              )}
            </div>
            <div className="text-medium text-gray-600">
              {gameDataProp.gameVenue}
            </div>
          </div>
        </div>
        {/* Pitcher Linescore Container */}
        <div className="w-full">
          {gameDataProp.abstractGameState === 'Preview' &&
            gameDataProp.probablePitchers && (
              <PitcherMatchupCard
                gameStatus={gameDataProp.abstractGameState}
                pitcherA={gameDataProp.probablePitchers.away}
                pitcherB={gameDataProp.probablePitchers.home}
              />
            )}
          {gameDataProp.abstractGameState !== 'Preview' &&
            gameDataProp.linescore && (
              <LinescoreTable
                linescore={gameDataProp.linescore}
                homeTeamName={gameDataProp.homeTeamName}
                awayTeamName={gameDataProp.awayTeamName}
              />
            )}
          {gameDataProp.decisions && (
            <PitcherMatchupCard
              gameStatus={gameDataProp.abstractGameState}
              pitcherA={gameDataProp.decisions.winner}
              pitcherB={gameDataProp.decisions.loser}
              pitcherC={gameDataProp.decisions.save}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}

export default HeroGameCard;
