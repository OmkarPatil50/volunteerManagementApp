import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "../details.css";
import { deleteVolunteer } from "../../slices/volunteerSlice";

export const VolunteerDetails = () => {
  const { volunteerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { volunteers } = useSelector((state) => state.volunteers);
  const { events } = useSelector((state) => state.events);

  const [volunteer, setVolunteer] = useState({
    name: "",
    contact: { phoneNumber: 0, address: "" },
    skills: [],
    interests: [],
    event: [{ eventDetails: "", role: "" }]
  });

  const handleDelete = (id) => {
    dispatch(deleteVolunteer(id));
    navigate("/volunteers");
  };

  useEffect(() => {
    const getVolunteers = volunteers.find(({ _id }) => _id === volunteerId);

    setVolunteer(getVolunteers);
  }, [volunteerId, volunteers, dispatch]);

  return (
    <div className="main-page">
      <div className="sub-page flex-column">
        <header>
          <h1 className="page-heading">Volunteer's Details</h1>
        </header>
        <section className="details-box">
          <h4>
            Name: <span>{volunteer.name}</span>
          </h4>
          <h4>
            Phone No: <span>{volunteer.contact.phoneNumber}</span>
          </h4>
          <h4>
            Address: <span>{volunteer.contact.address}</span>
          </h4>
          <h4 className="requirement-list-heading"> Skills: </h4>
          <ul className="requirement-list">
            {volunteer.skills.map((skill, index) => {
              return (
                <li key={index} className="requirement-list-item">
                  {skill}
                </li>
              );
            })}
          </ul>
          <h4 className="requirement-list-heading"> Interests: </h4>
          <ul className="requirement-list">
            {volunteer.interests.map((interest, index) => {
              return (
                <li key={index} className="requirement-list-item">
                  {interest}
                </li>
              );
            })}
          </ul>
          <h4 className="requirement-list-heading"> Events: </h4>
          <ul className="requirement-list">
            {volunteer.event.map((item, index) => {
              const getRole = () => {
                const result = item.eventDetails?.volunteersRequired?.find(
                  ({ _id }) => {
                    return _id === item.role;
                  }
                );
                return result?.role;
              };
              return (
                <li key={index} className="requirement-list-item">
                  {item.eventDetails.name} : {getRole()}
                </li>
              );
            })}
          </ul>
        </section>
        <section className="btn-section-details">
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/volunteers/edit/${volunteer._id}`, {
                state: volunteer
              });
            }}
          >
            Edit Details
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              handleDelete(volunteer._id);
              toast.success("Volunteer Deleted Successfully");
            }}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};
