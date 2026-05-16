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

  return (
    <div>
      <h1>AL Standings</h1>
      {standingsData.map((d) => (
        <div key={d.teamName}>
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
