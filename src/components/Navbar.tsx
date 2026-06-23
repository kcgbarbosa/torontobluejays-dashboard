import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import logoURL from '../assets/imgs/logo-bluejays.png';

const navLinkInfo = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-10 flex w-full justify-between border-b border-gray-300 bg-blue-200 px-10 py-5">
      <Link to={'/'}>
        <img
          alt="Toronto Blue Jays logo"
          src={logoURL}
          className="w-36 lg:w-48"
        />
      </Link>
      <div className="relative flex flex-col items-center pt-2 md:hidden">
        <button onClick={handleClick} className="">
          <RxHamburgerMenu size={25} />
        </button>
        {isOpen && (
          <div className="absolute top-full -right-10 z-10 flex w-36 flex-col gap-1 rounded-lg border border-gray-100 bg-white p-2 shadow-lg">
            {navLinkInfo.map((d) => (
              <NavLink
                key={d.id}
                to={d.href}
                className={({ isActive }) =>
                  `rounded-md px-1 py-2 text-center text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-400'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {d.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <div className="hidden md:flex gap-4">
        {navLinkInfo.map((d) => (
          <NavLink
            key={d.id}
            to={d.href}
            className={({ isActive }) =>
              `py-4 text-center text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600 font-semibold border-b-3 border-blue-600'
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
