import { useDispatch } from "react-redux";
import { deleteVolunteer } from "../../slices/volunteerSlice";
import { useNavigate } from "react-router-dom";

export const VolunteerCard = ({ volunteer }) => {
  const {
    _id,
    name,
    contact: { phoneNumber, address },
    skills,
    interests,
    event: [{ eventDetails, role }]
  } = volunteer;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteVolunteer = (id) => {
    dispatch(deleteVolunteer(id));
  };

  return (
    <li key={_id} className="event-card">
      <header className="event-card-header">
        <h3 className="event-title">{name}</h3>
        <p className="event-date">
          <i className="fa-solid fa-phone"></i> {phoneNumber}
        </p>
      </header>
      <section className="event-card-details-section">
        <p className="event-details">
          <i className="fa-solid fa-house"></i> {address}
        </p>
      </section>
      <section className="btn-section-card">
        <button
          className="btn-secondary"
          onClick={() => navigate(`/volunteers/${_id}`)}
        >
          See Details
        </button>
        <button
          className="btn-secondary"
          onClick={() => handleDeleteVolunteer(_id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </section>
    </li>
  );
};
