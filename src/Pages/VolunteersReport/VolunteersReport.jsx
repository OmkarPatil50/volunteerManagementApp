import { Helmet } from "react-helmet";

import "../pages.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventSlice";
import { fetchVolunteers } from "../../slices/volunteerSlice";

export const VolunteersReport = () => {
  const { events } = useSelector((state) => state.events);
  const { volunteers } = useSelector((state) => state.volunteers);

  const dispatch = useDispatch();

  const calculateEnrolledVolunteers = (roleId) => {
    return volunteers.reduce((acc, curr) => {
      return curr.event.some((item) => {
        return item.role === roleId;
      })
        ? acc + 1
        : acc;
    }, 0);
  };

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, [dispatch]);
  return (
    <div className="main-page">
      <Helmet>
        <title>Eventeer | Report</title>
      </Helmet>
      <header>
        <h1 className="page-heading">Volunteers' Report</h1>
      </header>
      <div className="sub-page">
        <section className="dashboard-section">
          <table className="report-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Volunteer Role</th>
                <th>Volunteers Required</th>
                <th>Volunteers Enrolled</th>
                <th>Volunteers Deficit</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const { _id, name, date, location, volunteersRequired } = event;
                return volunteersRequired.map((volunteer, index) => {
                  const { role, requirement } = volunteer;
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{getDate(date)}</td>
                      <td>{role}</td>
                      <td>{requirement}</td>
                      <td>{calculateEnrolledVolunteers(volunteer._id)}</td>
                      <td>
                        {parseFloat(requirement) -
                          parseFloat(
                            calculateEnrolledVolunteers(volunteer._id)
                          )}
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
