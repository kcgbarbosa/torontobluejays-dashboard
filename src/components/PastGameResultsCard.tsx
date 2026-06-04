/**
 * @components
 *
 * SchedulePreview: Displays upcoming games in a compact format, presents key details and invites user to visit schedule page for more info.
 *
 * # TODO [May 24] Update DTO's and modeling to include past game results
 */

import { useContext } from 'react';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { AppStatusContext, ScheduleContext } from '../store/contexts';

function PastGameResultsCard() {
  const schedulePreviewData = useContext(ScheduleContext);
  const { isLoading, error } = useContext(AppStatusContext);

  {
    if (isLoading) return <div>Loading...</div>;
  }
  {
    if (error) return <div> Error : {error} </div>;
  }

  const pastGames = schedulePreviewData
    .filter((d) => new Date(d.date).getTime() < Date.now())
    .reverse()
    .slice(0, 6);

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 py-4">Past Games</h2>
      <div className="flex flex-col gap-3">
        {pastGames.map((d) => (
          <div
            key={d.keyID}
            className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 text-sm text-gray-700"
          >
            <img src={d.awayTeamLogo} className="size-7 object-contain" />
            <span>{teamAbbreviator(d.awayTeamName)}</span>
            <span className="text-gray-400">@</span>
            <span>{teamAbbreviator(d.homeTeamName)}</span>
            <img src={d.homeTeamLogo} className="size-7 object-contain" />
            {/* #TODO [June 4] Need to add the game score results  */}
            <span className="ml-auto text-gray-400">
              {new Date(d.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastGameResultsCard;
