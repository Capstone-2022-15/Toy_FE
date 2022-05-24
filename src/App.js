import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnnouncePage from "./routes/Announcement";
import MainPage from "./routes/Board";
import Login from "./routes/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/announcement" element={<AnnouncePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
