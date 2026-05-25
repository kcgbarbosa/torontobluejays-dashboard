import { Link } from 'react-router-dom';

const navLinkInfo = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  return (
    <nav className="flex justify-around py-4  ">
      {navLinkInfo.map((d) => (
        <Link key={d.id}
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
