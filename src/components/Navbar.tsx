import { Link, NavLink } from 'react-router-dom';

const navLinkInfo = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  return (
    <nav className="flex w-full justify-between border-b border-gray-300 bg-blue-50 px-10 py-5">
      <Link to={'/'}>
        <img src="src/assets/imgs/logo-bluejays.png" className="w-36 lg:w-48" />
      </Link>
      <div className="flex items-center gap-8">
        {navLinkInfo.map((d) => (
          <NavLink
            key={d.id}
            to={d.href}
            className={({ isActive }) =>
              `py-2 text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-400'
              }`
            }
          >
            {d.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
