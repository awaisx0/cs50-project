import { useState } from "react";
import Calendar from "react-calendar";
import AddProgressModal from "./AddProgressModal";
// react-calendar css
import "react-calendar/dist/Calendar.css";
// for some css overwrite and resizing to calendar
import "./CalendarComponent.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  // addProgress Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function dateToYMD(date) {
    return date.toLocaleDateString("en-CA");
  }

  // updates selectedDate on click to a date and opens modal
  function handleClickDay(day) {
    setDate(day); // Keep for modal
    // Update selected date ISO format
    setSelectedDate(dateToYMD(day));
    setIsModalOpen(true); // Open modal
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="">
      {/* Calendar component */}
      <Calendar onChange={setDate} value={date} onClickDay={handleClickDay} />
      <AddProgressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDate}
      />
    </div>
  );
};

export default CalendarComponent;
