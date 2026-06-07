import { useContext } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';

// # TODO [May 30] - refactor statistics table into reusable component

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

  const birthLocation = [
    selectedPlayerData?.birthCity,
    selectedPlayerData?.birthStateProvince,
    selectedPlayerData?.birthCountry,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    // # FIXME [June 6] ESC key doesnt close modal
    <div
      id="playerModal"
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-colors ${
        isOpen ? 'visible bg-black/40' : 'visible'
      }`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* # TODO STYLES [June 6]: Review following elements:
         * - Stat table headers
         * - Text-size scaling */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <button
            onClick={onClose}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Roster
          </button>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Player Profile
          </span>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {/*  # TODO REFACTOR [May 30] - refactor statistics table into reusable
        component */}
        <div className="bg-blue-600 flex flex-col items-center md:flex-row md:items-end px-10 pt-10 pb-8 gap-6 md:gap-8">
          <img
            src={selectedPlayerData?.imageUrl}
            alt={selectedPlayerData?.fullName}
            className="w-50 h-auto rounded-full ring-2 ring-white/75 shrink-0 md:self-end"
          />
          <div className="text-white min-w-0 pb-1 text-center md:text-left">
            <p className="text-sm font-semibold text-blue-100 uppercase tracking-widest mb-2">
              {selectedPlayerData?.positionName} &middot; B/T:{' '}
              {selectedPlayerData?.batSideCode}/
              {selectedPlayerData?.pitchHandCode}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              {selectedPlayerData?.fullName}{' '}
              <span className="text-white/60">
                {/*  # FIXME [June 6] - Handle empty states (example: no placeholder is being displayed right now for Willie) */}
                #{selectedPlayerData?.jerseyNumber}
              </span>
            </h2>
            <p className="text-base text-white/75 mt-1.5">
              {selectedPlayerData?.height} &middot; {selectedPlayerData?.weight}
              lbs &middot; Age {selectedPlayerData?.currentAge}
            </p>
            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-6 text-sm border-t border-white/25 pt-6">
              <span>
                <span className="text-blue-100/70 text-xs uppercase tracking-wider">
                  Born{' '}
                </span>
                <span className="text-white">
                  {selectedPlayerData?.birthDate}
                </span>
              </span>
              {birthLocation && (
                <span>
                  <span className="text-blue-100/70 text-xs uppercase tracking-wider">
                    From{' '}
                  </span>
                  <span className="text-white">{birthLocation}</span>
                </span>
              )}
              <span>
                {selectedPlayerData?.draftYear !== undefined ? (
                  <>
                    <span className="text-blue-100/70 text-xs uppercase tracking-wider">
                      Drafted{' '}
                    </span>
                    <span className="text-white">
                      {selectedPlayerData?.draftYear}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-100/70 text-xs uppercase tracking-wider">
                      Debut{' '}
                    </span>
                    <span className="text-white">
                      {selectedPlayerData?.mlbDebutDate}
                    </span>
                  </>
                )}
              </span>
              <span
                className={
                  selectedPlayerData?.active
                    ? 'text-green-300 font-semibold'
                    : 'text-red-300 font-semibold'
                }
              >
                {selectedPlayerData?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
        <div id="player-stats-block" className="md:col-span-2 mt-2">
          {selectedPlayerData?.hitting === undefined &&
          !selectedPlayerData?.isPitcher ? (
            <div className="text-center py-6 bg-gray-50 rounded-xl border">
              <p className="text-gray-500 font-medium">
                No hitting statistics available.
              </p>
            </div>
          ) : (
            selectedPlayerData?.positionName !== 'Pitcher' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold mb-2 text-gray-900">
                    2026 Standard Statistics
                  </h3>
                  <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full text-center text-sm">
                      <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs border-b">
                        <tr>
                          <th className="px-3 py-2.5">AB</th>
                          <th className="px-3 py-2.5">AVG</th>
                          <th className="px-3 py-2.5">H</th>
                          <th className="px-3 py-2.5">RBI</th>
                          <th className="px-3 py-2.5">SB</th>
                          <th className="px-3 py-2.5">OPS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y font-medium text-gray-900">
                        <tr>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.atBats}
                          </td>
                          <td className="px-3 py-3 text-blue-600 font-bold">
                            {selectedPlayerData?.hitting?.avg}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.hits}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.rbi}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.stolenBases}
                          </td>
                          <td className="px-3 py-3 font-bold">
                            {selectedPlayerData?.hitting?.ops}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold mb-2 text-gray-900">
                    2026 Additional Statistics
                  </h3>
                  <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full text-center text-sm">
                      <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs border-b">
                        <tr>
                          <th className="px-3 py-2.5">BB</th>
                          <th className="px-3 py-2.5">2B</th>
                          <th className="px-3 py-2.5">3B</th>
                          <th className="px-3 py-2.5">HR</th>
                          <th className="px-3 py-2.5">OBP</th>
                          <th className="px-3 py-2.5">SLG</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y font-medium text-gray-900">
                        <tr>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.baseOnBalls}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.doubles}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.triples}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.homeRuns}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.obp}
                          </td>
                          <td className="px-3 py-3">
                            {selectedPlayerData?.hitting?.slg}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}
          {selectedPlayerData?.isPitcher && (
            <div>
              <h3 className="text-base font-bold mb-2 text-gray-900">
                2026 Pitching Statistics
              </h3>
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-center text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs border-b">
                    <tr>
                      <th className="px-3 py-2.5">G</th>
                      <th className="px-3 py-2.5">W-L</th>
                      <th className="px-3 py-2.5">ERA</th>
                      <th className="px-3 py-2.5">IP</th>
                      <th className="px-3 py-2.5">K/9</th>
                      <th className="px-3 py-2.5">WHIP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-medium text-gray-900">
                    <tr>
                      <td className="px-3 py-3">
                        {selectedPlayerData?.pitching?.gamesPitched}
                      </td>
                      <td className="px-3 py-3">
                        {selectedPlayerData?.pitching?.wins}-
                        {selectedPlayerData?.pitching?.losses}
                      </td>
                      <td className="px-3 py-3">
                        {selectedPlayerData?.pitching?.era}
                      </td>
                      <td className="px-3 py-3">
                        {selectedPlayerData?.pitching?.inningsPitched}
                      </td>
                      <td className="px-3 py-3">
                        {selectedPlayerData?.pitching?.strikeoutsPer9}
                      </td>
                      <td className="px-3 py-3 font-bold">
                        {selectedPlayerData?.pitching?.whip}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerInfoModal;
