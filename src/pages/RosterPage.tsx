import RosterTable from '../components/RosterTable';
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
    // #TODO FEAT [June 10] Locate detailed player active status information (on IL? active 26? Then add that to dto and models and render that accordingly)
    <div id="page-container" className="bg-gray-50 w-full min-h-screen p-4">
      {isOpen && (
        <PlayerInfoModal
          playerID={selectedPlayerID}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <RosterTable onSelectPlayer={handleSelectPlayer} />
    </div>
  );
}

export default RosterPage;
