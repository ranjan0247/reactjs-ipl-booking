function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">IPL Ticket Hub</div>
      <ul className="nav-links">
        <li><a href="#matches">Matches</a></li>
        <li><a href="#venues">Venues</a></li>
        <li><a href="#bookings">My Bookings</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;