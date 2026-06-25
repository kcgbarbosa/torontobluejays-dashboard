type StatCardProps = {
  statName?: string | undefined;
  playerName?: string | undefined;
  playerID?: number | undefined;
  statValue?: number | string | undefined;
  jerseyNumber?: string | undefined;
  positionAbbreviation?: string;
  statAbbreviation?: string;
};

function StatCard({
  statName,
  playerName,
  playerID,
  statValue,
  jerseyNumber,
  positionAbbreviation,
  statAbbreviation,
}: StatCardProps) {
  return (
    <div className="bg-white border border-y-amber-900 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest pb-3">
        {statName}
      </h2>
      <div className="flex items-center gap-4">
        <img
          alt={`${playerName} headshot`}
          src={`https://midfield.mlbstatic.com/v1/people/${playerID}/spots/120`}
          className="size-25 rounded-lg object-contain bg-gray-50 "
        />
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-gray-900">
            {playerName}
            <span className="text-blue-600"> {jerseyNumber}</span>
          </span>
          <span className="text-sm text-gray-500 uppercase tracking-wider">
            {positionAbbreviation}
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-4xl font-bold text-blue-600">
              {statValue}
            </span>
            <span className="text-sm text-gray-600 uppercase tracking-wider">
              {statAbbreviation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
