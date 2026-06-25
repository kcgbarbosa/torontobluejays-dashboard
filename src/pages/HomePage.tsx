import HeroGameCard from '../components/HeroGameCard';
import ALEastStandings from '../components/ALEastStandings';
import StatCard from '../components/StatCard';
import PastGameResultsCard from '../components/PastGameResultsCard';
import { useContext } from 'react';
import { PlayerContext, HeroGameContext } from '../store/contexts';
import { getStatLeader } from '../utils/statisticUtilities';

function HomePage() {
  const playerData = useContext(PlayerContext);
  const heroGameData = useContext(HeroGameContext);

  const homeRunLeader = getStatLeader(
    playerData,
    (d) => d.hitting?.homeRuns ?? -1
  );

  const hitLeader = getStatLeader(playerData, (d) => d.hitting?.hits ?? -1);

  const opsLeader = getStatLeader(playerData, (d) =>
    parseFloat(d.hitting?.ops ?? '-1')
  );

  return (
    <main className="bg-gray-50 min-h-screen w-full p-4 overflow-hidden">
      <h1 className="sr-only">Home Page</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div>
            <HeroGameCard gameDataProp={heroGameData} />
          </div>
          <div>
            <PastGameResultsCard />
          </div>
        </div>

        <section className="lg:col-span-1 flex flex-col gap-6">
          <div className="pb-4">
            <ALEastStandings />
          </div>
          <div>
            <StatCard
              statName="Home Runs"
              playerName={homeRunLeader?.fullName}
              playerID={homeRunLeader?.id}
              statValue={homeRunLeader?.hitting?.homeRuns}
              jerseyNumber={`#${homeRunLeader?.jerseyNumber}`}
              positionAbbreviation={homeRunLeader?.positionAbbreviation}
              statAbbreviation="HR"
            />
          </div>
          <div>
            <StatCard
              statName="Hits"
              playerName={hitLeader?.fullName}
              playerID={hitLeader?.id}
              statValue={hitLeader?.hitting?.hits}
              jerseyNumber={`#${hitLeader?.jerseyNumber}`}
              positionAbbreviation={hitLeader?.positionAbbreviation}
              statAbbreviation="H"
            />
          </div>
          <div>
            <StatCard
              statName="OPS"
              playerName={opsLeader?.fullName}
              playerID={opsLeader?.id}
              statValue={opsLeader?.hitting?.ops}
              jerseyNumber={`#${opsLeader?.jerseyNumber}`}
              positionAbbreviation={opsLeader?.positionAbbreviation}
              statAbbreviation="OPS"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
export default HomePage;
