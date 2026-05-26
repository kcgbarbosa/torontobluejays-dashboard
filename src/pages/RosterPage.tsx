import Roster from '../components/Roster';
import PlayerInfoModal from '../components/PlayerInfoModal';
import { useState } from 'react';

function RosterPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <button
        className="border-2 rounded-2xl p-2"
        onClick={() => setIsOpen(true)}
      >Temp Button</button>
      <PlayerInfoModal />
      <Roster />
    </div>
  );
}

export default RosterPage;
