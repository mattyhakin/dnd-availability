import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function App() {
  const [events, setEvents] = useState([]);

  //✅ Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "availability"));
      const fetchedEvents = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
        start: new Date(docSnap.data().start),
        end: new Date(docSnap.data().end)
      }));
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  // ✅ Add new event
  const handleSelectSlot = async (slotInfo) => {
    const title = prompt("Enter your name or note:");
    if (title) {
      const newEvent = { start: slotInfo.start, end: slotInfo.end, title };
      const docRef = await addDoc(collection(db, "availability"), {
        ...newEvent,
        start: newEvent.start.toISOString(),
        end: newEvent.end.toISOString()
      });
      setEvents([...events, { ...newEvent, id: docRef.id }]);
    }
  };

  // ✅ Edit or Delete event
  const handleSelectEvent = async (event) => {
    const action = prompt(`Type "edit" to change or "delete" to remove this entry:`);
    if (action === "delete") {
      await deleteDoc(doc(db, "availability", event.id));
      setEvents(events.filter(e => e.id !== event.id));
    } else if (action === "edit") {
      const newTitle = prompt("Enter new name or note:", event.title);
      if (newTitle) {
        await updateDoc(doc(db, "availability", event.id), { title: newTitle });
        setEvents(events.map(e => e.id === event.id ? { ...e, title: newTitle } : e));
      }
    }
  };

  // ✅ Color coding logic
  const colors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336", "#00bcd4"];
  const getColorForName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = getColorForName(event.title);
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        padding: "2px 4px"
      }
    };
  };

  // ✅ Legend for player colors
  const uniqueNames = [...new Set(events.map(e => e.title))];

  return (
    <div className="calendar-container" style={{ padding: "20px" }}>
      <h2>D&D Player Availability</h2>

      {/* Legend */}
      <div className="legend" style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap" }}>
        {uniqueNames.map(name => (
          <div key={name} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
            <span style={{
              width: "16px",
              height: "16px",
              backgroundColor: getColorForName(name),
              display: "inline-block",
              marginRight: "6px",
              borderRadius: "3px"
            }}></span>
            <span>{name}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: "80vh" }}
      />
    </div>
  );
}