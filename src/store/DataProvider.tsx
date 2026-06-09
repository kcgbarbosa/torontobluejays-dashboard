import { useEffect, useState, type ReactNode } from 'react';
import type { Game, Season } from '../types/models/game.model';
import type { Player } from '../types/models/person.model';
import type { ALRecords } from '../types/models/standings.model';

import {
  fetchSeasonData,
  fetchSchedule,
  fetchALTeamRecords,
  fetchRosterData,
  fetchHeroGameData,
} from '../services/apiService';
import {
  AppStatusContext,
  PlayerContext,
  ScheduleContext,
  SeasonContext,
  StandingsContext,
} from './contexts';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [standingsData, setStandingsData] = useState<ALRecords[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);
  const [heroGameData, setHeroGameData] = useState<Game | null>();
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // # TODO FEAT [May 14] : Improve performance while still maintaining correct order of operations
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const season = await fetchSeasonData();
        setSeasonData(season);

        const schedule = await fetchSchedule(season);
        setScheduleData(schedule);

        const heroGame = await fetchHeroGameData(schedule);
        setHeroGameData(heroGame);

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
      <SeasonContext.Provider value={seasonData}>
        <ScheduleContext.Provider value={scheduleData}>
          <StandingsContext.Provider value={standingsData}>
            <PlayerContext.Provider value={playerData}>
              {children}
            </PlayerContext.Provider>
          </StandingsContext.Provider>
        </ScheduleContext.Provider>
      </SeasonContext.Provider>
    </AppStatusContext.Provider>
  );
};
