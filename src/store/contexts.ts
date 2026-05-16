import { createContext } from 'react';
import type { Game } from '../types/models/game.model';
import type { ALRecords } from '../types/models/standings.model';
import type { Player } from '../types/models/person.model';

export const AppStatusContext = createContext({
  isLoading: true,
  error: null as string | null,
});
export const RecentGameContext = createContext<Game[]>([]);
export const StandingsContext = createContext<ALRecords[]>([]);
export const ScheduleContext = createContext<Game[]>([]);
export const PlayerContext = createContext<Player[]>([]);
