/**
 * @components
 *
 * SchedulePreview: Displays upcoming games in a compact format, presents key details and invites user to visit schedule page for more info.
 *
 * #TODO [May 24] Update DTO's and modeling to include past game results
 */

import { useContext } from 'react';
import { teamAbbreviator } from '../utils/teamAbbreviator';
import { AppStatusContext, ScheduleContext } from '../store/contexts';

function SchedulePreview() {
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
    .reverse();

  return (
    <main id="component-container">
      <header className="pl-3">Past Games</header>
      {pastGames.map((d) => (
        <section key={d.keyID} className="py-4 my-2 border-2 rounded-2xl">
          <div className="flex pl-3">
            <img src={d.awayTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">{teamAbbreviator(d.awayTeamName)}</div>
            <div>@</div>
            <div className="pr-1">{teamAbbreviator(d.homeTeamName)}</div>
            <img src={d.homeTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">{d.startTime}</div>
            <div> {new Date(d.date).toLocaleDateString()}</div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default SchedulePreview;
