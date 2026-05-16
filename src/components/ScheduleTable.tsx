import React, { useContext } from 'react';
import { AppStatusContext, ScheduleContext } from '../store/contexts';

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table>
      <tbody>
        {scheduleData.map((d) => (
          <tr key={d.gameID}>
            <td>{d.date.toLocaleDateString()}</td>
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
