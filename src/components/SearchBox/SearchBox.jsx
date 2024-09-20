import { useId } from "react";
import css from "./SearchBox.module.css";

const SearchBox = ({ value, onFilter }) => {
  const searchID = useId();
  return (
    <section title="Search box">
      <div className={css.wrapper}>
        <label htmlFor={searchID}>Find contacts by name</label>
        <input
          className={css["search-input"]}
          id={searchID}
          type="text"
          name="search"
          value={value}
          onChange={e => onFilter(e.target.value)}
        />
      </div>
    </section>
  );
};

export default SearchBox;
