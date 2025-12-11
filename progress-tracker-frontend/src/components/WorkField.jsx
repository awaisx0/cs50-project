import React from "react";
import { get_options } from "./helpers";
import { categories } from "../simpleData";
import { RxCross1 } from "react-icons/rx";
import InputField from "./InputField";

const WorkField = ({ index, field, handleFieldChange, handleRemoveField }) => {
  return (
    <div className="hover:bg-gray-300 p-3 rounded flex gap-2 flex-col items-start w-[95%]">
      {/* first work column */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* hours */}
          <InputField
            className="w-1/5"
            value={field.hours}
            placeholder="hours"
            onChange={(e) => handleFieldChange(index, "hours", e.target.value)}
          />

          {/* mins */}
          <InputField
            className="w-1/5"
            value={field.mins}
            placeholder="mins"
            onChange={(e) => handleFieldChange(index, "mins", e.target.value)}
          />

          {/* category */}
          <select
            name="category"
            value={field.category}
            onChange={(e) =>
              handleFieldChange(index, "category", e.target.value)
            }
          >
            {/* default first dummy option */}
            <option value={""}>Select category</option>
            {/* rendering categories by map */}
            {get_options(categories)}
          </select>
        </div>
        <RxCross1 size={25} onClick={() => handleRemoveField(index)} />
      </div>
      {/* second text row */}

      <InputField
        placeholder="work text"
        className="w-full"
        value={field.work_text}
        onChange={(e) => handleFieldChange(index, "work_text", e.target.value)}
      />
    </div>
  );
};

export default WorkField;
