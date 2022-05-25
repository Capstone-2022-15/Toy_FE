import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnnouncePage from "./routes/Announcement";
import MainPage from "./routes/Board";
import CommunityPage from "./routes/Community";
import DegreePage from "./routes/Degree";
import Login from "./routes/Login";
import ScholarPage from "./routes/Scholarship";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/announcement" element={<AnnouncePage />} />
          <Route path="/degree" element={<DegreePage />} />
          <Route path="/scholarship" element={<ScholarPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
