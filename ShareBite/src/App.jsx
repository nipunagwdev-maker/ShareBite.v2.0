import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AvailableFoodPage from "./pages/AvailableFoodPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/food" element={<AvailableFoodPage />} />
      <Route path="/pages/food.html" element={<AvailableFoodPage />} />
    </Routes>
  );
}

export default App;
