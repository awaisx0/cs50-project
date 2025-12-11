import { useEffect, useState } from "react";

function useProgressData(date, onClose) {
  const [dayText, setDayText] = useState("");
  const [workFields, setWorkFields] = useState([
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
        if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => {
        if (data.work_fields) setWorkFields(data.work_fields);
        if (data.day_text.raw_text) setDayText(data.day_text.raw_text);
        return;
      })
      .catch((err) => console.log("Fetch error: ", err));
  }, [date]);

  function addField() {
    // all prev objects + one more object with empty values
    setWorkFields((prev) => [
      ...prev,
      { hours: "", mins: "", category: "", work_text: "" },
    ]);
  }

  function handleRemoveField(index) {
    // removing a field by filtering by index
    setWorkFields((prev) => prev.filter((_, i) => i !== index));
  }

  //
  function handleFieldChange(index, field, value) {
    setWorkFields((prev) => {
      // making copy of previous list
      const updated = [...prev];
      // at index, changing speified field value
      updated[index][field] = value;
      return updated;
    });
  }
  function handleClose() {
    onClose();
    // setting all fields to default values
    setWorkFields([
      {
        hours: "",
        mins: "",
        category: "",
        work_text: "",
      },
    ]);
  }
  return {
    workFields,
    dayText,
    setDayText,
    addField,
    handleFieldChange,
    handleRemoveField,
    handleClose,
  };
}

export default useProgressData;
