import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

type PlayerInfoModalProps = {
  playerID: number | null;
  isOpen: boolean;
  onClose: () => void;
};

function PlayerInfoModal({ playerID, isOpen, onClose }: PlayerInfoModalProps) {
  const { isLoading, error } = useContext(AppStatusContext);
  const playerData = useContext(PlayerContext);

  const selectedPlayerData = playerData.find((d) => d.id === playerID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // #TODO-NEXT [May 29] Complete skeleton of player data display in the modal.
    <>
      <div
        id="playerModal"
        // className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'visible bg-black/30' : 'invisible'}`}

        // #FIXME [May 30] temp always visible display for designing
        className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'visible bg-black/30' : 'visible'}`}
        onClick={onClose}
      >
        <div className="min-w-1/2 min-h-3/4 border-4 bg-white shadow p-6 ">
          <div id="player-headshot" className="w-1/2 border-2 flex-col">
            <img
              src={selectedPlayerData?.imageUrl}
              alt={selectedPlayerData?.fullName}
              className="min-w-11/12 border"
            />
            <span>
              {selectedPlayerData?.draftYear !== undefined
                ? `Drafted: ${selectedPlayerData?.draftYear}`
                : `Debut: ${selectedPlayerData?.mlbDebutDate}`}
            </span>

            {selectedPlayerData?.positionName !== 'Pitcher' && (
              <div id="hitter-stat-table">
                <h3> 2026 Hitting Stats</h3>
                <table>
                  <thead>
                    <tr>
                      <td> AB </td>
                      <td> AVG </td>
                      <td> OBP% </td>
                      <td> RBI </td>
                      <td> SB </td>
                      <td> OPS </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {selectedPlayerData?.hitting?.atBats}</td>
                      <td> {selectedPlayerData?.hitting?.avg}</td>
                      <td> {selectedPlayerData?.hitting?.obp}</td>
                      <td> {selectedPlayerData?.hitting?.rbi}</td>
                      <td> {selectedPlayerData?.hitting?.stolenBases}</td>
                      <td> {selectedPlayerData?.hitting?.ops}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {!selectedPlayerData?.isPitcher && (
              <div id="hitter-stat-table">
                <h3> 2026 Statistics</h3>
                <table>
                  <thead>
                    <tr>
                      <td> AB </td>
                      <td> AVG </td>
                      <td> OBP% </td>
                      <td> RBI </td>
                      <td> SB </td>
                      <td> OPS </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {selectedPlayerData?.hitting?.atBats}</td>
                      <td> {selectedPlayerData?.hitting?.avg}</td>
                      <td> {selectedPlayerData?.hitting?.obp}</td>
                      <td> {selectedPlayerData?.hitting?.rbi}</td>
                      <td> {selectedPlayerData?.hitting?.stolenBases}</td>
                      <td> {selectedPlayerData?.hitting?.ops}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {selectedPlayerData?.isPitcher && (
              <div id="pitcher-stat-table">
                <h3> 2026 Statistics</h3>
                <table>
                  <thead>
                    <tr>
                      <td> G </td>
                      <td> W-L </td>
                      <td> ERA </td>
                      <td> IP </td>
                      <td> K/9 </td>
                      <td> WHIP </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {selectedPlayerData?.pitching?.gamesPitched}</td>
                      <td>
                        {selectedPlayerData?.pitching?.wins}-
                        {selectedPlayerData?.pitching?.losses}
                      </td>
                      <td> {selectedPlayerData?.pitching?.era}</td>
                      <td> {selectedPlayerData?.pitching?.inningsPitched}</td>
                      <td> {selectedPlayerData?.pitching?.strikeoutsPer9}</td>
                      <td> {selectedPlayerData?.pitching?.whip}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div id="player-bio">
              <h3 className="text-lg font-bold">
                {selectedPlayerData?.fullName}
              </h3>
            </div>
            <div id="player-header">{selectedPlayerData?.fullName}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerInfoModal;
