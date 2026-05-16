/**
 * @component
 * RecentGame: Displays most recent completed Blue Jays game. Includes various key statistics and general game information.
 *
 * #TODO [N/A] Implement dynamic determination of most recent game (may require GamePK or date logic)
 *
 */

import { useContext } from 'react';
import { AppStatusContext, RecentGameContext } from '../store/contexts';

function RecentGame() {
  const recentGame = useContext(RecentGameContext);

  const { isLoading, error } = useContext(AppStatusContext);

  {
    if (isLoading) return <div>Loading...</div>;
  }
  {
    if (error) return <div> Error : {error} </div>;
  }
  return (
    <>
      {recentGame.map((data) => (
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
            <span className="flex">
              <img className="size-10" src={data.awayTeamLogo} />
              <div>{data.awayTeamName}</div>
            </span>
            <div>{data.awayTeamScore}</div>
            <div>FINAL</div>
            <div>{data.homeTeamScore}</div>
            <span className="flex">
              <div>{data.homeTeamName}</div>
              <img className="size-10" src={data.homeTeamLogo} />
            </span>
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
