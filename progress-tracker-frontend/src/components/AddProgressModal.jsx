import React, { useState } from "react";
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
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [category, setCategory] = useState("");

  if (!isOpen) return null;

  function handleCategorySelect(e) {
    setCategory(e.target.value);
    console.log(category);
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

      <input
        className="border outline-0 p-2 w-1/5"
        name="hours"
        type="number"
        max={24}
        min={0}
        value={hours}
        placeholder="hours"
        onChange={(e) => setHours(e.target.value)}
      />

      <input
        className="border outline-0 p-2 w-1/5"
        name="mins"
        type="number"
        max={60}
        min={0}
        value={mins}
        placeholder="mins"
        onChange={(e) => setMins(e.target.value)}
      />

      <select onChange={handleCategorySelect}>
        <option value={""}>Select category</option>
        {categories.map((category) => (
          <option key={category} value={category.toLocaleLowerCase()}>
            {category}
          </option>
        ))}
      </select>
      <br></br>
      <button className="text-blue-500">+ Add field</button>
      <textarea
        className="border outline-0 w-full h-1/3 resize-none p-3"
        name="raw-text"
        value={progressText}
        placeholder="enter raw text of your day here"
        onChange={(e) => setProgressText(e.target.value)}
      />
      <button className="bg-blue-600 rounded-2xl text-white p-3">Save</button>
    </div>,
    document.body,
  );
};

export default AddProgressModal;
