import React from 'react';

import type { ALRecords } from '../types/models/standings.model';

type ALEastStandingsProps = {
  standingsDataProp: ALRecords[];
};

function ALEastStandings({ standingsDataProp }: ALEastStandingsProps) {
  return (
    <div>
      <h1>AL Standings</h1>
      {standingsDataProp.map((d) => (
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
