import React from 'react';
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
    <div className="w-11/12 mx-auto bg-white  rounded-xl p-2 m-3 border-t-2 border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
        {gameStatus === 'Preview' ? 'Probable Pitchers' : 'Game Decisions'}
      </h3>

      <div className="flex items-center justify-around gap-4">
        {/* Pitcher A */}
        <div className="flex items-center gap-3">
          <img
            src={
              gameStatus === 'Preview'
                ? pitcherA?.playerActionShotUrl
                : pitcherA?.playerHeadshotUrl
            }
            className="size-30 rounded-full object-cover bg-gray-400/90 shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-gray-900">
              {pitcherA?.fullName}
            </span>
            {/* if gameStatus === Preview ? 'Away' or 'Home' : 'W' or 'L' */}
            <span className="text-xs text-gray-400 uppercase">Away</span>
            <span className="text-xs text-gray-300">-- - --</span>
          </div>
        </div>

        <span className="text-base font-bold text-gray-400 shrink-0">VS.</span>

        {/* Pitcher B */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-900">
              {pitcherB?.fullName}
            </span>
            {/* if gameStatus === Preview ? 'Away' or 'Home' : 'W' or 'L (styled green or red)' */}
            <span className="text-xs text-gray-400 uppercase">Home</span>
            <span className="text-xs text-gray-300">-- - --</span>
          </div>
          <img
            src={
              gameStatus === 'Preview'
                ? pitcherB?.playerActionShotUrl
                : pitcherB?.playerHeadshotUrl
            }
            className="size-30 rounded-full object-cover bg-gray-400/90 shrink-0"
          />
        </div>
      </div>

      {pitcherC && (
        <div className="text-center mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Save —{' '}
          </span>
          <span className="text-xs font-medium text-gray-700">
            {pitcherC.fullName}
          </span>
        </div>
      )}
    </div>
  );
};

export default PitcherMatchupCard;
