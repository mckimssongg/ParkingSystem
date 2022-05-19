import React from "react";

function Search({ searchValue, setSearchValue }) {
  const onSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="d-flex justify-content-center py-4">
      <input
        className="w-50 p-2"
        placeholder="Busqueda..."
        value={searchValue}
        onChange={onSearchValue}
      />
    </div>
  );
}

export default Search;
