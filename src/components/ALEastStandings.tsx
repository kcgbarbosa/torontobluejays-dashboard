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
    <div>
      <h1 className="text-2xl">AL East Standings</h1>
      {alEastTeams.map((d) => (
        <div key={d.keyID}>
          <>
            <span>
              {d.teamName}: {d.wins} - {d.losses}
            </span>
          </>
        </div>
      ))}
    </div>
  );
}

export default ALEastStandings;
