import React from 'react';

function HomePage() {
  return (
    <div id="page-container">
      <header>
        <h3> Blue Jays Dashboard</h3>
      </header>
      <nav>
        <span> Home </span>
        <span> Schedule </span>
        <span> Roster </span>
      </nav>
      <main id="home-main" className="flex gap-4">
        <aside id="player-recent-stats" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          veritatis id ad rem minus, provident quisquam molestias fugit ut aut
          blanditiis, odio reprehenderit, quas in optio dignissimos impedit sint
          quod.
        </aside>
        <section id="recent-game" className="w-1/2 flex-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic incidunt
          veritatis quo! Distinctio fuga saepe totam? Voluptatem consequatur
          minima non rerum commodi molestiae dolor accusamus, quisquam animi
          possimus dolorum optio.
        </section>
        <aside id="upcoming-schedule" className="w-1/4 flex-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam
          facere similique a praesentium rem alias velit eveniet quos beatae
          molestias ut nemo consectetur omnis ratione, ipsum eligendi autem
          quis.
        </aside>
      </main>
    </div>
  );
}

export default HomePage;
