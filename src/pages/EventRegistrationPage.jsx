import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerParticipant } from "../redux/operations/participantsOperations.js";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EventRegistrationPage.module.css";
import { differenceInYears } from "date-fns";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EventRegistrationPage = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const navigate = useNavigate(); 

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Minimum 2 characters")
      .required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .test("age", "You must be at least 16 years old", (value) => {
        return differenceInYears(new Date(), value) >= 16;
      }),
    heardFrom: Yup.string().max(200, "Maximum 200 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  const onSubmit = async (data) => {
    const participantData = {
      ...data,
      event: eventId,
    };
    try {
      await dispatch(registerParticipant(participantData)).unwrap();
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.title}>Register</p>
      <p className={styles.message}>
        Signup now and get full access to our app.
      </p>

      <label className={styles.label}>
        <input
          type="text"
          {...register("fullName")}
          className={`${styles.input} ${
            errors.fullName ? styles.inputError : ""
          }`}
          placeholder=" "
        />
        <span>Full Name</span>
        {errors.fullName && (
          <p className={styles.error}>{errors.fullName.message}</p>
        )}
      </label>

      <label className={styles.label}>
        <input
          type="email"
          {...register("email")}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder=" "
        />
        <span>Email</span>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </label>

      <label className={styles.label}>
        <div
          className={`${styles.input} ${styles.datePickerWrapper} ${
            errors.dateOfBirth ? styles.inputError : ""
          }`}
        >
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setValue("dateOfBirth", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            placeholderText=" "
            popperClassName="custom-datepicker-popper"
          />
          <span>Date of Birth</span>
        </div>
        {errors.dateOfBirth && (
          <p className={styles.error}>{errors.dateOfBirth.message}</p>
        )}
      </label>

      <label className={styles.label}>
        <input
          type="text"
          {...register("heardFrom")}
          className={`${styles.input} ${
            errors.heardFrom ? styles.inputError : ""
          }`}
          placeholder=" "
        />
        <span>Heard From</span>
        {errors.heardFrom && (
          <p className={styles.error}>{errors.heardFrom.message}</p>
        )}
      </label>

      <button type="submit" className={styles.submit}>
        Register
      </button>
    </form>
  );
};
