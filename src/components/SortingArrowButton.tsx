export type RosterFilterType =
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

type SortingArrowButtonProps = {
  label: string;
  asc: RosterFilterType;
  desc: RosterFilterType;
  activeFilter: RosterFilterType;
  onSelect: (filter: RosterFilterType) => void;
};

function SortingArrowButton({
  label,
  asc,
  desc,
  activeFilter,
  onSelect,
}: SortingArrowButtonProps) {
  return (
    <span className="inline-flex items-center gap-2">
      {label}
      <span className="inline-flex gap-1">
        <button
          onClick={() => onSelect(asc)}
          className={`px-2 py-1 rounded text-base font-bold transition-opacity cursor-pointer ${activeFilter === asc ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
        >
          ↑
        </button>
        <button
          onClick={() => onSelect(desc)}
          className={`px-2 py-1 rounded text-base font-bold transition-opacity cursor-pointer ${activeFilter === desc ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
        >
          ↓
        </button>
      </span>
    </span>
  );
}

export default SortingArrowButton;
