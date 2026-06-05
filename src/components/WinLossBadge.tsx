type WinLossBadgeProps = {
  won: boolean;
};

function WinLossBadge({ won }: WinLossBadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${won ? 'bg-blue-600' : 'bg-red-500'}`}>
      {won ? 'W' : 'L'}
    </span>
  );
}

export default WinLossBadge;
