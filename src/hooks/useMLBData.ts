import React, { useEffect, useState } from 'react';
import type { ALRecords } from '../types/models/standings.model';
import type { Game, Season } from '../types/models/game.model';
import type { Player } from '../types/models/person.model';
import {
  fetchALTeamRecords,
  fetchHeroGameData,
  fetchRosterData,
  fetchSchedule,
  fetchSeasonData,
} from '../services/apiService';

export function useMLBData() {
  const [standingsData, setStandingsData] = useState<ALRecords[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);
  const [heroGameData, setHeroGameData] = useState<Game | null>(null);
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [season, standings, players] = await Promise.all([
          fetchSeasonData(),
          fetchALTeamRecords(),
          fetchRosterData(),
        ]);

        setSeasonData(season);
        setStandingsData(standings);
        setPlayerData(players);

        const schedule = await fetchSchedule(season);
        setScheduleData(schedule);

        const heroGame = await fetchHeroGameData(schedule);
        setHeroGameData(heroGame);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  return {
    standingsData,
    seasonData,
    scheduleData,
    heroGameData,
    playerData,
    isLoading,
    error,
  };
}
