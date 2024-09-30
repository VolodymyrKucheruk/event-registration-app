import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEvents,
  selectEventsError,
  selectHasMoreEvents,
} from "../../redux/selectors/eventsSelectors";
import { fetchEvents } from "../../redux/operations/eventsOperations";
import { resetEvents } from "../../redux/slices/eventsSlice";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./EventBoard.module.css";
import { format } from "date-fns";

export const EventBoard = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  const error = useSelector(selectEventsError);
  const hasMore = useSelector(selectHasMoreEvents);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterOrganizer, setFilterOrganizer] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  const applyFilters = () => {
    dispatch(resetEvents());
    setPage(1);
    dispatch(
      fetchEvents({
        page: 1,
        sortBy,
        order,
        title: filterTitle,
        organizer: filterOrganizer,
        eventDateFrom: filterDateFrom,
        eventDateTo: filterDateTo,
      })
    );
  };

  useEffect(() => {
    dispatch(resetEvents());
    setPage(1);
    dispatch(
      fetchEvents({
        page: 1,
        sortBy,
        order,
        title: filterTitle,
        organizer: filterOrganizer,
        eventDateFrom: filterDateFrom,
        eventDateTo: filterDateTo,
      })
    );
  }, [
    dispatch,
    sortBy,
    order,
    filterTitle,
    filterOrganizer,
    filterDateFrom,
    filterDateTo,
  ]);

  const fetchMoreEvents = () => {
    const nextPage = page + 1;
    dispatch(
      fetchEvents({
        page: nextPage,
        sortBy,
        order,
        title: filterTitle,
        organizer: filterOrganizer,
        eventDateFrom: filterDateFrom,
        eventDateTo: filterDateTo,
      })
    );
    setPage(nextPage);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.eventBoard}>
      <div className={styles.titleWrapper}>
        <h2>Event Board</h2>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="title">Sort by Title</option>
            <option value="eventDate">Sort by Date</option>
            <option value="organizer">Sort by Organizer</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className={styles.filterWrapper}>
        <input
          type="text"
          placeholder="Filter by Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="text"
          placeholder="Filter by Organizer"
          value={filterOrganizer}
          onChange={(e) => setFilterOrganizer(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="date"
          placeholder="From Date"
          value={filterDateFrom}
          onChange={(e) => setFilterDateFrom(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="date"
          placeholder="To Date"
          value={filterDateTo}
          onChange={(e) => setFilterDateTo(e.target.value)}
          className={styles.filterInput}
        />
        <button onClick={applyFilters} className={styles.filterButton}>
          Apply Filters
        </button>
      </div>

      <InfiniteScroll
        dataLength={events.length}
        next={fetchMoreEvents}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p className={styles.loader}>No more events...</p>}
        className={styles.infiniteScroll}
        style={{ overflow: "visible" }}
      >
        <ul className={styles.eventList}>
          {events.map((event, index) => (
            <li key={`${event._id}-${index}`} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.icon}></span>
                <p className={styles.alert}>{event.title}</p>
              </div>

              <p className={styles.message}>{event.description}</p>
              <div className={styles.timeWrapper}>
                <p className={styles.date}>
                  {format(new Date(event.eventDate), "yyyy-MM-dd HH:mm")}
                </p>
                <p className={styles.organizer}>{event.organizer}</p>
              </div>

              <div className={styles.actions}>
                <Link
                  to={`/register/${event._id}`}
                  className={styles.registerLink}
                >
                  Register
                </Link>
                <Link
                  to={`/participants/${event._id}`}
                  className={styles.viewLink}
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
