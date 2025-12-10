import { Route, Routes } from "react-router";
import "./App.css";
import CalendarComponent from "./components/CalendarComponent";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarComponent />} />
      </Routes>
    </>
  );
}

export default App;
