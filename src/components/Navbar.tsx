import React from 'react';
import { Link } from 'react-router-dom';

const navLinkInfo = [
  { name: 'Home', href: '/' },
  { name: 'Roster', href: '/RosterPage' },
  { name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  return (
    <nav className="flex justify-around py-4  ">
      {navLinkInfo.map((d) => (
        <Link
          to={d.href}
          className="
          text-black no-underline 
              hover:underline hover:text-blue-300"
        >
          {d.name}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
