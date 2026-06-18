import React from 'react';
import type { PitcherRef } from '../types/models/linescore.model';

// type PitcherMatchupProps = {
//   PitcherAName?: string;
//   PitcherAImage?: string;
//   PitcherBName?: string;
//   PitcherBImage?: string;
//   PitcherCName?: string;
//   PitcherCImage?: string;
// }

const mockPitcherA: PitcherRef = {
  id: 669373,
  fullName: 'José Berríos',
  playerHeadshotUrl:
    'https://midfield.mlbstatic.com/v1/people/669373/spots/240',
  playerActionShotUrl:
    'https://securea.mlb.com/images/players/action_shots/669373.jpg',
};

const mockPitcherB: PitcherRef = {
  id: 669456,
  fullName: 'Shane Bieber',
  playerHeadshotUrl:
    'https://midfield.mlbstatic.com/v1/people/669456/spots/240',
  playerActionShotUrl:
    'https://securea.mlb.com/images/players/action_shots/669456.jpg',
};

const PitcherMatchupCard = () => {
  return (
    <div className="w-11/12 mx-auto bg-white border-2 rounded-xl p-3">
      {/* gameStatus === Preview ? 'Probable Pitchers' : 'Game Decisions' */}
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
        Probable Pitchers / Game Decisions
      </h3>

      <div className="flex items-center justify-around gap-4">
        {/* Pitcher A */}
        <div className="flex items-center gap-3">
          <img
            src={mockPitcherA.playerActionShotUrl}
            className="size-30 rounded-full object-cover bg-gray-400/90 shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-gray-900">
              {mockPitcherA.fullName}
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
              {mockPitcherB.fullName}
            </span>
            {/* if gameStatus === Preview ? 'Away' or 'Home' : 'W' or 'L (styled green or red)' */}
            <span className="text-xs text-gray-400 uppercase">Home</span>
            <span className="text-xs text-gray-300">-- - --</span>
          </div>
          <img
            src={mockPitcherB.playerActionShotUrl}
            className="size-30 rounded-full object-cover bg-gray-400/90 shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default PitcherMatchupCard;
