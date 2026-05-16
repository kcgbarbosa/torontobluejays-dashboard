/**
 * @components
 *
 * PlayerCard: Displays player headshot, aside their personal information.
 * Intention is to reuse this component in the Stat Leader cards
 * Also to be used in Player Info cards (which display when you select a player from the roster list)
 *
 *
 *
 */

import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

function PlayerCard() {
  const playerData = useContext(PlayerContext);
  const { isLoading, error } = useContext(AppStatusContext);

  {
    if (isLoading) return <div>Loading...</div>;
  }
  {
    if (error) return <div> Error : {error} </div>;
  }

  const vladdyTest = playerData.find((p) => p.id === 665489);

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
