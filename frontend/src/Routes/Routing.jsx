import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Sidebar from "../Components/Sidebar";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
