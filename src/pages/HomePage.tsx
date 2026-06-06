/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import GameCard from '../components/GameCard';
import ALEastStandings from '../components/ALEastStandings';
import StatCard from '../components/StatCard';
import PastGameResultsCard from '../components/PastGameResultsCard';
import { useContext } from 'react';
import { HeroGameContext, PlayerContext } from '../store/contexts';
import { getStatLeader } from '../utils/statisticUtilities';

function HomePage() {
  const heroGame = useContext(HeroGameContext);
  const playerData = useContext(PlayerContext);

  const homeRunLeader = getStatLeader(
    playerData,
    (d) => d.hitting?.homeRuns ?? -1
  );

  const hitsLeader = getStatLeader(playerData, (d) => d.hitting?.hits ?? -1);

  const opsLeader = getStatLeader(playerData, (d) =>
    parseFloat(d.hitting?.ops ?? '-1')
  );

  return (
    <div id="page-container" className="bg-gray-50 min-h-screen w-full p-4">
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div>
            <GameCard gameDataProp={heroGame} />
          </div>
          <div>
            <PastGameResultsCard />
          </div>
        </div>

        <section className="lg:col-span-1">
          <div>
            <ALEastStandings />
          </div>
          <div>
            <StatCard
              statName="Home Run Leader"
              playerName={homeRunLeader?.fullName}
              playerID={homeRunLeader?.id}
              statValue={homeRunLeader?.hitting?.homeRuns}
              jerseyNumber={homeRunLeader?.jerseyNumber}
              positionAbbreviation={homeRunLeader?.positionAbbreviation}
              statAbbreviation="HR"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
export default HomePage;
