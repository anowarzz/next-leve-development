import Logo from "@/assets/Logo";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto flex items-center gap-3 px-5">
      <div className="flex p-4 items-center">
        <Logo /> <span className="font-bold ml-2">Task</span> Master
      </div>

    <Link to="/">Tasks</Link>
    <Link to="/user">User</Link>

    </nav>
  );
};

export default Navbar;
