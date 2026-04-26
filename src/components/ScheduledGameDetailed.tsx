import React from 'react';

import type { Game } from '../types/models/game.model';

type ScheduledGameProps = {
  scheduledGameDataProp: Game[];
};

function ScheduledGameDetailed({ scheduledGameDataProp }: ScheduledGameProps) {
  return (
    //#FIXME [APR 26] issue with keys
    <main id="component-container">
      <header className="pl-3">Upcoming Games</header>
      {scheduledGameDataProp.map((d) => (
        <section>
          <div key={d.gameID} className="flex pl-3">
            {/* PLACEHOLDER DATA */}
            {/* #FIXME: need abbreviation data, team names too long */}
            <img src={d.awayTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">{d.awayTeamName}</div>
            <div>@</div>
            <img src={d.homeTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">{d.homeTeamName}</div>
            <div className="pr-1">12:00</div>
            <div> March 5</div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default ScheduledGameDetailed;
