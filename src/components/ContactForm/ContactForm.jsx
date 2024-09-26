import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContacts } from "../../redux/operations";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("This is a required field"),
  number: Yup.string()
    .min(7, "Number is not correct, minimum 7 characters")
    .required("Phone number is required"),
});

export const ContactForm = () => {
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();
  const dispatch = useDispatch();

  const handleInputChange = (e, setFieldValue) => {
    let { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(
      /(\d{3})(\d{2})(\d{2})/,
      "$1-$2-$3"
    );
    const limitedValue = formattedValue.slice(0, 9);
    setFieldValue("number", limitedValue);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(addContacts({ id: nanoid(), ...values }));
        actions.resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.formGroup}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.formGroupNumber}>
            <label className={css.label} htmlFor={numberFieldId}>
              Number
            </label>
            <Field
              className={css.input}
              type="tel"
              name="number"
              id={numberFieldId}
              onChange={(e) => handleInputChange(e, setFieldValue)}
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
