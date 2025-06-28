import Logo from "@/assets/Logo";
import { Link } from "react-router";
import { ModeToggle } from "../mode-toogler";

const Navbar = () => {
  return (
    <nav className="max-w-7xl h-16 justify-between mx-auto flex items-center gap-3 px-5">
      <div className="flex p-4 items-center">
        <Logo /> <span className="font-bold ml-2">Task</span> Master
      </div>

      <Link to="/">Tasks</Link>
      <Link to="/user">User</Link>

      <div className="mx-auto">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
