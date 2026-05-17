/**
 * @page
 * HomePage - Displays the main Toronto Blue Jays dashboard layout with various statistics *
 *
 */

import RecentGame from '../components/Game';
import ALEastStandings from '../components/ALEastStandings';
import PlayerCard from '../components/PlayerCard';
import SchedulePreviewPreview from '../components/SchedulePreview';

function HomePage() {
  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <main id="home-main" className="grid grid-cols-4 gap-5">
        <aside id="scheduled-games">
          <SchedulePreviewPreview />
        </aside>

        <section id="recent-game" className="col-span-2">
          {/* #TODO [May 9] Include the next upcoming game */}
          <RecentGame />
        </section>

        <aside id="player-stat-leaders" className="">
          <h1>Stats </h1>
          <div id="team-record">
            <h3>TEMP TEAM RECORD PLACEHOLDER</h3>
            <ALEastStandings />
          </div>
          <br />
          <section id="position-player-stat-leader">
            <PlayerCard />
          </section>
          <br />
        </aside>
      </main>
    </div>
  );
}

export default HomePage;
