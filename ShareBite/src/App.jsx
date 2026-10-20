import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AvailableFoodPage from "./pages/AvailableFoodPage.jsx";
import Posts from "./pages/Posts.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/food" element={<AvailableFoodPage />} />
      <Route path="/pages/food.html" element={<AvailableFoodPage />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/Contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
