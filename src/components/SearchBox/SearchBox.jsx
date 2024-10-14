import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const searchID = useId();
  const value = useSelector(state => selectNameFilter(state));
  const dispatch = useDispatch();
  const handleChange = e => {
    const loweredValue = e.target.value.toLocaleLowerCase();
    dispatch(changeFilter(loweredValue));
  };

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
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default SearchBox;
