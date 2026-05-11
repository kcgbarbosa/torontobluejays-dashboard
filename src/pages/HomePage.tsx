/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import React, { useEffect, useState } from 'react';

import type { Game, Season } from '../types/models/game.model';
import type { ALRecords } from '../types/models/standings.model';

import {
  fetchRecentGame,
  fetchSeasonData,
  fetchSchedule,
  fetchALTeamRecords,
} from '../services/apiService';
import RecentGame from '../components/Game';
import ScheduledGameDetailed from '../components/ScheduledGameCondensed';
import ALEastStandings from '../components/ALEastStandings';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recentGameData, setRecentGameData] = useState<Game[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);
  const [standingsData, setStandingsData] = useState<ALRecords[]>([]);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div id="page-container">
      <header className="flex justify-center gap-20 pt-5">
        <h3> Blue Jays Dashboard</h3>
      </header>
      <nav className="flex justify-center gap-20 py-4">
        <span> Home </span>
        <span> Schedule </span>
        <span> Roster </span>
      </nav>
      <main id="home-main" className="flex gap-4">
        <aside id="scheduled-games" className="w-1/8 flex-auto">
          <ScheduledGameDetailed scheduledGameDataProp={scheduleData} />
        </aside>

        <section id="recent-game" className="w-1/2 flex-auto">
          {/* #TODO [May 9] Include the next upcoming game */}
          <RecentGame recentGameDataProp={recentGameData} />
        </section>

        <aside id="player-stat-leaders" className="w-1/6 flex-auto">
          <h1>Stats </h1>
          <div id="team-record">
            <h3>TEMP TEAM RECORD PLACEHOLDER</h3>
            <ALEastStandings standingsDataProp={standingsData} />
          </div>
          <br />
          <div id="position-stat-leader">
            <h3>POSITION PLAYER STAT LEADER PLACEHOLDER</h3>
            <p>Will include best player based on WAR+</p>
            <p>Will also display a couple of their key stats</p>
          </div>
          <br />
          <div id="pitcher-stat-leader">
            <h3>PITCHER PLAYER STAT LEADER PLACEHOLDER</h3>
            <p>Will include best pitcher based on WAR+</p>
            <p>Will also display a couple of their key stats</p>
          </div>
          <br />
        </aside>
      </main>
    </div>
  );
}

export default HomePage;
