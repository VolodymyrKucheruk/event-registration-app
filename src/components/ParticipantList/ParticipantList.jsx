import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectParticipants,
  selectParticipantsLoading,
  selectParticipantsError,
} from "../../redux/selectors/participantsSelectors";
import { fetchParticipants } from "../../redux/operations/participantsOperations";
import { Loader } from "../Loader/Loader";
import { useParams } from "react-router-dom";
import styles from "./ParticipantList.module.css";

import { format } from "date-fns";
import { selectEvents } from "../../redux/selectors/eventsSelectors";

export const ParticipantList = () => {
  const dispatch = useDispatch();
  const participants = useSelector(selectParticipants);
  const loading = useSelector(selectParticipantsLoading);
  const error = useSelector(selectParticipantsError);
  const { eventId } = useParams();
  const events = useSelector(selectEvents);
  const event = events.find((event) => event._id === eventId);
  const eventTitle = event ? event.title : "Unknown Event";

  useEffect(() => {
    if (eventId) {
      dispatch(fetchParticipants({ eventId }));
    }
  }, [dispatch, eventId]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.participantList}>
      <h2 className={styles.eventTitle}>Participants of {eventTitle}</h2>
      <ul className={styles.list}>
        {participants.map((participant) => (
          <li key={participant._id} className={styles.item}>
            <h3 className={styles.participantName}>{participant.fullName}</h3>
            <p className={styles.email}>
              <span>Email:</span> {participant.email}
            </p>
            <p className={styles.dateOfBirth}>
              <span>Date of Birth: </span>

              {format(new Date(participant.dateOfBirth), "yyyy-MM-dd")}
            </p>
            <p className={styles.heardFrom}>
              <span>Heard From:</span> {participant.heardFrom}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
