import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdetailPage from "./routes/Adetail";
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
          <Route path="/1" element={<AnnouncePage />} />
          <Route path="/2" element={<DegreePage />} />
          <Route path="/3" element={<ScholarPage />} />
          <Route path="/4" element={<CommunityPage />} />
          <Route path="/1/:id" element={<AdetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
