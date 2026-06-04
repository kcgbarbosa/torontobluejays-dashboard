/**
 * @components
 *
 * PlayerStatCard: Reusable component used for player headshot, name and statistic display
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <h2 className="text-base font-semibold text-gray-900 pb-4">
        Vladdy Test v2
      </h2>
      <div className="flex items-center gap-4">
        <img
          src={`https://midfield.mlbstatic.com/v1/people/665489/spots/120`}
          className="size-20 rounded-lg object-contain bg-gray-50"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-900">
            {vladdyTest?.fullName}{' '}
            <span className="text-blue-600">#{vladdyTest?.jerseyNumber}</span>
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {vladdyTest?.positionAbbreviation}
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-gray-900">
              {vladdyTest?.hitting?.homeRuns}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              HR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
