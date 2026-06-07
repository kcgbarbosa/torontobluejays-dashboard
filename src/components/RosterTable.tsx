import { useContext, useMemo, useState } from 'react';
import { AppStatusContext, PlayerContext } from '../store/contexts';
import type { Player } from '../types/models/person.model';

type RosterProps = {
  onSelectPlayer: (id: number) => void;
};

type RosterFilterType =
  | 'firstNameAToZ'
  | 'firstNameZToA'
  | 'lastNameAToZ'
  | 'lastNameZToA'
  | 'positionAToZ'
  | 'positionZToA'
  | 'batSideAToZ'
  | 'batSideZToA'
  | 'ageAsc'
  | 'ageDesc'
  | 'heightAsc'
  | 'heightDesc'
  | 'weightAsc'
  | 'weightDesc';

function RosterTable({ onSelectPlayer }: RosterProps) {
  const playerData = useContext(PlayerContext);
  const { isLoading, error } = useContext(AppStatusContext);
  const [rosterFilter, setRosterFilter] =
    useState<RosterFilterType>('lastNameAToZ');

  const toInches = (h: string) => {
    const [ft, ins] = h.replace('"', '').split("' ").map(Number);
    return ft * 12 + ins;
  };

  const filteredRoster = useMemo(() => {
    const sorted = [...playerData];
    switch (rosterFilter) {
      case 'firstNameAToZ':
        return sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
      case 'firstNameZToA':
        return sorted.sort((a, b) => b.firstName.localeCompare(a.firstName));
      case 'lastNameAToZ':
        return sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
      case 'lastNameZToA':
        return sorted.sort((a, b) => b.lastName.localeCompare(a.lastName));
      case 'positionAToZ':
        return sorted.sort((a, b) =>
          a.positionName.localeCompare(b.positionName)
        );
      case 'positionZToA':
        return sorted.sort((a, b) =>
          b.positionName.localeCompare(a.positionName)
        );
      case 'batSideAToZ':
        return sorted.sort((a, b) =>
          a.batSideCode.localeCompare(b.batSideCode)
        );
      case 'batSideZToA':
        return sorted.sort((a, b) =>
          b.batSideCode.localeCompare(a.batSideCode)
        );
      case 'ageAsc':
        return sorted.sort((a, b) => a.currentAge - b.currentAge);
      case 'ageDesc':
        return sorted.sort((a, b) => b.currentAge - a.currentAge);
      case 'heightAsc':
        return sorted.sort((a, b) => toInches(a.height) - toInches(b.height));
      case 'heightDesc':
        return sorted.sort((a, b) => toInches(b.height) - toInches(a.height));
      case 'weightAsc':
        return sorted.sort((a, b) => a.weight - b.weight);
      case 'weightDesc':
        return sorted.sort((a, b) => b.weight - a.weight);
      default:
        return sorted;
    }
  }, [playerData, rosterFilter]);

  const handleSelectFilter = (selectedFilter: RosterFilterType) =>
    setRosterFilter(selectedFilter);

  // #TODO REFACTOR [June 7] Extract for use on SchedulePage
  // #TODO STYLE [June 7] Add indicator for selected filter. Text? Highlighted label?
  const ColumnSortButtons = ({
    label,
    asc,
    desc,
  }: {
    label: string;
    asc: RosterFilterType;
    desc: RosterFilterType;
  }) => (
    <span className="inline-flex items-center gap-2">
      {label}
      <span className="inline-flex gap-1">
        <button
          onClick={() => handleSelectFilter(asc)}
          className={`px-2 py-1 rounded text-base font-bold transition-opacity cursor-pointer ${rosterFilter === asc ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
        >
          ↑
        </button>
        <button
          onClick={() => handleSelectFilter(desc)}
          className={`px-2 py-1 rounded text-base font-bold transition-opacity cursor-pointer ${rosterFilter === desc ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
        >
          ↓
        </button>
      </span>
    </span>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-widest">
        Current Roster
      </h1>
      {playerData.length === 0 ? (
        <div>No roster data available.</div>
      ) : (
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-blue-600 text-white tracking-wide uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-3">
                  <ColumnSortButtons
                    label="Player"
                    asc="lastNameAToZ"
                    desc="lastNameZToA"
                  />
                </th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">
                  <ColumnSortButtons
                    label="Position"
                    asc="positionAToZ"
                    desc="positionZToA"
                  />
                </th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">
                  <ColumnSortButtons
                    label="B/T"
                    asc="batSideAToZ"
                    desc="batSideZToA"
                  />
                </th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">
                  <ColumnSortButtons label="Age" asc="ageAsc" desc="ageDesc" />
                </th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">
                  <ColumnSortButtons
                    label="HT"
                    asc="heightAsc"
                    desc="heightDesc"
                  />
                </th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">
                  <ColumnSortButtons
                    label="WT"
                    asc="weightAsc"
                    desc="weightDesc"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredRoster.map((player) => {
                return (
                  <tr
                    key={player.id}
                    className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => onSelectPlayer(player.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 ">
                        <img
                          src={player.imageUrl}
                          alt={player.fullName}
                          className="h-8 w-8 rounded-full object-cover bg-gray-100"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {player.fullName}
                          </div>
                          <div className="text-xs text-blue-400">
                            #{player.jerseyNumber}
                          </div>
                          <div className="sm:hidden flex gap-4 mt-1 text-xs text-gray-600">
                            <span>{player.positionAbbreviation}</span>
                            <span>
                              {player.batSideCode}/{player.pitchHandCode}
                            </span>
                            <span>{player.currentAge}y</span>
                            <span>{player.height}</span>
                            <span>{player.weight} lbs</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">
                      {player.positionName} / {player.positionAbbreviation}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">
                      {player.batSideCode}/{player.pitchHandCode}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">
                      {player.currentAge}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">
                      {player.height}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">
                      {player.weight} lbs
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RosterTable;
