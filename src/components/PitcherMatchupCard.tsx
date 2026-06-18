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
    <div className="bg-white">
      <div className="flex justify-around gap-4">
        <img
          src={mockPitcherA.playerActionShotUrl}
          className="size-30 rounded-full object- object-cover bg-gray-400/90"
        />
        <img
          src={mockPitcherB.playerActionShotUrl}
          className="size-30 rounded-full object- object-cover bg-gray-400/90"
        />
      </div>
    </div>
  );
};

export default PitcherMatchupCard;
