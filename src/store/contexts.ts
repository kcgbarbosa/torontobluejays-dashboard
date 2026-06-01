import { createContext } from 'react';
import type { Game, Season } from '../types/models/game.model';
import type { ALRecords } from '../types/models/standings.model';
import type { Player } from '../types/models/person.model';

export const AppStatusContext = createContext({
  isLoading: true,
  error: null as string | null,
});
export const RecentGameContext = createContext<Game | null>(null);
export const NextGameContext = createContext<Game | null>(null);
export const HeroGameContext = createContext<Game | null>(null);
export const StandingsContext = createContext<ALRecords[]>([]);
export const ScheduleContext = createContext<Game[]>([]);
export const PlayerContext = createContext<Player[]>([]);
export const SeasonContext = createContext<Season[]>([]);
