import React, { useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";

const AddProgressModal = ({ isOpen, onClose, date }) => {
  const [progressText, setProgressText] = useState("");
  if (!isOpen) return null;

  return createPortal(
    <div className="add-progress-modal absolute bg-my-gray h-[97vh] w-[40%] top-0 rounded-2xl left-100 border-black border px-10 py-7">
      <div className="title-bar flex justify-between items-center">
        <h2 className="font-bold text-3xl">Add progress</h2>
        <RxCross1 className="" size={20} onClick={onClose} />
      </div>
      <h3 className="date font-semibold text-2xl">
        {date.toLocaleDateString()}
      </h3>
      <textarea
        className="border outline-0 w-full h-1/3 resize-none p-3"
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
