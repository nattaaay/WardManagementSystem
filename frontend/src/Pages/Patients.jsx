import React, { useState, useEffect } from "react";
import PatientPersonalParticulars from "./PatientPersonalParticulars";
import { BASE_URL } from "../constant/constant";

const Patients = () => {
  const [ward, setWard] = useState("");
  const [wardsData, setWardData] = useState([]);

  const fetchUsers = () => {
    fetch(`${BASE_URL}/api/wmt/patient/wards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWardData(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-center ml-5">
        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option>Select ward</option>
          {wardsData.map((e) => (
            <option key={e.id}>{e.ward_number}</option>
          ))}
        </select>
      </div>

      {ward ? (
        <div>
          <PatientPersonalParticulars wardNumber={ward} />
        </div>
      ) : null}
    </>
  );
};

export default Patients;
