import "./styles.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { Volunteers } from "./Pages/Volunteers/Volunteers";
import { Events } from "./Pages/Events/Events";
import { NewVolunteerForm } from "./components/Forms/NewVolunteerForm";
import { NewEventForm } from "./components/Forms/NewEventForm";
import { EventDetails } from "./Pages/EventDetails/EventDetails";
import { VolunteerDetails } from "./Pages/VolunteerDetails/VolunteerDetails";
import { Loader } from "./components/Loader/Loader";
import { VolunteersReport } from "./Pages/VolunteersReport/VolunteersReport";

export default function App() {
  const volunteersState = useSelector((state) => state.volunteers);
  const eventsState = useSelector((state) => state.events);

  return (
    <div className="App">
      {volunteersState.status === "loading" ||
      eventsState.status === "loading" ? (
        <Loader />
      ) : (
        ""
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<VolunteersReport />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/add-volunteer" element={<NewVolunteerForm />} />
        <Route path="/events" element={<Events />} />
        <Route path="/add-event" element={<NewEventForm />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/events/edit/:eventId" element={<NewEventForm />} />
        <Route path="/volunteers/:volunteerId" element={<VolunteerDetails />} />
        <Route
          path="/volunteers/edit/:volunteerId"
          element={<NewVolunteerForm />}
        />
      </Routes>
    </div>
  );
}
