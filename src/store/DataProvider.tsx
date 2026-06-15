import type { ReactNode } from 'react';
import {
  AppStatusContext,
  HeroGameContext,
  PlayerContext,
  ScheduleContext,
  SeasonContext,
  StandingsContext,
} from './contexts';
import { useMLBData } from '../hooks/useMLBData';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const {
    standingsData,
    seasonData,
    scheduleData,
    heroGameData,
    playerData,
    isLoading,
    error,
  } = useMLBData();

  return (
    <AppStatusContext.Provider value={{ isLoading, error }}>
      <SeasonContext.Provider value={seasonData}>
        <ScheduleContext.Provider value={scheduleData}>
          <HeroGameContext.Provider value={heroGameData}>
            <StandingsContext.Provider value={standingsData}>
              <PlayerContext.Provider value={playerData}>
                {children}
              </PlayerContext.Provider>
            </StandingsContext.Provider>
          </HeroGameContext.Provider>
        </ScheduleContext.Provider>
      </SeasonContext.Provider>
    </AppStatusContext.Provider>
  );
};
