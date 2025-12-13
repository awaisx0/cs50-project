import { useEffect, useState } from "react";

function useCategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/api/get-categories";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not okay");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.log("Fetch error: ", err));
  }, []);
  return categories;
}

export default useCategoriesList;
