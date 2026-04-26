import React from 'react';

import type { Game } from '../types/models/game.model';

type ScheduledGameProps = {
  scheduledGameDataProp: Game[];
};

function ScheduledGameDetailed({ scheduledGameDataProp }: ScheduledGameProps) {
  return (
    <main id="component-container">
      <header className="pl-3">Upcoming Games</header>
      {scheduledGameDataProp.map((d) => (
        <section className="flex pl-3">
          {/* #FIXME: placeholder data. also need abbreviation data and logo data from api, team names too long */}
          <div className="px-1">LOGO</div>
          <div className="pr-1">NYY</div>
          <div className="pr-1">@ LOGO</div>
          <div className="pr-1">TOR</div>
          <div className="pr-1">12:00</div>
          <div> March 5</div>
        </section>
      ))}
    </main>
  );
}

export default ScheduledGameDetailed;
