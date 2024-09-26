import css from "./App.module.css";
import "modern-normalize";
import { FcContacts } from "react-icons/fc";
import { ContactList } from "./ContactList/ContactList";
import { SearchBox } from "./SearchBox/SearchBox";
import { ContactForm } from "./ContactForm/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import { selectIsLoading, selectError} from "../redux/selectors";
import { Loader } from "./Loader/Loader";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={css.deviceHeader}>
        <div className={css.deviceSensors}></div>
      </div>

      <h1 className={css.title}>
        Phonebook
        <FcContacts className={css.bookItem} />
      </h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <Loader />}
      <ContactList />
    </>
  );
};
