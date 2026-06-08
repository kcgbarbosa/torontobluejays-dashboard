/**
 * @components
 *
 * SchedulePreview: Displays upcoming games in a compact format, presents key details and invites user to visit schedule page for more info.
 *
 */

import { useContext } from 'react';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { getGameResult } from '../utils/gameResultUtils';
import { AppStatusContext, ScheduleContext } from '../store/contexts';
import WinLossBadge from './WinLossBadge';
import {
  isGameInPast,
  formatDateForDisplayShortUtil,
} from '../utils/dateAndTimeUtilities';

function PastGameResultsCard() {
  const schedulePreviewData = useContext(ScheduleContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const pastGames = schedulePreviewData
    .filter((d) => isGameInPast(d) === true)
    .reverse()
    .slice(0, 4);

  return (
    <div>
      {/* # TODO STYLE [June 8] Reduce footprint */}
      <h2 className="text-base font-semibold text-gray-900 py-4">Past Games</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {pastGames.map((d) => {
          const { bjWon, scoresAvailable, awayWon } = getGameResult(d);

          return (
            <div
              key={d.keyID}
              className={`bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-6 flex flex-col gap-3 border-l-4 
                ${bjWon ? 'border-l-blue-600' : 'border-l-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={d.awayTeamLogo}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {teamAbbreviator(d.awayTeamName)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xl font-bold ${awayWon ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {d.awayTeamScore ?? '–'}
                  </span>
                  <span className="text-gray-300 text-sm">–</span>
                  <span
                    className={`text-xl font-bold ${!awayWon && scoresAvailable ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {d.homeTeamScore ?? '–'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {teamAbbreviator(d.homeTeamName)}
                  </span>
                  <img
                    src={d.homeTeamLogo}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                {scoresAvailable && <WinLossBadge won={bjWon} />}
                <span className="text-xs text-gray-400">
                  {formatDateForDisplayShortUtil(d.date)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PastGameResultsCard;
