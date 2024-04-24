import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Sidebar from "../Components/Sidebar";
import Teams from "../Pages/Teams";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Sidebar />} />
          <Route path="/temas" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
