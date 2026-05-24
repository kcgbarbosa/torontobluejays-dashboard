/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import GameCard from '../components/GameCard';
import ALEastStandings from '../components/ALEastStandings';
import PlayerCard from '../components/PlayerCard';
import SchedulePreview from '../components/SchedulePreview';
import { useContext } from 'react';
import { NextGameContext, RecentGameContext } from '../store/contexts';

function HomePage() {
  const nextGame = useContext(NextGameContext);
  const recentGame = useContext(RecentGameContext);

  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <main id="home-main" className="grid gap-3 lg:grid-cols-4">
        <section id="hero-games" className="order-2 lg:order-1 lg:col-span-4">
          Next Game
          <GameCard gameDataProp={nextGame} />
          Recent Game
          {/* #FIXME [May 24] recent game should adjust its display if the game is today versus yesterday vs  "Live". Implementation ideas include: 
          1. implement by leveraging the GUMBO API, 
          2. examine gameId for a gameLive (or similarly named) boolean, 
          3. changing website to display "Todays Game" instead of "Recent Game" */}
          <GameCard gameDataProp={recentGame} />
        </section>

        <aside
          id="scheduled-games"
          className="order-1 lg:order-2 lg:col-span-1"
        >
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col">
            <SchedulePreview />
          </div>
        </aside>

        <aside id="player-stat-leaders" className="order-3 lg:col-span-3">
          <div id="team-record">
            <ALEastStandings />
          </div>
          <section id="position-player-stat-leader">
            <PlayerCard />
          </section>
        </aside>
      </main>
    </div>
  );
}
export default HomePage;
