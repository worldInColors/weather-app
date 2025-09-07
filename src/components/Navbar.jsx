import Dropdown from "./Dropdown";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-2">
        <Logo />
        <Dropdown />
      </ul>
    </nav>
  );
}

export default Navbar;
