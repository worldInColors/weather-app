import { Settings } from "lucide-react";
import Logo from "./Logo";
import UnitsDropdown from "./UnitsDropdown";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-2">
        <Logo />
        <UnitsDropdown icon={<Settings />} label="Units" />
      </ul>
    </nav>
  );
}

export default Navbar;
