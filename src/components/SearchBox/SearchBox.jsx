import { useId } from "react";

const SearchBox = ({ value, onFilter }) => {
  const searchID = useId();
  return (
    <div>
      <label htmlFor={searchID}>
        Search
        <input
          id={searchID}
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
