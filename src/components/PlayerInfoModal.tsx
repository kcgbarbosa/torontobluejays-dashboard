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
          <div
            id="player-headshot-with-footer"
            className="w-1/2 h-full border-2 flex-col"
          >
            <img
              src={selectedPlayerData?.imageUrl}
              alt={selectedPlayerData?.fullName}
              className="min-w-11/12 border"
            />
            <h3>
              {selectedPlayerData?.fullName} #{selectedPlayerData?.jerseyNumber}
            </h3>
            <span>
              {selectedPlayerData?.positionAbbreviation} | B/T:
              {selectedPlayerData?.batSideCode}/
              {selectedPlayerData?.pitchHandCode}
              {selectedPlayerData?.height} | {selectedPlayerData?.weight}lbs |
              Age: {selectedPlayerData?.currentAge}
            </span>

            <div id="player-bio">
              <h3> Biography</h3>
              <p>
                Born:{selectedPlayerData?.birthDate} in{' '}
                {[
                  selectedPlayerData?.birthCity,
                  selectedPlayerData?.birthStateProvince,
                  selectedPlayerData?.birthCountry,
                ]
                  .filter(Boolean)
                  .join(', ')}
                {selectedPlayerData?.draftYear !== undefined
                  ? `Drafted: ${selectedPlayerData?.draftYear}`
                  : `Debut: ${selectedPlayerData?.mlbDebutDate}`}
              </p>
            </div>

            {/* no data available handling for hitters */}
{selectedPlayerData?.hitting === undefined && !selectedPlayerData?.isPitcher ? (
  <div id="no-stats-available">
    <h1>No stats available.</h1>
  </div>
) : (
  // 1. This container only displays if the player is NOT a pitcher
  selectedPlayerData?.positionName !== 'Pitcher' && (
    <div id="hitter-stat-tables">
      
      {/* Table 1: Standard Stats */}
      <div>
        <h3> 2026 Standard Statistics</h3>
        <table>
          <thead>
            <tr>
              <td className="text-left px-2 py-2"> AB </td>
              <td className="text-left px-2 py-2"> AVG </td>
              <td className="text-left px-2 py-2"> H </td>
              <td className="text-left px-2 py-2"> RBI </td>
              <td className="text-left px-2 py-2"> SB </td>
              <td className="text-left px-2 py-2"> OPS </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.atBats}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.avg}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.hits}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.rbi}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.stolenBases}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.ops}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 2: Additional Stats (Now safely inside the non-pitcher check) */}
      <div id="hitter-stat-table">
        <h3> 2026 Additional Stats</h3>
        <table>
          <thead>
            <tr>
              <td className="text-left px-2 py-2"> BB </td>
              <td className="text-left px-2 py-2"> Doubles </td>
              <td className="text-left px-2 py-2"> Triples </td>
              <td className="text-left px-2 py-2"> HR </td>
              <td className="text-left px-2 py-2"> OBP </td>
              <td className="text-left px-2 py-2"> SLG </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.baseOnBalls}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.doubles}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.triples}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.homeRuns}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.obp}</td>
              <td className="text-left px-2 py-2">{selectedPlayerData?.hitting?.slg}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
)}

            {/* display for pitchers */}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerInfoModal;
