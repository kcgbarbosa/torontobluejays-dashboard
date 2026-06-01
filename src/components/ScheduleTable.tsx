import React, { useContext } from 'react';
import { AppStatusContext, ScheduleContext } from '../store/contexts';
import { formatTimeUtil } from '../utils/dateAndTimeUtilities';

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const { isLoading, error } = useContext(AppStatusContext);

  const futureGames = scheduleData.filter(
    (d) => new Date(d.date).getTime() > Date.now()
  );
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="page-container" className="max-w-11/12 mx-auto px-4 py-8">
      <div id="grid-layout" className="grid grid-cols-3 gap-4">
        <main className="col-span-2 gap-4 p-2 bg-white rounded-2xl shadow">
          <h1 className="border-b-2 border-gray-200 px-4 py-6 mb-2 ">
            <span className="flex gap-2">
              <button>Full Schedule</button>
              <button>By Month</button>
            </span>
          </h1>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <td className="p-4"> Date</td>
                <td className="p-4"> Matchup</td>
                <td className="p-4"> First Pitch</td>
              </tr>
            </thead>
            <tbody>
              {futureGames.map((d) => (
                <tr
                  key={d.gameID}
                  className="bg-white hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-4 py-4">{d.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex align-left gap-2">
                      <img className="size-6" src={d.awayTeamLogo} />
                      <span>{d.awayTeamName}</span>
                      <p>@</p>
                      <img className="size-6" src={d.homeTeamLogo} />
                      <span>{d.homeTeamName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{formatTimeUtil(d.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default ScheduleTable;
