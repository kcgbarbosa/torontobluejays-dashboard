import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

type PlayerID = {
  playerIDProp: number | null;
};

// # TODO-NEXT [May 26] Get Modal opening and closing
function PlayerInfoModal({ playerIDProp }: PlayerID) {
  const { isLoading, error } = useContext(AppStatusContext);
  const playerData = useContext(PlayerContext);

  const selectedPlayerData = playerData.find((d) => d.id === playerIDProp);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div id="playerModal">
        <div className="overflow-y-auto">
          <button className="right-2 top-2">✕</button>
          <h3 className="text-lg font-bold">{selectedPlayerData?.fullName}</h3>
          <p className="py-4">Hits: {selectedPlayerData?.hitting?.hits}</p>
        </div>
      </div>
    </>
  );
}

export default PlayerInfoModal;
