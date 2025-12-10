import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-center w-full items-start p-5 text-xl gap-10 font-medium">
      <Link to="/">Dashboard</Link>
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
};

export default Navbar;
