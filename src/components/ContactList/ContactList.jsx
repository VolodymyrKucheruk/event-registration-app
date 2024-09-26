import { Contact } from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/selectors.js";
import { selectFilter } from "../../redux/selectors.js";

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.wrapper}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} value={contact} />
      ))}
    </ul>
  );
};
