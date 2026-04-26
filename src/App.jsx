import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { chapters } from "./data/content.js";
import Impressum from "./pages/Impressum.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

export default function App() {
  const careerChapter = chapters.find((chapter) => chapter.id === "career");
  const jobs = careerChapter?.jobs ?? [];

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage chapters={chapters} />} />
        <Route path="/careers" element={<CareersPage jobs={jobs} />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
      </Routes>
    </>
  );
}