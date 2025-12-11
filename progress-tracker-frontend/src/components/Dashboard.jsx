import React, { useEffect, useState } from "react";
import { get_options } from "./helpers";
import { FiShield } from "react-icons/fi";
import { months } from "../simpleData";

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonthIndex = currentDate.getMonth();

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [workFields, setWorkFields] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/get-month-progress?month=${selectedMonth}&year=${selectedYear}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => setWorkFields(data))
      .catch((err) => console.log("Fetch error: ", err));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="w-full">
      <div className="main w-4/5 m-auto flex flex-col gap-5 px-10 py-10">
        <div className="dashboard-heading h-40 flex items-center">
          <h1 className="text-5xl font-bold py-3">Dashboard</h1>
        </div>
        <div className="filter-fields flex gap-5 items-start">
          <select
            name="month"
            defaultValue={months[currentMonthIndex].toLowerCase()}
            onChange={(e) =>
              setSelectedMonth(
                months.findIndex(
                  (elem) => elem.toLowerCase() === e.target.value,
                ) + 1,
              )
            }
          >
            {/* render options */}
            {get_options(months)}
          </select>
          <select
            name="year"
            defaultValue={currentYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value={2022}>2024</option>
            <option value={2023}>2024</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
            <option value={2028}>2028</option>
          </select>
        </div>
        <table className="table-fixed border-collapse">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "auto" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Work Category</th>
              <th>Hours</th>
              <th>Mins</th>
              <th>Work text</th>
            </tr>
          </thead>
          <tbody>
            {workFields.map((field) => (
              <tr>
                <td>{field.date}</td>
                <td>{field.category}</td>
                <td>{field.hours}</td>
                <td>{field.mins}</td>
                <td>{field.work_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
