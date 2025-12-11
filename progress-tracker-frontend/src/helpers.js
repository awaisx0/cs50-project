async function postProgress(date, workFields, dayText) {
  const postProgressUrl = "http://localhost:5000/api/save-progress";
  await fetch(postProgressUrl, {
    method: "POST",
    headers: {
      // specifying we're sending json
      "Content-Type": "application/json",
    },
    // json body
    body: JSON.stringify({
      date: date.toLocaleDateString(),
      work_fields: workFields,
      day_text: dayText,
    }),
  });
}

export { postProgress };
