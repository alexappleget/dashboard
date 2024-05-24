import { useState } from "react";
import "../styles/adminhome.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheck, FaBriefcase } from "react-icons/fa";

function AdminHome({ taskCount }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState(false);

  const onChange = (date) => {
    setDate(date);
  };

  const addEvent = (title, description) => {
    const newEvent = {
      date: date,
      title: title,
      description: description,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    setDescription("");
  };

  const handleEvent = () => {
    addEvent(title, description);
    setEvent(false);
  };

  return (
    <div className="home-content">
      <h1 className="home-title">Dashboard</h1>
      <div className="dashboard-data">
        <div className="left-side">
          <div className="trackers">
            <div className="tasks">
              <h3 className="task-title">Ongoing Tasks</h3>
              <div className="task-stats">
                <div className="task-chart">
                  <FaBriefcase color="#4158d0" fontSize="20px" />
                </div>
                <div className="task-number">
                  <h3>Ongoing</h3>
                  <h3>{taskCount}</h3>
                </div>
              </div>
            </div>
            <div className="tasks">
              <h3 className="task-title">Completed Tasks</h3>
              <div className="task-stats">
                <div className="task-chart">
                  <FaCheck color="#4158d0" fontSize="20px" />
                </div>
                <div className="task-number">
                  <h3>Completed</h3>
                  <h3>4</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="events">
            <h2>Upcoming Events:</h2>
            <ul className="eventsUL">
              {events.map((event, index) => (
                <li className="event-list" key={index}>
                  <p>
                    {event.date.toDateString()} - {event.title}
                  </p>
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="calendar-div">
          <div className="calendar">
            <Calendar onChange={onChange} value={date} />
          </div>
          <button className="eventBtn" onClick={() => setEvent(true)}>
            Add Event
          </button>
        </div>
        {event && (
          <div className="event">
            <h1>Create an Event:</h1>
            <div className="event-info">
              <label htmlFor="title">Title of Event:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={handleEvent}>Create Event</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
