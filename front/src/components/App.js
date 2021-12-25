//import { Route, Router } from "react-router";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NewForm from "./NewForm";

function App() {
  return (
    <div className="bg-slate-100 h-full min-h-screen w-full min-w-screen place-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<NewForm />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
