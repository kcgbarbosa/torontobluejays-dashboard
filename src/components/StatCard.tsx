/**
 * @components
 *
 * HomePage: Website landing page, includes live game info, recent game results, team standings and various statistics
 *
 */

import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';
import { getStatLeader } from '../utils/statisticUtilities';

type StatCardProps = {
  statName: string | undefined;
  playerName: string | undefined;
  playerID: number | undefined;
  statValue: number | undefined;
  jerseyNumber?: string | undefined;
  positionAbbreviation?: string;
  statAbbreviation?: string;
};

function StatCard({
  statName,
  playerName,
  playerID,
  statValue,
  jerseyNumber,
  positionAbbreviation,
  statAbbreviation,
}: StatCardProps) {
  const { isLoading, error } = useContext(AppStatusContext);

  {
    if (isLoading) return <div>Loading...</div>;
  }
  {
    if (error) return <div> Error : {error} </div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <h2 className="text-base font-semibold text-gray-900 pb-4">{statName}</h2>
      <div className="flex items-center gap-4">
        <img
          src={`https://midfield.mlbstatic.com/v1/people/${playerID}/spots/120`}
          className="size-20 rounded-lg object-contain bg-gray-50"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-xwsemibold text-gray-900">
            {playerName}
            <span className="text-blue-600"> #{jerseyNumber}</span>
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {positionAbbreviation}
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-gray-900">
              {statValue}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {statAbbreviation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
