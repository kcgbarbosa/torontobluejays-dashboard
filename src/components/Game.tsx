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
    <>
      {recentGameDataProp.map((data) => (
        <div
          key={data.gameID}
          className="
          p-3
            border-3
          "
        >
          <div id="recent-game-date" className="text-center pb-6">
            <div>Date: {`${data.date}`}</div>
          </div>
          <div
            id="game-main-details"
            className="
              flex justify-center
              gap-20
            "
          >
            <div>{data.awayTeamName}</div>
            <div>{data.awayTeamScore}</div>
            <div>FINAL</div>
            <div>{data.homeTeamScore}</div>
            <div>{data.homeTeamName}</div>
          </div>
          <div id="game-venu" className="text-center">
            <div>{data.gameVenue}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecentGame;
