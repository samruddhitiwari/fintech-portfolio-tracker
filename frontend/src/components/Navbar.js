import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-lg font-bold">FinTech Tracker</h1>
      <div>
        <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;