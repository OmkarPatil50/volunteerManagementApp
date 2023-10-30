import { useDispatch } from "react-redux";
import "./EventCard.css";
import { deleteEvent } from "../../slices/eventSlice";
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event }) => {
  const getDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const { _id, name, date, location } = event;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };
  return (
    <li key={_id} className="event-card">
      <header className="event-card-header">
        <h3 className="event-title">{name}</h3>
        <p className="event-date">
          <i className="fa-solid fa-calendar-days"></i> {getDate(date)}
        </p>
      </header>
      <section className="event-card-details-section">
        <p className="event-details">
          <i className="fa-solid fa-location-dot"></i> {location}
        </p>
      </section>
      <section className="btn-section-card">
        <button
          className="btn-secondary"
          onClick={() => {
            navigate(`/events/${_id}`);
          }}
        >
          See Details
        </button>
        <button
          className="btn-secondary"
          onClick={() => handleDeleteEvent(_id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </section>
    </li>
  );
};
