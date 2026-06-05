/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import GameCard from '../components/GameCard';
import ALEastStandings from '../components/ALEastStandings';
import PlayerCard from '../components/PlayerCard';
import PastGameResultsCard from '../components/PastGameResultsCard';
import { useContext } from 'react';
import { HeroGameContext } from '../store/contexts';

function HomePage() {
  const heroGame = useContext(HeroGameContext);

  return (
    <div id="page-container" className="bg-gray-50 min-h-screen w-full p-4">
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div >
            <GameCard gameDataProp={heroGame} />
          </div>
          <div >
            <PastGameResultsCard />
          </div>
        </div>

        <section className='lg:col-span-1'>
          <div>
            <ALEastStandings />
          </div>
          <div>
            <PlayerCard />
          </div>
        </section>
      </main>
    </div>
  );
}
export default HomePage;
