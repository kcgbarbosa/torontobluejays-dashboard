import { Link } from 'react-router-dom';

const navLinkInfo = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

function Navbar() {
  return (
    <div className="flex w-full justify-between items-center ">
      <h1 className=" text-3xl font-bold text-blue-400 pl-10 pb-5  font-medium">
        Blue Jays Dashboard
      </h1>
      <nav className="flex items-center gap-10 text-xl pb-5 pr-10   ">
        {navLinkInfo.map((d) => (
          <Link
            key={d.id}
            to={d.href}
            className="
        text-black no-underline 
        hover:underline hover:text-blue-300"
          >
            {d.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
