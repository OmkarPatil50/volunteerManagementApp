import { useDispatch, useSelector } from "react-redux";
import "../pages.css";
import { Helmet } from "react-helmet";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchEvents } from "../../slices/eventSlice";
import { EventCard } from "../../components/EventCard/EventCard";

export const Events = () => {
  const navigate = useNavigate();

  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="main-page">
      <Helmet>
        <title>Eventeer | Events</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Events</h1>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/add-event");
          }}
        >
          Add New Event
        </button>
      </header>
      <div className="event-page">
        <ul className="card-list">
          {events.map((event) => {
            return <EventCard event={event} key={event?._id} />;
          })}
        </ul>
      </div>
    </div>
  );
};
