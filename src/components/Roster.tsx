/**
 * @components
 *
 * Roster: Displays each player on the blue jays roster and their basic information.
 *
 */

import { useContext, useState } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';
import PlayerInfoModal from './PlayerInfoModal';

function Roster() {
  const playerData = useContext(PlayerContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const [playerViewID, setPlayerViewID] = useState(Number);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <>
        <PlayerInfoModal playerIDProp={playerViewID} />
        {playerData.length === 0 ? (
          <div>No roster data available.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-blue-50 tracking-wide uppercase ">
              <tr>
                <th className="text-left px-4 py-4">Player</th>
                <th className="text-left px-4 py-4">Position</th>
                <th className="text-left px-4 py-4">B/T</th>
                <th className="text-left px-4 py-4">Age</th>
                <th className="text-left px-4 py-4">HT</th>
                <th className="text-left px-4 py-4">Wt</th>
                <th className="text-left px-4 py-4">DOB</th>
                <th className="text-left px-4 py-4">Place of Birth</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {playerData.map((player) => {
                const placeOfBirthParts = [
                  player.birthCity,
                  player.birthStateProvince,
                  player.birthCountry,
                ].filter(Boolean);
                const placeOfBirth = placeOfBirthParts.join(', ');

                return (
                  <tr key={player.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div
                        className="flex items-center gap-3"
                        // playerID for filtering to populate modal with selected players info
                        onClick={() => setPlayerViewID(player.id)}
                      >
                        <img
                          src={player.imageUrl}
                          alt={player.fullName}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <div>{player.fullName}</div>
                          <div className="text-sm text-slate-500">
                            #{player.jerseyNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{player.positionAbbreviation}</td>
                    <td className="px-4 py-4">
                      {player.batSideCode}/{player.pitchHandCode}
                    </td>
                    <td className="px-4 py-4">{player.currentAge}</td>
                    <td className="px-4 py-4">{player.height}</td>
                    <td className="px-4 py-4">{player.weight}lbs</td>
                    <td className="px-4 py-4">{player.birthDate}</td>
                    <td className="px-4 py-4">{placeOfBirth || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    </div>
  );
}

export default Roster;
