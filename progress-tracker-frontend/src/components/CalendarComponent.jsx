import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";
import AddProgressModal from "./AddProgressModal";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleClickDay(day) {
    setSelectedDate(day); // Update selected date
    setSelectedDate(day); // Keep for modal
    setIsModalOpen(true); // Open modal
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="">
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
