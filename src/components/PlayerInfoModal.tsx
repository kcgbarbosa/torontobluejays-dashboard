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

  return (
    <div
      id="playerModal"
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-colors ${
        isOpen ? 'visible bg-black/40' : 'visible'
      }`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3">
          <img
            src={selectedPlayerData?.imageUrl}
            alt={selectedPlayerData?.fullName}
            className="w-full max-w-70 h-auto rounded-xl bg-gray-100 border border-gray-200 self-center md:self-start"
          />
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {selectedPlayerData?.fullName}{' '}
              <span className="text-blue-600 text-2xl">
                #{selectedPlayerData?.jerseyNumber}
              </span>
            </h2>
            <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              {selectedPlayerData?.positionAbbreviation} - B/T:{' '}
              {selectedPlayerData?.batSideCode}/
              {selectedPlayerData?.pitchHandCode}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              {selectedPlayerData?.height} | {selectedPlayerData?.weight}lbs |
              Age: {selectedPlayerData?.currentAge}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-3">
            Biography
          </h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p>
              <span className="font-semibold text-gray-500">Born:</span>{' '}
              {selectedPlayerData?.birthDate}
            </p>
            <p>
              <span className="font-semibold text-gray-500">Location:</span>{' '}
              {[
                selectedPlayerData?.birthCity,
                selectedPlayerData?.birthStateProvince,
                selectedPlayerData?.birthCountry,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            <p>
              {selectedPlayerData?.draftYear !== undefined ? (
                <>
                  <span className="font-semibold text-gray-500">Drafted:</span>{' '}
                  {selectedPlayerData?.draftYear}
                </>
              ) : (
                <>
                  <span className="font-semibold text-gray-500">
                    MLB Debut:
                  </span>{' '}
                  {selectedPlayerData?.mlbDebutDate}
                </>
              )}
            </p>
            <p>
              <span className="font-semibold text-gray-500">
                Active Status:
              </span>{' '}
              {selectedPlayerData?.active ? 'Active' : 'Inactive'}
            </p>
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
