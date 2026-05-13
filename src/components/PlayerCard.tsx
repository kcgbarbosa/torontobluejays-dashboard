/**
 * @components
 *
 * PlayerCard: Displays player headshot, aside their personal information.
 * Intention is to reuse this component in the Stat Leader cards
 * Also to be used in Player Info cards (which display when you select a player from the roster list)
 *
 * # TODO NOTE: [May 13] Roster data validity confirmed. Next step is lifting state to strengthen this components reusability
 *
 *
 */

import React from 'react';
import type { Player } from '../types/models/person.model';

type playerDataTypes = {
  playerDataProp: Player[];
};

function PlayerCard({ playerDataProp }: playerDataTypes) {
  const vladdyTest = playerDataProp.find((p) => p.id === 665489);
  return (
    <div>
      <div id="page-container" className="flex flex-col border-2 ">
        <div>
          <h3 className=""> Roster Data Testing TItle </h3>
        </div>
        <div className="flex">
          <img
            src={`https://midfield.mlbstatic.com/v1/people/665488/spots/120`}
            className="size-24"
          />
          <div className="flex flex-col">
            <span>
              {`${vladdyTest?.fullName} #${vladdyTest?.jerseyNumber},
              ${vladdyTest?.positionAbbreviation}`}
            </span>
            <h1 className="font-bold text-3xl">
              {vladdyTest?.hitting?.homeRuns}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
