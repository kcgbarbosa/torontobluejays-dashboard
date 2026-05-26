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
import { HeroGameContext } from '../store/contexts';

function HomePage() {
  const heroGame = useContext(HeroGameContext);

  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <main id="home-main" className="grid gap-3 lg:grid-cols-4">
        <section id="hero-game" className="order-2 lg:order-1 lg:col-span-4">
          <GameCard gameDataProp={heroGame} />
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
