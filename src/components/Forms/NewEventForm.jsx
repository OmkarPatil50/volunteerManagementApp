import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./forms.css";

import { addEvent, fetchEvents, updateEvent } from "../../slices/eventSlice";

export const NewEventForm = () => {
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    volunteersRequired: []
  });
  const [inputs, setInputs] = useState({
    role: "",
    requirement: 0
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  const getDateInFormat = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    dispatch(fetchEvents());
    if (location.state) {
      setIsEditForm(true);
      setNewEvent({
        ...location.state,
        date: getDateInFormat(location.state.date)
      });
    }
  }, []);

  const fillTestCred = () => {
    setNewEvent({
      name: "Test Event",
      date: "2022-10-25",
      location: "Test Location",
      description: "This is test description of the event",
      volunteersRequired: [
        {
          role: "Test Role",
          requirement: 10
        }
      ]
    });
    setInputs({ role: "", requirement: 0 });
  };

  const handleEventFormSubmit = () => {
    if (isEditForm) {
      dispatch(updateEvent({ _id: location.state._id, newEvent }));
    } else {
      dispatch(addEvent(newEvent));
    }
    setIsEditForm(false);
    setNewEvent({
      name: "",
      date: "",
      location: "",
      description: "",
      volunteersRequired: []
    });
    setInputs({ role: "", requirement: 0 });
    navigate("/events");
  };

  return (
    <div className="main-page">
      <h1 className="page-heading">{`${
        location.state ? "Update" : "Add New"
      } Event`}</h1>
      {!isEditForm ? (
        <button className="btn-primary" onClick={fillTestCred}>
          Fill Test Credentials
        </button>
      ) : (
        ""
      )}

      <div className="form">
        <fieldset className="flex-column-fieldset">
          <legend>Name</legend>
          <label htmlFor="name">
            <input
              className="form-input"
              required
              type="text"
              placeholder="Christmas Party"
              value={newEvent.name}
              onChange={(event) => {
                setNewEvent(() => ({
                  ...newEvent,
                  name: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Date</legend>
          <label htmlFor="date">
            <input
              className="form-input"
              required
              type="date"
              value={newEvent.date}
              onChange={(event) => {
                setNewEvent(() => ({
                  ...newEvent,
                  date: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Location</legend>
          <label htmlFor="location">
            <input
              className="form-input"
              required
              type="text"
              placeholder="White House, USA"
              value={newEvent.location}
              onChange={(event) => {
                setNewEvent(() => ({
                  ...newEvent,
                  location: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Description</legend>
          <label htmlFor="description">
            <input
              className="form-input"
              required
              type="text"
              placeholder="Christmas Party arranged by first lady of USA for her friends"
              value={newEvent.description}
              onChange={(event) => {
                setNewEvent(() => ({
                  ...newEvent,
                  description: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>

        <fieldset className="flex-column-fieldset">
          <legend>Volunteers Requierd</legend>
          <section className="form-inputs-main">
            <label htmlFor="role">
              <input
                className="form-input multiple-input"
                required
                type="text"
                placeholder="Role"
                value={inputs.role}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    role: event.target.value
                  }));
                }}
              />
            </label>
            <label htmlFor="requirement">
              <input
                className="form-input multiple-input"
                required
                type="number"
                placeholder="21"
                value={inputs.requirement === 0 ? "" : inputs.requirement}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    requirement: event.target.value
                  }));
                }}
              />
            </label>
            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (inputs.role && inputs.requirement > 0) {
                  setNewEvent(() => ({
                    ...newEvent,
                    volunteersRequired: [...newEvent.volunteersRequired, inputs]
                  }));
                  setInputs({ role: "", requirement: 0 });
                }
              }}
            >
              +
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newEvent.volunteersRequired.map((item, index) => {
              const indexToDelete = index;

              return (
                <li key={index} className="form-input-tag">
                  <p>
                    {item.role} : {item.requirement}
                  </p>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewEvent(() => ({
                        ...newEvent,
                        volunteersRequired: newEvent.volunteersRequired.filter(
                          (item, index) => index !== indexToDelete
                        )
                      }));
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>
      <section className="btn-section-form">
        <button
          className="btn-primary"
          onClick={() => {
            if (
              newEvent.name.length &&
              newEvent.date &&
              newEvent.location.length &&
              newEvent.description.length &&
              newEvent.volunteersRequired.length
            ) {
              handleEventFormSubmit();
            }
          }}
        >
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewEvent({
              name: "",
              date: "",
              location: "",
              description: "",
              volunteersRequired: []
            });
            setInputs({
              role: "",
              requirement: 0
            });
            setIsEditForm(false);
            navigate("/events");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
