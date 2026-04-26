/**
 * @component
 * RecentGame: Displays most recent completed Blue Jays game. Includes various key statistics and general game information.
 *
 * #TODO [N/A] Implement dynamic determination of most recent game (may require GamePK or date logic)
 *
 */

import type { Game } from '../types/models/game.model';

type RecentGameProps = {
  recentGameDataProp: Game[];
};

function RecentGame({ recentGameDataProp }: RecentGameProps) {
  return (
    <div
      id="recent-game-scoreboard"
      className="
        flex justify-center 
        p-30 
        border-4
      "
    >
      {recentGameDataProp.map((data) => (
        <div
          key={data.gameID}
          className="
            p-10
            border-3
          "
        >
          <div id="recent-game-date" className="text-center pb-4">
            <div>Date: {`${data.date}`}</div>
          </div>
          <div
            id="recent-game-main-details"
            className="
              flex justify-center
              gap-25
            "
          >
            <div>{data.awayTeamName}</div>
            <div>{data.awayTeamScore}</div>
            <div>FINAL</div>
            <div>{data.homeTeamScore}</div>
            <div>{data.homeTeamName}</div>
          </div>
          <div id="recent-game-additional-details" className="text-center">
            <div>{data.gameVenue}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentGame;
