import React from 'react';

import type { Game } from '../types/models/game.model';

type ScheduledGameProps = {
  scheduledGameDataProp: Game[];
};

function ScheduledGame({ scheduledGameDataProp }: ScheduledGameProps) {
  return (
    <div>
      <div>
        <h3>Season Schedule</h3>
        <ul>
          {scheduledGameDataProp.map((data) => (
            <li key={data.gameID}>
              Date: {`${data.date}`} Game:
              {` ${data.homeTeamName} vs. ${data.awayTeamName}`}{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ScheduledGame;
