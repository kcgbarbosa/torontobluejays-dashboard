/**
 * @components
 *
 * Roster: Displays each player on the blue jays roster and their basic information.
 *
 */

import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

type RosterProps = {
  onSelectPlayer: (id: number) => void;
};

function Roster({ onSelectPlayer }: RosterProps) {
  const playerData = useContext(PlayerContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-widest">
        Current Roster
      </h1>
      {playerData.length === 0 ? (
        <div>No roster data available.</div>
      ) : (
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-blue-600 text-white tracking-wide uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-3">Player</th>
                <th className="text-left px-4 py-3">Position</th>
                <th className="text-left px-4 py-3">B/T</th>
                <th className="text-left px-4 py-3">Age</th>
                <th className="text-left px-4 py-3">HT</th>
                <th className="text-left px-4 py-3">Wt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {playerData.map((player) => {
                return (
                  <tr
                    key={player.id}
                    className="hover:bg-blue-50 transition-colors duration-150"
                    onClick={() => onSelectPlayer(player.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 hover:cursor-pointer">
                        <img
                          src={player.imageUrl}
                          alt={player.fullName}
                          className="h-8 w-8 rounded-full object-cover bg-gray-100"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {player.fullName}
                          </div>
                          <div className="text-xs text-blue-400">
                            #{player.jerseyNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {player.positionName} / {player.positionAbbreviation}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {player.batSideCode}/{player.pitchHandCode}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {player.currentAge}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {player.height}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {player.weight} lbs
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Roster;
