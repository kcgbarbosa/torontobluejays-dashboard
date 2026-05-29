import Roster from '../components/Roster';
import PlayerInfoModal from '../components/PlayerInfoModal';
import { useContext, useState } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

function RosterPage() {
  const { isLoading, error } = useContext(AppStatusContext);
  const playerData = useContext(PlayerContext);

  const [selectedPlayerID, setSelectedPlayerID] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState<boolean | null>(false);

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayerID(id);
    setIsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div id="page-container" className="bg-gray-100 min-h-screen p-4">
      <PlayerInfoModal playerIDProp={selectedPlayerID} />
      <Roster onSelectPlayer={handleSelectPlayer} />
    </div>
  );
}

export default RosterPage;
