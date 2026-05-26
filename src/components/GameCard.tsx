/**
 * @component
 * Game: Displays various key statistics and general game information.
 *
 * #FIXME [May 21] game score results not being displayed
 *
 */

import { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import type { Game } from '../types/models/game.model';
import { formatTimeUtil } from '../utils/dateAndTimeUtilities';

type GameDataProps = {
  gameDataProp: Game | null;
};

function GameCard({ gameDataProp }: GameDataProps) {
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDataProp || !gameDataProp.date)
    return <div>No game data available</div>;

  return (
    <>
      <div key={gameDataProp.gameID} className="p-3 border-3">
        <div id="recent-game-date" className="text-center pb-6">
          <div>Date: {`${gameDataProp.date}`}</div>
        </div>
        <div
          id="game-main-details"
          className="
            flex justify-center
            gap-20
          "
        >
          <span className="flex">
            <img className="size-10" src={gameDataProp.awayTeamLogo} />
            <div>{gameDataProp.awayTeamName}</div>
          </span>
          <div>{gameDataProp.awayTeamScore}</div>
          <div></div>
          <div>{gameDataProp.homeTeamScore}</div>
          <span className="flex">
            <div>{gameDataProp.homeTeamName}</div>
            <img className="size-10" src={gameDataProp.homeTeamLogo} />
          </span>
        </div>
        <div id="game-venue" className="text-center flex flex-col">
          <div>{gameDataProp.startTime}</div>
          <div>{gameDataProp.gameVenue}</div>
          <div>{formatTimeUtil(gameDataProp.startTime)}</div>
        </div>
      </div>
    </>
  );
}

export default GameCard;
