import { useContext } from 'react';
import { AppStatusContext, StandingsContext } from '../store/contexts';

function ALEastStandings() {
  const standingsData = useContext(StandingsContext);
  const { isLoading, error } = useContext(AppStatusContext);

  {
    if (isLoading) return <div>Loading...</div>;
  }
  {
    if (error) return <div> Error : {error} </div>;
  }

  const alEastTeams = standingsData.filter((team) => team.divisionId === 201);

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 pb-4">AL East Standings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <td className="pb-2">Team</td>
            <td className="pb-2">W</td>
            <td className="pb-2">L</td>
            <td className="pb-2">GB</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {alEastTeams.map((team) => (
            <tr key={team.keyID} className="text-sm text-gray-700">
              <td className="py-2">{team.teamName}</td>
              <td className="py-2">{team.wins}</td>
              <td className="py-2">{team.losses}</td>
              <td className="py-2">{team.gamesBack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ALEastStandings;
