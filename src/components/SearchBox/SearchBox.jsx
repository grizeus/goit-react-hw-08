const SearchBox = ({ value, onFilter }) => {
  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          name="search"
          value={value}
          onChange={e => onFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

export default SearchBox;
