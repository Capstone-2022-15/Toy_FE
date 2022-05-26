import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardPage from "./routes/Board";
import DetailPage from "./routes/Detail";
import Login from "./routes/Login";
import MainPage from "./routes/Main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/:category" element={<BoardPage />} />
          <Route path="/:category/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
