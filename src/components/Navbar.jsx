import UnitsDropdown from "./UnitsDropdown";

function Navbar({ selectedOptions, setSelectedOptions }) {
  return (
    <div className="flex items-center justify-between">
      <img src="/logo.svg" />
      <UnitsDropdown
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
}

export default Navbar;
