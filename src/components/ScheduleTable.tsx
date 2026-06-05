import React, { useContext, useMemo, useState } from 'react';
import {
  AppStatusContext,
  ScheduleContext,
  SeasonContext,
} from '../store/contexts';
import { CURRENT_YEAR } from '../utils/dateAndTimeUtilities';
import { PastGameTableRow } from './PastGameTableRow';
import FutureGameTableRow from './FutureGameTableRow';

type ScheduleFilterType =
  | 'Remaining Games'
  | 'regularSeason'
  | 'spring'
  | 'postSeason';

function ScheduleTable() {
  const scheduleData = useContext(ScheduleContext);
  const seasonData = useContext(SeasonContext);
  const { isLoading, error } = useContext(AppStatusContext);
  const [scheduleFilter, setScheduleFilter] =
    useState<ScheduleFilterType>('Remaining Games');
  const handleSetScheduleFilter = (filter: ScheduleFilterType) => {
    setScheduleFilter(filter);
  };

  const regularSeasonStartDate = seasonData[0]?.regularSeasonStartDate ?? '';
  const regularSeasonEndDate = seasonData[0]?.regularSeasonEndDate ?? '';

  const filteredGames = useMemo(() => {
    if (scheduleFilter === 'Remaining Games')
      return scheduleData.filter((d) => {
        const gameDate = new Date(d.date).getTime();
        return (
          gameDate > Date.now() &&
          gameDate <= new Date(regularSeasonEndDate).getTime()
        );
      });

    if (scheduleFilter) {
      return scheduleData.filter((d) => {
        const gameDate = new Date(d.date).getTime();
        return (
          gameDate >=
            new Date(seasonData[0][`${scheduleFilter}StartDate`]).getTime() &&
          gameDate <=
            new Date(seasonData[0][`${scheduleFilter}EndDate`]).getTime()
        );
      });
    }
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
        <main className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 px-4 py-4 flex items-center gap-2">
            {/* # FIXME [June 2] when user switches to 'Remaining Games', the table is adding a game from april 3rd between blue jays and white sox, duplicates every time you switch back and forth */}
            <button
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                scheduleFilter === 'Remaining Games'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleSetScheduleFilter('Remaining Games')}
            >
              Remaining Games
            </button>
            <select
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                scheduleFilter !== 'Remaining Games' && scheduleFilter !== null
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              value={scheduleFilter}
              onChange={(e) =>
                handleSetScheduleFilter(e.target.value as ScheduleFilterType)
              }
            >
              <option value="">Select Season:</option>
              <option value="regularSeason">
                {CURRENT_YEAR} Regular Season
              </option>
              <option value="spring">{CURRENT_YEAR} Spring Training</option>
              <option value="postSeason">{CURRENT_YEAR} Postseason</option>
            </select>
          </div>
          <table className="w-full border-collapse">
            <thead>
              {scheduleFilter !== 'Remaining Games' &&
              scheduleFilter !== null ? (
                <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <td className="px-6 py-3">Date</td>
                  <td className="px-6 py-3">Result</td>
                </tr>
              ) : (
                <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <td className="px-6 py-3">Date</td>
                  <td className="px-6 py-3">Matchup</td>
                  <td className="px-6 py-3">First Pitch</td>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredGames.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    No games found for the selected filter.
                  </td>
                </tr>
              ) : scheduleFilter !== 'Remaining Games' &&
                scheduleFilter !== null ? (
                filteredGames.map((d) => <PastGameTableRow gameData={d} />)
              ) : (
                filteredGames.map((d) => <FutureGameTableRow gameData={d} />)
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default ScheduleTable;
