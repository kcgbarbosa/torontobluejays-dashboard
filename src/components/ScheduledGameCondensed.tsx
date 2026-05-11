import React from 'react';
import type { Game } from '../types/models/game.model';
import { teamAbbreviator } from '../utils/teamAbbreviator';

type ScheduledGameProps = {
  scheduledGameDataProp: Game[];
};

function ScheduledGameDetailed({ scheduledGameDataProp }: ScheduledGameProps) {
  return (
    <main id="component-container">
      <header className="pl-3">Upcoming Games</header>
      {scheduledGameDataProp.map((d) => (
        <section key={d.gameID} className="py-4 my-2 border-2 rounded-2xl">
          <div className="flex pl-3">
            <img src={d.awayTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">{teamAbbreviator(d.awayTeamName)}</div>
            <div>@</div>
            <div className="pr-1">{teamAbbreviator(d.homeTeamName)}</div>
            <img src={d.homeTeamLogo} className="px-1 size-12"></img>
            <div className="pr-1">12:00</div>
            <div> {d.date.toLocaleDateString()}</div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default ScheduledGameDetailed;
