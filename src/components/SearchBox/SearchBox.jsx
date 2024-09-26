import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { FcSearch } from "react-icons/fc";
import { changeFilter } from "../../redux/filtersSlice";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filters.name);

  const onFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.description}>
        Find contacts by name <FcSearch className={css.icon} />
      </p>
      <input
        className={css.input}
        type="text"
        value={filterValue}
        onChange={onFilterChange}
      />
    </div>
  );
};
