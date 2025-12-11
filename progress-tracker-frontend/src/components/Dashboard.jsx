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
        <table className="table-fixed border-collapse w-full text-sm">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "auto" }} />
          </colgroup>

          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 border-b">
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Work Category</th>
              <th className="p-3 font-medium">Hours</th>
              <th className="p-3 font-medium">Mins</th>
              <th className="p-3 font-medium">Work text</th>
            </tr>
          </thead>

          <tbody>
            {workFields.map((field, idx) => (
              <tr
                key={idx}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{field.date}</td>
                <td className="p-3">{field.category}</td>
                <td className="p-3">{field.hours}</td>
                <td className="p-3">{field.mins}</td>
                <td className="p-3">{field.work_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
