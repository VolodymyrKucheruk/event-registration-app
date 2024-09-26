import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { FcPhone, FcReading } from "react-icons/fc";
import { deleteContacts } from "../../redux/operations";

export const Contact = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <>
      <li className={css.items}>
        <p className={css.nameItem}>
          <FcReading className={css.icons} />
          {value.name}
        </p>
        

        
        <p className={css.numberItem}>
          <FcPhone className={css.icons} />
          {value.number}
        </p>
        <button
          className={css.btn}
          onClick={() => dispatch(deleteContacts(value.id))}
        >
          Delete
        </button>
      </li>
    </>
  );
};
