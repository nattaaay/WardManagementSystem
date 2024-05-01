import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Teams from "../Pages/Teams";
import Layout from "./Layout";
import Patients from "../Pages/Patients";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/teams"
            element={
              <Layout>
                <Teams />
              </Layout>
            }
          />
          <Route
            path="/patients"
            element={
              <Layout>
                <Patients />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
