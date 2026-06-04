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
    <div className="bg-white p-4 border rounded-2xl">
      <h1 className="text-xl font-bold pb-6">AL East Standings</h1>
      <div className="">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-base font-bold border-b-2 border-slate-500 ">
              <td className="pb-1">Team</td>
              <td className="pb-1">W</td>
              <td className="pb-1">L</td>
              <td className="pb-1">GB</td>
            </tr>
          </thead>
          <tbody>
            {alEastTeams.map((team) => (
              <tr>
                <td>{team.teamName}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{team.gamesBack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ALEastStandings;
