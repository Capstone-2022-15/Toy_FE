import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./routes/Board";
import Login from "./routes/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
