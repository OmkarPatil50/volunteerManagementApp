import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../details.css";
import { deleteEvent } from "../../slices/eventSlice";

export const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    volunteersRequired: []
  });

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    navigate("/events");
  };

  const getDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  useEffect(() => {
    const getEvent = events.find(({ _id }) => _id === eventId);
    setEvent(getEvent);
  }, [eventId, events, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1 className="page-heading">Event's Details</h1>
        </header>
        <section className="details-box">
          <h4>
            Name: <span>{event.name}</span>
          </h4>
          <h4>
            Date: <span>{getDate(event.date)}</span>
          </h4>
          <h4>
            Location: <span>{event.location}</span>
          </h4>
          <h4>
            Description: <span>{event.description}</span>
          </h4>
          <h4 className="requirement-list-heading">Volunteers Required: </h4>
          <ul className="requirement-list">
            {event.volunteersRequired.map(({ role, requirement }) => {
              return (
                <li className="requirement-list-item">
                  {role} : {requirement}
                </li>
              );
            })}
          </ul>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/events/edit/${event._id}`, {
                state: event
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              handleDelete(event._id);
              toast.success("Event Deleted Successfully");
            }}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
