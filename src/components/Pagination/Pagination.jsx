import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { setPage } from "../../redux/contacts/slice";
import { selectPaginationData } from "../../redux/contacts/selectors";
import styles from "./Pagination.module.css";

const cssClassBuilder = isActive =>
  clsx(styles.link, isActive && styles.active);

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector(selectPaginationData);

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) {
      return;
    }
    dispatch(setPage(page));
  };

  const renderPageButtons = () => {
    const range = 3;
    const buttons = [];

    for (
      let i = Math.max(1, page - range);
      i <= Math.min(totalPages, page + range);
      ++i
    ) {
      buttons.push(
        <button
          key={i}
          aria-label={`Page ${i}`}
          className={cssClassBuilder(page === i)}
          onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles["pagination-wrap"]}>
      <div className={styles.pagination}>
        <button
          aria-label="Previous page"
          className={cssClassBuilder(page === 1)}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}>
          Prev
        </button>
        {renderPageButtons()}
        <button
          aria-label="Next page"
          className={cssClassBuilder(page === totalPages)}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
