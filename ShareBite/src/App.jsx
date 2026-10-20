import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AvailableFoodPage from "./pages/AvailableFoodPage.jsx";
import Posts from "./pages/Posts.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/food" element={<AvailableFoodPage />} />
      <Route path="/pages/food.html" element={<AvailableFoodPage />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
