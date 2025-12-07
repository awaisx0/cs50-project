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
  const [dayText, setDayText] = useState("");
  const [fieldsObj, setFieldsObj] = useState([
    {
      hours: "",
      mins: "",
      category: "",
      work_text: "",
    },
  ]);

  useEffect(() => {
    if (!date) return;
    const url = `http://localhost:5000/api/get-progress?date=${date.toLocaleDateString()}`;

    fetch(url)
      .then((res) => {
        // if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.work_fields) return;
        setFieldsObj(data.work_fields);
        if (!data.day_text.raw_text) return;
        setDayText(data.day_text.raw_text);
        return;
      })
      .catch((err) => console.log("Fetch error: ", err));
  }, [date]);

  if (!isOpen) return null;

  function handleClose() {
    onClose();
    setFieldsObj([
      {
        hours: "",
        mins: "",
        category: "",
        work_text: "",
      },
    ]);
  }

  async function handleSaveProgresstoDB() {
    const response = await fetch("http://localhost:5000/api/save-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date.toLocaleDateString(),
        work_fields: fieldsObj,
        day_text: dayText,
      }),
    });
    console.log(response);
  }

  function addField() {
    setFieldsObj((prev) => [
      ...prev,
      { hours: "", mins: "", category: "", work_text: "" },
    ]);
  }
  function handleRemoveField(index) {
    setFieldsObj((prev) => prev.filter((_, i) => i !== index));
  }

  function handleFieldChange(index, field, value) {
    setFieldsObj((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }

  return createPortal(
    <div className="add-progress-modal absolute bg-my-gray h-[97vh] w-[40%] top-0 left-100 border-black border rounded-2xl p-8">
      <RxCross1
        className="absolute top-7 right-7"
        size={20}
        onClick={handleClose}
      />
      <div className="modal-content flex flex-col justify-start gap-5">
        <h2 className="font-bold text-3xl text-center">Add progress</h2>
        <h3 className="date font-semibold text-2xl text-center">
          {date.toLocaleDateString()}
        </h3>

        <div className="fields overflow-y-auto max-h-[40vh] h-[40vh] pr-5">
          {fieldsObj.map((field, index) => (
            <div className="hover:bg-gray-300 p-3 rounded flex gap-2 flex-col">
              <div className="flex justify-between items-center">
                {/* hours */}
                <div className="flex gap-2">
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
                    onChange={(e) =>
                      handleFieldChange(index, "mins", e.target.value)
                    }
                  />
                  {/* category */}
                  <select
                    name="category"
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
                </div>
                <RxCross1 size={25} onClick={() => handleRemoveField(index)} />
              </div>
              <input
                type="text"
                placeholder="work text"
                className="border outline-0 p-2 w-full"
                value={field.work_text}
                onChange={(e) =>
                  handleFieldChange(index, "work_text", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <button className="text-blue font-semibold w-fit" onClick={addField}>
          + Add field
        </button>

        <textarea
          className="border outline-0 w-full h-1/4 resize-none p-3 focus:border-blue rounded focus:bg-white"
          name="raw-text"
          value={dayText}
          placeholder="enter raw text of your day here"
          onChange={(e) => setDayText(e.target.value)}
        />
        <button
          className="bg-blue rounded-2xl text-white p-3 w-fit outline-0"
          onClick={handleSaveProgresstoDB}
        >
          Save
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default AddProgressModal;
