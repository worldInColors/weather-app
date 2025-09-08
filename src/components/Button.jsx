function Button({ onClick, children, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-2 rounded text-sm transition-colors hover:bg-neutral-700 cursor-pointer ${
        isSelected ? "bg-neutral-700 " : ""
      }`}
    >
      <div className="flex justify-between items-center">
        {children}
        <span>{isSelected ? "✓" : ""}</span>
      </div>
    </button>
  );
}
export { Button };
