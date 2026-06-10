import { useContext } from 'react';
import { AppStatusContext } from '../store/contexts';
import type { Game } from '../types/models/game.model';
import {
  formatTimeForDisplayUtil,
  formatDateForDisplayLongUtil,
} from '../utils/dateAndTimeUtilities';

type GameDataProps = {
  gameDataProp: Game | null;
};

function HeroGameCard({ gameDataProp }: GameDataProps) {
  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDataProp || !gameDataProp.date)
    return <div>No game data available</div>;

  return (
    <>
      <div className="w-full min-h-110 bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <div id="recent-game-date" className="text-center pb-6">
          <div>{formatDateForDisplayLongUtil(gameDataProp.date)}</div>
        </div>
        <div
          id="game-main-details"
          className="
            flex justify-center
            gap-20
          "
        >
          <span className="flex">
            <img
              className="size-10 object-contain"
              src={gameDataProp.awayTeamLogo}
            />
            <div>{gameDataProp.awayTeamName}</div>
          </span>
          <div>{gameDataProp.awayTeamScore}</div>

          <div>{gameDataProp.homeTeamScore}</div>
          <span className="flex">
            <div>{gameDataProp.homeTeamName}</div>
            <img
              className="size-10 object-contain"
              src={gameDataProp.homeTeamLogo}
            />
          </span>
        </div>
        <div id="game-venue" className="text-center flex flex-col">
          <div>{gameDataProp.gameVenue}</div>
          <div>{formatTimeForDisplayUtil(gameDataProp.startTime)}</div>
        </div>
      </div>
    </>
  );
}

export default HeroGameCard;
