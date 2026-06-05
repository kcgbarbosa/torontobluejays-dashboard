import Roster from '../components/Roster';
import PlayerInfoModal from '../components/PlayerInfoModal';
import { useContext, useState } from 'react';
import { AppStatusContext } from '../store/contexts';

function RosterPage() {
  const { isLoading, error } = useContext(AppStatusContext);

  const [selectedPlayerID, setSelectedPlayerID] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayerID(id);
    setIsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div id="page-container" className="bg-gray-50 w-full min-h-screen p-4">
      {/* {isOpen && <PlayerInfoModal playerIDProp={selectedPlayerID} />} */}
      {isOpen && (
        <PlayerInfoModal
          playerID={selectedPlayerID}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Roster onSelectPlayer={handleSelectPlayer} />
    </div>
  );
}

export default RosterPage;
