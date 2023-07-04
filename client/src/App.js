import logo from "./logo.svg";
import "./App.css";
import Page from "./Page";
import SignUp from "./pages/SignUp.jsx";
import Users from "./pages/Users.jsx";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Page children={<SignUp />} />} />
        <Route path="/users" element={<Page children={<Users />} />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
