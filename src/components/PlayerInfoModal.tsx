import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

type PlayerInfoModalProps = {
  playerID: number | null;
  isOpen: boolean;
  onClose: () => void;
};

// # TODO-NEXT [May 26] Get Modal opening and closing
function PlayerInfoModal({ playerID, isOpen, onClose }: PlayerInfoModalProps) {
  const { isLoading, error } = useContext(AppStatusContext);
  const playerData = useContext(PlayerContext);

  const selectedPlayerData = playerData.find((d) => d.id === playerID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div
        id="playerModal"
        className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'visible bg-black/30' : 'invisible'}`}
        onClick={onClose}
      >
        <div className="min-w-1/2 min-h-3/4 border-4 bg-blue-100/50  ">
          <h3 className="text-lg font-bold">{selectedPlayerData?.fullName}</h3>
          <p className="py-4">Hits: {selectedPlayerData?.hitting?.hits}</p>
        </div>
      </div>
    </>
  );
}

export default PlayerInfoModal;
