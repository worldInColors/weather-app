import UnitsDropdown from "./UnitsDropdown";

function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <img src="/logo.svg" />
      <UnitsDropdown />
    </div>
  );
}

export default Navbar;
