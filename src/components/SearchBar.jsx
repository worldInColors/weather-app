function SearchBar() {
  return (
    <div className="flex items-center bg-neutral-700 p-3 text-neutral-200 rounded-xl gap-3 mt-8">
      <img
        src="/images/icon-search.svg"
        alt="Search"
        className="w-5 h-5 opacity-70"
      />
      <input
        type="text"
        placeholder="Search for a place..."
        className="bg-transparent outline-none flex-1 font-dm-sans placeholder:text-neutral-300"
      />
    </div>
  );
}

export default SearchBar;
