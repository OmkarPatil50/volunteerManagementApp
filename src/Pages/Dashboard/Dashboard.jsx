import { Helmet } from "react-helmet";
import { ReactComponent as Image } from "../../Data/hero.svg";

import "../pages.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventSlice";
import { fetchVolunteers } from "../../slices/volunteerSlice";

export const Dashboard = () => {
  const { events } = useSelector((state) => state.events);
  const { volunteers } = useSelector((state) => state.volunteers);

  const dispatch = useDispatch();

  const calculateRequiredVolunteers = (events) => {
    return events.reduce((acc, curr) => {
      return (
        acc +
        parseFloat(
          curr.volunteersRequired.reduce(
            (total, currentRequirement) =>
              total + currentRequirement.requirement,
            0
          )
        )
      );
    }, 0);
  };

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, [dispatch]);
  return (
    <div className="main-page">
      <Helmet>
        <title>Eventeer | Dashboard</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Dashboard</h1>
      </header>
      <div className="sub-page">
        <section className="dashboard-section">
          <Image className="hero-img" />
        </section>
        <section className="dashboard-data dashboard-section">
          <p>
            {" "}
            ⛑ Total Events Happening:
            <span> {events.length} </span>{" "}
          </p>
          <p>
            ⛑ Requirement For Events:
            <span> {calculateRequiredVolunteers(events)} </span>
          </p>
          <p>
            {" "}
            ⛑ Total Volunteers Enrolled:
            <span> {volunteers.length} </span>
          </p>
          <p>
            {" "}
            ⛑ Net Volunteers Deficit :
            <span>
              {" "}
              {calculateRequiredVolunteers(events) - volunteers.length}{" "}
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};
