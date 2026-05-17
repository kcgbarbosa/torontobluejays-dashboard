import React, { useContext } from 'react';
import { AppStatusContext, ScheduleContext } from '../store/contexts';

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table className="w-full text-xl">
      <thead>
        <tr>
          <td className="px-10"> Date</td>
          <td> Start Time</td>
          <td> Teams</td>
          <td> Venue</td>
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((d) => (
          <tr key={d.gameID} className=" border border-blue-300 ">
            <td className=" pl-10 py-10">{d.date.toLocaleDateString()}</td>
            <td>{d.startTime}</td>
            <td>
              {d.awayTeamName} @ {d.homeTeamName}
            </td>
            <td>{d.gameVenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleTable;
