/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import React, { useEffect, useState } from 'react';

import type { Game, Season } from '../types/models/game.model';

import {
  fetchRecentGame,
  fetchSeasonData,
  fetchSchedule,
} from '../services/apiService';
import RecentGame from '../components/RecentGame';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recentGameData, setRecentGameData] = useState<Game[]>([]);
  const [seasonData, setSeasonData] = useState<Season[]>([]);
  const [scheduleData, setScheduleData] = useState<Game[]>([]);

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
        <aside id="upcoming-schedule" className="w-1/4 flex-auto">
          <div>
            <h3>Season Schedule</h3>
            <ul>
              {scheduleData.map((data) => (
                <li key={data.gameID}>
                  Date: {`${data.date}`} Game:
                  {` ${data.homeTeamName} vs. ${data.awayTeamName}`}{' '}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section id="recent-game" className="w-1/2 flex-auto">
          <RecentGame recentGameDataProp={recentGameData} />
        </section>

        <aside id="player-stat-leaders" className="w-1/4 flex-auto">
          <h1> STATS SECTION </h1>
          {/* #TODO create stat card component for different stat props */}
          {/* TEMP MOCK CARDS FOR STAT DECISIONS */}
          <br />

          <div id="team-record">
            <h3>TEMP TEAM RECORD PLACEHOLDER</h3>
          </div>
          <br />
          <div id="top-position-player">
            <h3>TEMP TOP POSITION PLAYER PLACEHOLDER</h3>
            <p>Will include best player based on WAR+</p>
            <p>Will also display a couple of their key stats</p>
          </div>
          <br />
          <div id="top-pitcher">
            <h3>TEMP TOP PITCHER PLACEHOLDER</h3>
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
