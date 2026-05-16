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
} from '../services/apiService';
import {
  AppStatusContext,
  PlayerContext,
  RecentGameContext,
  ScheduleContext,
  StandingsContext,
} from './contexts';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [recentGameData, setRecentGameData] = useState<Game[]>([]);
  const [standingsData, setStandingsData] = useState<ALRecords[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // #FIXME [May 14] : Change to Promise.all implementation
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const recentGame = await fetchRecentGame();
        setRecentGameData(recentGame);
        const season = await fetchSeasonData();
        setSeasonData(season);
        const schedule = await fetchSchedule(season);
        setScheduleData(schedule);
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
      <RecentGameContext.Provider value={recentGameData}>
        <StandingsContext.Provider value={standingsData}>
          <ScheduleContext.Provider value={scheduleData}>
            <PlayerContext.Provider value={playerData}>
              {children}
            </PlayerContext.Provider>
          </ScheduleContext.Provider>
        </StandingsContext.Provider>
      </RecentGameContext.Provider>
    </AppStatusContext.Provider>
  );
};
