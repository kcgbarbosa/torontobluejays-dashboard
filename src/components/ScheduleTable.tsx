import { useContext, useMemo, useState } from 'react';
import {
  AppStatusContext,
  ScheduleContext,
  SeasonContext,
} from '../store/contexts';
import { PastGameTableRow } from './PastGameTableRow';
import FutureGameTableRow from './FutureGameTableRow';
import { isGameInPast } from '../utils/dateAndTimeUtilities';

type ScheduleFilterType =
  | 'Remaining Games'
  | 'Completed Games'
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
      return scheduleData.filter((d) => !isGameInPast(d));

    if (scheduleFilter === 'Completed Games')
      return regularSeasonStartDate && regularSeasonEndDate
        ? scheduleData.filter(
            (d) =>
              isGameInPast(d) &&
              d.date >= regularSeasonStartDate &&
              d.date <= regularSeasonEndDate
          )
        : [];

    if (scheduleFilter) {
      const startTime = new Date(
        seasonData[0][`${scheduleFilter}StartDate`]
      ).getTime();
      const endTime = new Date(
        seasonData[0][`${scheduleFilter}EndDate`]
      ).getTime();
      return scheduleData.filter((d) => {
        const gameTime = new Date(d.date).getTime();
        return gameTime >= startTime && gameTime <= endTime;
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

  const isCompleted =
    scheduleFilter !== 'Remaining Games' && (scheduleFilter as string) !== '';

  const filterBtnBase =
    'px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 cursor-pointer';
  const filterBtnActive = 'bg-amber-100 text-amber-900 hover:bg-amber-200';
  const filterBtnInactive =
    'text-amber-200 hover:text-white hover:bg-amber-700';

  return (
    <div className="sm:py-8 sm:px-4 sm:max-w-11/12 sm:mx-auto">
      <h1 className="hidden sm:block text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest px-4 sm:px-0">
        {new Date().getFullYear()} Schedule
      </h1>
      <div className="-mx-4 sm:mx-0 border-y sm:border border-gray-300 sm:rounded-xl overflow-hidden shadow-sm">
        <div className="bg-amber-800 px-4 py-3 flex items-center gap-2">
          <button
            className={`${filterBtnBase} ${scheduleFilter === 'Remaining Games' ? filterBtnActive : filterBtnInactive}`}
            onClick={() => handleSetScheduleFilter('Remaining Games')}
          >
            Remaining Games
          </button>
          <select
            className={`${filterBtnBase} ${isCompleted ? filterBtnActive : filterBtnInactive}`}
            value={scheduleFilter}
            onChange={(e) =>
              handleSetScheduleFilter(e.target.value as ScheduleFilterType)
            }
          >
            <option value="">View Season:</option>
            <option value="Completed Games">
              {new Date().getFullYear()} Completed Games
            </option>
            <option value="spring">
              {new Date().getFullYear()} Spring Training
            </option>
            <option value="postSeason">
              {new Date().getFullYear()} Postseason
            </option>
          </select>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
            {isCompleted ? (
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left sm:text-center">Result</th>
              </tr>
            ) : (
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left sm:text-center">Matchup</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  First Pitch
                </th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredGames.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-4 text-gray-400 text-sm"
                >
                  No games found.
                </td>
              </tr>
            ) : isCompleted ? (
              filteredGames.map((d) => (
                <PastGameTableRow key={d.keyID} gameData={d} />
              ))
            ) : (
              filteredGames.map((d) => (
                <FutureGameTableRow key={d.keyID} gameData={d} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleTable;
