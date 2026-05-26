import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

function PlayerInfoModal() {
  const playerInfo = useContext(PlayerContext);

  const { isLoading, error } = useContext(AppStatusContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const player = playerInfo[0]; // for testing

  return (
    
    <dialog>
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
  );
}

export default PlayerInfoModal;
