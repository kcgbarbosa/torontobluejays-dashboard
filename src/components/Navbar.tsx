import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-around py-4">
      <Link to="/">Home</Link>
      <Link to="/SchedulePage">Schedule</Link>
      <Link to="/RosterPage">Roster</Link>
    </nav>
  );
}

export default Navbar;
