import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../pages.css";
import { useDispatch, useSelector } from "react-redux";
import { VolunteerCard } from "../../components/VolunteerCard/VolunteerCard";
import { useEffect } from "react";
import { fetchVolunteers } from "../../slices/volunteerSlice";

export const Volunteers = () => {
  const { volunteers } = useSelector((state) => state.volunteers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  return (
    <div className="main-page">
      <Helmet>
        <title>Eventeer | Volunteers</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Volunteers</h1>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/add-volunteer");
          }}
        >
          Add New Volunteer
        </button>
      </header>
      <div className="event-page">
        <ul className="card-list">
          {volunteers.map((volunteer) => {
            return <VolunteerCard volunteer={volunteer} key={volunteer._id} />;
          })}
        </ul>
      </div>
    </div>
  );
};
