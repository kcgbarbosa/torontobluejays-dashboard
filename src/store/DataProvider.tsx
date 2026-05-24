import { useEffect, useState, type ReactNode } from 'react';
import type { Game, Season } from '../types/models/game.model';
import type { Player } from '../types/models/person.model';
import type { ALRecords } from '../types/models/standings.model';

import {
  fetchRecentGame,
  fetchSeasonData,
  fetchSchedule,
  fetchALTeamRecords,
  fetchRosterData,
  fetchNextGame,
} from '../services/apiService';
import {
  AppStatusContext,
  NextGameContext,
  PlayerContext,
  RecentGameContext,
  ScheduleContext,
  StandingsContext,
} from './contexts';
import {
  getNextGameDateUtil,
  getRecentGameDateUtil,
} from '../utils/dateAndTimeUtilities';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [recentGameData, setRecentGameData] = useState<Game | null>(null);
  const [nextGameData, setNextGameData] = useState<Game | null>(null);
  const [standingsData, setStandingsData] = useState<ALRecords[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // #TODO-FEAT [May 14] : Improve performance while still maintaining correct order of operations
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const season = await fetchSeasonData();
        setSeasonData(season);

        const schedule = await fetchSchedule(season);
        setScheduleData(schedule);

        const recentGameDate = await getRecentGameDateUtil(schedule);
        const recentGame = await fetchRecentGame(recentGameDate);
        setRecentGameData(recentGame as Game | null);

        const nextGameData = await getNextGameDateUtil(schedule);
        const nextGame = await fetchNextGame(nextGameData);
        setNextGameData(nextGame as Game | null);

        const standings = await fetchALTeamRecords();
        setStandingsData(standings);

        const players = await fetchRosterData();
        setPlayerData(players);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <AppStatusContext.Provider value={{ isLoading, error }}>
      <ScheduleContext.Provider value={scheduleData}>
        <RecentGameContext.Provider value={recentGameData}>
          <NextGameContext value={nextGameData}>
            <StandingsContext.Provider value={standingsData}>
              <PlayerContext.Provider value={playerData}>
                {children}
              </PlayerContext.Provider>
            </StandingsContext.Provider>
          </NextGameContext>
        </RecentGameContext.Provider>
      </ScheduleContext.Provider>
    </AppStatusContext.Provider>
  );
};
