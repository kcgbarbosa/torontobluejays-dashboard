import FeaturedGameCard from '../components/FeaturedGameCard';
import ALEastStandings from '../components/ALEastStandings';
import StatLeaderCard from '../components/StatLeaderCard';
import RecentResultsCard from '../components/RecentResultsCard';
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
            <FeaturedGameCard gameDataProp={heroGameData} />
          </div>
          <div>
            <RecentResultsCard />
          </div>
        </div>

        <section className="lg:col-span-1 flex flex-col gap-6">
          <div className="pb-4">
            <ALEastStandings />
          </div>
          <div>
            <StatLeaderCard
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
            <StatLeaderCard
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
            <StatLeaderCard
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
