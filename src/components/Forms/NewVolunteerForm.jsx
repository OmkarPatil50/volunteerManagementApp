import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./forms.css";
import { addVolunteer, updateVolunteer } from "../../slices/volunteerSlice";
import { fetchEvents } from "../../slices/eventSlice";

export const NewVolunteerForm = () => {
  const [newVolunteer, setNewVolunteer] = useState({
    name: "",
    age: "",
    gender: "",
    contact: { phoneNumber: 0, address: "" },
    skills: [],
    interests: [],
    event: []
  });
  const [inputs, setInputs] = useState({
    skills: "",
    interests: "",
    event: "all"
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState(false);

  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
    if (location.state) {
      setIsEditForm(true);
      setNewVolunteer(location.state);
    }
  }, []);

  const eventValue = [
    {
      eventDetails: "653e162fb428eeabde37a78a",
      role: "653e162fb428eeabde37a78b"
    }
  ];

  const fillTestCred = () => {
    setNewVolunteer({
      name: "Test Volunteer",
      age: 12,
      gender: "Male",
      contact: { phoneNumber: 123456789, address: "This is my address" },
      skills: ["Management"],
      interests: ["Festival Events"],
      event: eventValue
    });

    setInputs({ skills: "", interests: "", event: "all" });
  };

  const handleVolunteerFormSubmit = () => {
    if (isEditForm) {
      dispatch(updateVolunteer({ id: location.state._id, newVolunteer }));
    } else {
      dispatch(addVolunteer(newVolunteer));
    }
    setIsEditForm(false);
    setNewVolunteer({
      name: "",
      age: "",
      gender: "",
      contact: { phoneNumber: 0, address: "" },
      skills: [],
      interests: [],
      event: []
    });
    setInputs({ skills: "", interests: "", event: "all" });
    navigate("/volunteers");
  };

  const filterEvents = events.filter(({ _id }) => {
    return !newVolunteer.event.some((item) => item === _id);
  });
  const getEvent = events.find(({ _id }) => {
    return _id === inputs.event.eventDetails;
  });

  return (
    <div className="main-page">
      <h1 className="page-heading">{`${
        location.state ? "Update" : "Add New"
      } Volunteer`}</h1>
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
              placeholder="John Doe"
              value={newVolunteer.name}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  name: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset className="flex-column-fieldset">
          <legend>Age</legend>
          <label htmlFor="age">
            <input
              className="form-input"
              required
              type="number"
              placeholder="23"
              value={newVolunteer.age}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  age: event.target.value
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset className="flex-column-fieldset">
          <legend>Phone Number</legend>
          <label htmlFor="phoneNumber">
            <input
              className="form-input"
              required
              placeholder="9896435545"
              type="tel"
              value={
                newVolunteer.contact.phoneNumber === 0
                  ? ""
                  : newVolunteer.contact.phoneNumber
              }
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  contact: {
                    ...newVolunteer.contact,
                    phoneNumber: event.target.value
                  }
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset className="flex-column-fieldset">
          <legend>Address</legend>
          <label htmlFor="address">
            <input
              type="text"
              className="form-input"
              required
              name="address"
              placeholder="New York City, USA"
              value={newVolunteer.contact.address}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  contact: {
                    ...newVolunteer.contact,
                    address: event.target.value
                  }
                }));
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Gender</legend>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newVolunteer.gender === "Male"}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  gender: "Male"
                }));
              }}
            />{" "}
            Male
          </label>
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newVolunteer.gender === "Female"}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  gender: "Female"
                }));
              }}
            />{" "}
            Female
          </label>{" "}
          <label htmlFor="gender" className="form-radio-input">
            <input
              required
              type="radio"
              name="gender"
              checked={newVolunteer.gender === "Other"}
              onChange={(event) => {
                setNewVolunteer(() => ({
                  ...newVolunteer,
                  gender: "Other"
                }));
              }}
            />{" "}
            Other
          </label>
        </fieldset>
        <fieldset className="flex-column-fieldset">
          <legend>Skills</legend>
          <section className="form-inputs-main">
            <label htmlFor="skills">
              <input
                className="form-input"
                required
                type="text"
                placeholder="Management"
                value={inputs.skills}
                onChange={(event) => {
                  setInputs(() => ({ ...inputs, skills: event.target.value }));
                }}
              />
            </label>
            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (inputs.skills) {
                  setNewVolunteer(() => ({
                    ...newVolunteer,
                    skills: [...newVolunteer.skills, inputs.skills]
                  }));
                  setInputs(() => ({ ...inputs, skills: "" }));
                }
              }}
            >
              +
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newVolunteer.skills.map((item, index) => {
              const indexToDelete = index;
              return (
                <li key={index} className="form-input-tag">
                  <p>{item}</p>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewVolunteer(() => ({
                        ...newVolunteer,
                        skills: newVolunteer.skills.filter(
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
        <fieldset className="flex-column-fieldset">
          <legend>Interests</legend>
          <section className="form-inputs-main">
            <label htmlFor="interests">
              <input
                className="form-input"
                required
                type="text"
                placeholder="Event Management"
                value={inputs.interests}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    interests: event.target.value
                  }));
                }}
              />
            </label>
            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (inputs.interests) {
                  setNewVolunteer(() => ({
                    ...newVolunteer,
                    interests: [...newVolunteer.interests, inputs.interests]
                  }));
                  setInputs(() => ({ ...inputs, interests: "" }));
                }
              }}
            >
              +
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newVolunteer.interests.map((item, index) => {
              const indexToDelete = index;
              return (
                <li key={index} className="form-input-tag">
                  <p>{item}</p>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewVolunteer(() => ({
                        ...newVolunteer,
                        interests: newVolunteer.interests.filter(
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
        <fieldset className="flex-column-fieldset">
          <legend>Select Event</legend>
          <section className="form-inputs-main">
            <label htmlFor="event">
              <select
                className="form-input mb-10"
                required
                name="event-name"
                placeholder="Christmas Party"
                value={
                  inputs.event.eventDetails
                    ? inputs.event.eventDetails
                    : inputs.event
                }
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    event: { eventDetails: event.target.value, role: "" }
                  }));
                }}
              >
                <option value="all">Select Event</option>
                {filterEvents.map(({ _id, name }) => {
                  return <option value={_id}>{name}</option>;
                })}
              </select>
              <select
                className="form-input"
                required
                name="event-role"
                placeholder="Manage r"
                value={inputs.event.role ? inputs.event.role : "all"}
                onChange={(event) => {
                  setInputs(() => ({
                    ...inputs,
                    event: { ...inputs.event, role: event.target.value }
                  }));
                }}
              >
                <option value="all">Select Role</option>
                {inputs.event.eventDetails
                  ? getEvent.volunteersRequired
                      .filter(({ _id }) => {
                        return !newVolunteer.event.some(
                          (item) => item.role === _id
                        );
                      })
                      .map(({ _id, role }) => {
                        return <option value={_id}>{role}</option>;
                      })
                  : ""}
              </select>
            </label>
            <button
              className="btn-primary btn-form-add-value"
              onClick={() => {
                if (inputs.event !== "all") {
                  setNewVolunteer(() => ({
                    ...newVolunteer,
                    event: [...newVolunteer.event, inputs.event]
                  }));
                  setInputs(() => ({ ...inputs, event: "all" }));
                }
              }}
            >
              Add Event
            </button>
          </section>
          <ul className="form-input-tags-list">
            {newVolunteer.event.map((item, index) => {
              const indexToDelete = index;
              const getEvent = events.find(({ _id }) => {
                const value = isEditForm
                  ? item.eventDetails._id
                  : item.eventDetails;
                return _id === value;
              });

              const getRole = getEvent?.volunteersRequired.find(({ _id }) => {
                return _id === item.role;
              });

              return (
                <li key={index} className="form-input-tag">
                  <p>
                    {" "}
                    {getEvent?.name} : {getRole?.role}{" "}
                  </p>
                  <button
                    className="delete-tag-form"
                    onClick={() => {
                      setNewVolunteer(() => ({
                        ...newVolunteer,
                        event: newVolunteer.event.filter(
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
              newVolunteer.name.length &&
              newVolunteer.age > 0 &&
              newVolunteer.gender.length &&
              newVolunteer.contact.phoneNumber > 0 &&
              newVolunteer.contact.address.length &&
              newVolunteer.skills.length &&
              newVolunteer.interests.length &&
              newVolunteer.event.length
            ) {
              handleVolunteerFormSubmit();
            }
          }}
        >
          {isEditForm ? "Update" : "Add"}
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setNewVolunteer({
              name: "",
              age: "",
              gender: "",
              contact: { phoneNumber: 0, address: "" },
              skills: [],
              interests: [],
              event: []
            });
            setInputs({
              skills: "",
              interests: "",
              event: "all"
            });
            setIsEditForm(false);
            navigate("/volunteers");
          }}
        >
          Discard
        </button>
      </section>
    </div>
  );
};
