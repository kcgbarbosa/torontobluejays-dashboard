import type { PitcherRef } from '../types/models/linescore.model';

type PitcherMatchupCardProps = {
  gameStatus: string;
  pitcherA?: PitcherRef;
  pitcherB?: PitcherRef;
  pitcherC?: PitcherRef;
};

const PitcherMatchupCard = ({
  gameStatus,
  pitcherA,
  pitcherB,
  pitcherC,
}: PitcherMatchupCardProps) => {
  return (
    <div className="w-11/12 mx-auto bg-white rounded-xl p-2 m-3 border-t-2 border-gray-100">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-3">
        {gameStatus === 'Preview' ? 'Probable Pitchers' : 'Game Decisions'}
      </h2>

      <div className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:gap-6">
        {/* Pitcher A */}
        <div className="flex items-center gap-3">
          <img
            alt={`${pitcherA?.fullName} headshot`}
            src={
              gameStatus === 'Preview'
                ? pitcherA?.playerActionShotUrl
                : pitcherA?.playerHeadshotUrl
            }
            className="size-15 rounded-full object-cover bg-gray-400/90 md:size-30"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-gray-900">
              {pitcherA?.fullName}
            </span>
            {gameStatus === 'Preview' && (
              <span className="text-xs text-gray-500 uppercase">Away</span>
            )}
            {gameStatus === 'Final' && (
              <span className="font-bold text-2xl text-green-500">W</span>
            )}
          </div>
        </div>
        <span className="hidden sm:block text-base text-center font-bold text-gray-500">
          VS.
        </span>

        {/* Pitcher B */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col sm:text-right">
            <span className="text-sm font-semibold text-gray-900">
              {pitcherB?.fullName}
            </span>
            {gameStatus === 'Preview' && (
              <span className="text-xs text-gray-500 uppercase">Home</span>
            )}
            {gameStatus === 'Final' && (
              <span className="font-bold text-2xl text-red-500">L</span>
            )}
          </div>
          <img
            alt={`${pitcherB?.fullName} headshot`}
            src={
              gameStatus === 'Preview'
                ? pitcherB?.playerActionShotUrl
                : pitcherB?.playerHeadshotUrl
            }
            className="order-first sm:order-last size-15 rounded-full object-cover bg-gray-400/90 md:size-30"
          />
        </div>
      </div>
      {pitcherC && (
        <div className="flex items-center justify-start gap-2 mt-3 pt-3 border-t border-gray-100 sm:justify-center">
          <img
            alt={`${pitcherC.fullName} headshot`}
            src={pitcherC.playerHeadshotUrl}
            className="size-15 rounded-full object-cover bg-gray-400/90"
          />
          <span className="text-xs font-medium text-gray-700">
            {pitcherC.fullName}
          </span>
          <span className="text-xs font-bold text-green-500">S</span>
        </div>
      )}
    </div>
  );
};

export default PitcherMatchupCard;
