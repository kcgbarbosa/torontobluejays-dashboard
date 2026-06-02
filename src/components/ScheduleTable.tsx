import React, { useContext, useMemo, useState } from 'react';
import {
  AppStatusContext,
  ScheduleContext,
  SeasonContext,
} from '../store/contexts';
import { formatTimeUtil } from '../utils/dateAndTimeUtilities';

// #FIXME: [June 1] - This component uses seasonStart and endDates to filter the schedule data. I need to update the SeasonDTO to include all of the dates for  regular season games vs pre season games vs playoffs, ect. Will also require i updated the Model.

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const seasonData = useContext(SeasonContext);
  const { isLoading, error } = useContext(AppStatusContext);
  const [scheduleFilter, setScheduleFilter] = useState('Remaining Games');
  const handleSetScheduleFilter = (filter: string) => {
    setScheduleFilter(filter);
  };

  const regularSeasonStartDate = seasonData[0]?.regularSeasonStartDate ?? '';
  const regularSeasonEndDate = seasonData[0]?.regularSeasonEndDate ?? '';

  // #TODO [Jun 2] seperate button for Remaining games, then a seperate dropdown with options for Spring Training, Regular Season, Playoffs. Then we can use the new dates to filter accordingly.

  const filteredGames = useMemo(() => {
    if (scheduleFilter === 'Remaining Games')
      return scheduleData.filter((d) => {
        const gameDate = new Date(d.date).getTime();
        return (
          gameDate > Date.now() &&
          gameDate <= new Date(regularSeasonEndDate).getTime()
        );
      });
    if (scheduleFilter === 'Regular Season')
      return scheduleData.filter((d) => {
        const gameDate = new Date(d.date).getTime();
        return (
          gameDate >= new Date(regularSeasonStartDate).getTime() &&
          gameDate <= new Date(regularSeasonEndDate).getTime()
        );
      });
    return scheduleData;
  }, [
    scheduleFilter,
    scheduleData,
    regularSeasonStartDate,
    regularSeasonEndDate,
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="page-container" className="max-w-11/12 mx-auto px-4 py-8">
      <div id="grid-layout" className="grid grid-cols-3 gap-4">
        <main className="col-span-2 gap-4 p-2 bg-white rounded-2xl shadow">
          <h1 className="border-b-2 border-gray-200 px-4 py-6 mb-2 ">
            {/* #TODO: [June 1] implement conditional styling, display which one is toggled, add required info for past games to table */}
            {/* #FIXME: [June 2] when user switches to 'Remaining Games', the table is adding a game from april 3rd between blue jays and white sox, duplicates every time you switch back and forth */}
            <span className="inline-block gap-2 border-2 rounded-full">
              <button
                className="p-2 m-2 hover:bg-gray-100 transition-colors duration-100"
                onClick={() => handleSetScheduleFilter('Remaining Games')}
              >
                Remaining Games
              </button>
              <button
                className="p-2 m-2  hover:bg-gray-100 transition-colors duration-100"
                onClick={() => handleSetScheduleFilter('All Season Games')}
              >
                Complete Season Schedule
              </button>
            </span>
          </h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="hover:bg-gray-100 transition-colors duration-200">
                <td className="p-4"> Date</td>
                <td className="p-4"> Matchup</td>
                <td className="p-4"> First Pitch</td>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((d) => (
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
