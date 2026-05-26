import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

type PlayerID = {
  playerIDProp: Number;
};

function PlayerInfoModal({ playerIDProp }: PlayerID) {
  const playerData = useContext(PlayerContext);

  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const selectedPlayer = playerData.find(
    (player) => player.id === playerIDProp
  );

  return (
    <>
      <span> Test Player Name is: {selectedPlayer?.fullName}</span>
      <dialog id="playerModalID">
        <div className=" w-11/12 max-w-5xl relative bg-blue-200 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
          <button className="right-2 top-2">✕</button>
          <h3 className="text-lg font-bold">Player Name</h3>
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eum
            suscipit amet rerum veritatis. Ullam mollitia, dolor ab itaque amet
            alias a atque soluta ex asperiores cumque voluptas? Molestiae,
            veritatis.
          </p>
        </div>
      </dialog>
    </>
  );
}

export default PlayerInfoModal;
