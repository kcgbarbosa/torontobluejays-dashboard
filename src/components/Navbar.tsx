import { Link } from 'react-router-dom';

const navLinkInfo = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  return (
    <div className="flex w-full justify-between items-center border-b border-gray-200 bg-white px-10 py-5">
      <h1 className="text-2xl text-blue-600 font-semibold">
        Blue Jays Dashboard
      </h1>
      <nav className="flex items-center gap-10 text-base">
        {navLinkInfo.map((d) => (
          <Link
            key={d.id}
            to={d.href}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-150"
          >
            {d.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
