import React, { useEffect, useState } from "react";
import { months } from "../simpleData";

function useMonthProgress() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1; // getMonth() returns month number by 0-index so  + 1

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [workFields, setWorkFields] = useState([]);

  function handleYearSelect(e) {
    setSelectedYear(e.target.value);
  }
  function handleMonthSelect(e) {
    setSelectedMonth(
      months.findIndex((elem) => elem.toLowerCase() === e.target.value) + 1,
    );
  }

  // fetch data
  useEffect(() => {
    const url = `http://localhost:5000/api/get-month-progress?month=${selectedMonth}&year=${selectedYear}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => setWorkFields(data))
      .catch((err) => console.log("Fetch error: ", err));
  }, [selectedMonth, selectedYear]);

  return {
    workFields,
    handleYearSelect,
    handleMonthSelect,
    currentMonth,
    currentYear,
  };
}

export { useMonthProgress };
