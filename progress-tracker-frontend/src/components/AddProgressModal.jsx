import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";

const categories = [
  "JS",
  "PYTHON",
  "C",
  "C++",
  "JAVA",
  "LINUX",
  "CS:APP",
  "CS50",
];

const AddProgressModal = ({ isOpen, onClose, date }) => {
  const [progressText, setProgressText] = useState("");
  const [fieldsObj, setFieldsObj] = useState([
    {
      hours: "",
      mins: "",
      category: "",
      text: "",
    },
  ]);

  useEffect(() => {
    if (!date) return;
    const url = `http://localhost:5000/api/get-progress?date=${date.toLocaleDateString()}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => setFieldsObj(data))
      .catch((err) => console.log("Fetch error: ", err));
  }, [date]);

  if (!isOpen) return null;

  function addField() {
    setFieldsObj((prev) => [
      ...prev,
      { hours: "", mins: "", category: "", text: "" },
    ]);
  }

  function handleFieldChange(index, field, value) {
    setFieldsObj((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }

  return createPortal(
    <div className="add-progress-modal absolute bg-my-gray h-[97vh] w-[40%] top-0 rounded-2xl left-100 border-black border px-10 py-7">
      <div className="title-bar flex justify-between items-center">
        <h2 className="font-bold text-3xl">Add progress</h2>
        <RxCross1 className="" size={20} onClick={onClose} />
      </div>
      <h3 className="date font-semibold text-2xl">
        {date.toLocaleDateString()}
      </h3>

      <div className="fields overflow-y-scroll max-h-[40vh] p-5">
        {fieldsObj.map((field, index) => (
          <div>
            {/* hours */}
            <input
              className="border outline-0 p-2 w-1/5"
              type="text"
              name="hours"
              max={24}
              min={0}
              value={field.hours}
              placeholder="hours"
              onChange={(e) =>
                handleFieldChange(index, "hours", e.target.value)
              }
            />
            {/* mins */}
            <input
              className="border outline-0 p-2 w-1/5"
              type="text"
              name="mins"
              max={60}
              min={0}
              value={field.mins}
              placeholder="mins"
              onChange={(e) => handleFieldChange(index, "mins", e.target.value)}
            />
            {/* category */}
            <select
              value={field.category}
              onChange={(e) =>
                handleFieldChange(index, "category", e.target.value)
              }
            >
              <option value={""}>Select category</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
            <br></br>
            <input
              type="text"
              className="border outline-0 p-2 w-full"
              value={field.text}
              onChange={(e) => handleFieldChange(index, "text", e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="text-blue font-semibold" onClick={addField}>
        + Add field
      </button>
      <textarea
        className="border outline-0 w-full h-1/3 resize-none p-3"
        name="raw-text"
        value={progressText}
        placeholder="enter raw text of your day here"
        onChange={(e) => setProgressText(e.target.value)}
      />
      <button className="bg-blue rounded-2xl text-white p-3">Save</button>
    </div>,
    document.body,
  );
};

export default AddProgressModal;
