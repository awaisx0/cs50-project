import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import useProgressData from "../hooks/useProgressData";
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
    <div
      className="absolute bg-gray-500  w-screen h-screen top-0 left-0"
      onClick={handleClose}
    >
      <div
        className="add-progress-modal relative bg-my-gray h-[95%] w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      border-black border rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* cross icon */}
        <RxCross1
          className="absolute top-7 right-7"
          size={20}
          onClick={handleClose}
        />
        <div className="modal-content flex flex-col justify-start items-start gap-5">
          {/* heading and date */}
          <h2 className="text-center">Add progress</h2>
          <h3 className="date text-center">{date}</h3>

          {/* fields container with y-overflow */}
          <div className="fields overflow-y-auto h-[40vh]">
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
          <button className="text-blue font-semibold" onClick={addField}>
            + Add field
          </button>

          {/* day text field */}
          <textarea
            className="w-full h-1/4 p-3 rounded focus:border-blue focus:bg-white"
            name="raw-text"
            value={dayText}
            placeholder="enter raw text of your day here"
            onChange={(e) => setDayText(e.target.value)}
          />
          {/* save button */}
          <button
            className="bg-blue rounded-2xl text-white p-3 outline-0"
            onClick={() => postProgress(date, workFields, dayText)}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddProgressModal;
