// import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import useProgressData from "../hooks/useProgressData";
// import InputField from "./InputField";
import { postProgress } from "../helpers";
import WorkField from "./WorkField";

const AddProgressModal = ({ isOpen, onClose, date }) => {
  const {
    workFields,
    dayText,
    setDayText,
    addField,
    handleFieldChange,
    handleRemoveField,
    handleClose,
  } = useProgressData(date, onClose);

  // if modal is not opened, no need to render anything
  if (!isOpen) return null;

  return createPortal(
    <div className="add-progress-modal absolute bg-my-gray h-[97vh] w-[40%] top-0 left-100 border-black border rounded-2xl p-8">
      {/* cross icon */}
      <RxCross1
        className="absolute top-7 right-7"
        size={20}
        onClick={handleClose}
      />
      <div className="modal-content flex flex-col justify-start gap-5">
        {/* heading and date */}
        <h2 className="font-bold text-3xl text-center">Add progress</h2>
        <h3 className="date font-semibold text-2xl text-center">
          {date.toLocaleDateString()}
        </h3>

        {/* fields container with y-overflow */}
        <div className="fields overflow-y-auto max-h-[40vh] h-[40vh] pr-5">
          {/* rendering workFields with loop */}
          {workFields.map((field, index) => (
            <WorkField
              key={index}
              index={index}
              field={field}
              handleFieldChange={handleFieldChange}
              handleRemoveField={handleRemoveField}
            />
          ))}
        </div>
        {/* add field button */}
        <button className="text-blue font-semibold w-fit" onClick={addField}>
          + Add field
        </button>

        {/* day text field */}
        <textarea
          className="border outline-0 w-full h-1/4 resize-none p-3 focus:border-blue rounded focus:bg-white"
          name="raw-text"
          value={dayText}
          placeholder="enter raw text of your day here"
          onChange={(e) => setDayText(e.target.value)}
        />
        {/* save button */}
        <button
          className="bg-blue rounded-2xl text-white p-3 w-fit outline-0"
          onClick={() => postProgress(date, workFields, dayText)}
        >
          Save
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default AddProgressModal;
