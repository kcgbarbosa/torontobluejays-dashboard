import { useContext } from 'react';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { getGameResult } from '../utils/gameResultUtils';
import {
  AppStatusContext,
  HeroGameContext,
  ScheduleContext,
} from '../store/contexts';
import WinLossBadge from './WinLossBadge';
import {
  isGameInPast,
  formatDateForDisplayShortUtil,
} from '../utils/dateAndTimeUtilities';

function PastGameResultsCard() {
  const schedulePreviewData = useContext(ScheduleContext);
  const heroGameData = useContext(HeroGameContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const pastGames = schedulePreviewData
    .filter(
      (d) => isGameInPast(d) === true && d.gamePk !== heroGameData?.gamePk
    )
    .reverse()
    .slice(0, 7);

  return (
    <div>
      {/* # TODO STYLE [June 8] Reduce footprint */}
      <h2 className="text-base font-semibold text-gray-900 py-4">
        Past Results
      </h2>
      <div>
        {pastGames.map((d) => {
          const { bjWon, scoresAvailable, awayWon } = getGameResult(d);

          return (
            <div
              key={d.keyID}
              className={`bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-3 flex flex-col border-l-4
                ${bjWon ? 'border-l-blue-600' : 'border-l-gray-200'}`}
            >
              <div className="flex relative items-center justify-between ">
                <div className="flex items-center gap-2">
                  <img
                    src={d.awayTeamLogo}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {teamAbbreviator(d.awayTeamName)}
                  </span>
                </div>

                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                  <span
                    className={`text-xl font-bold ${awayWon ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {d.awayTeamScore ?? '–'}
                  </span>
                  <span className="text-gray-300 text-sm">–</span>
                  <span
                    className={`text-xl font-bold pr-2 ${!awayWon && scoresAvailable ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {d.homeTeamScore ?? '–'}
                  </span>
                  {scoresAvailable && <WinLossBadge won={bjWon} />}
                  <span className="hidden sm:inline text-xs text-gray-400 pl-1">
                    {formatDateForDisplayShortUtil(d.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {teamAbbreviator(d.homeTeamName)}
                  </span>
                  <img
                    src={d.homeTeamLogo}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PastGameResultsCard;
