import React, { useState } from "react";
import PatientPersonalParticulars from "./PatientPersonalParticulars";

const Patients = () => {
  const [ward, setWard] = useState("");
  return (
    <>
      <div className="flex justify-center ml-5">
        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option>Select ward</option>
          <option>Ward 1 </option>
          <option>Ward 2 </option>
          <option>Ward 3 </option>
          <option>Ward 4 </option>
          <option>Ward 5 </option>
          <option>Ward 6 </option>
          <option>Ward 7 </option>
          <option>Ward 8 </option>
          <option>Ward 9 </option>
          <option>Ward 10 </option>
        </select>
      </div>

      {ward ? (
        <div>
          <PatientPersonalParticulars />
        </div>
      ) : null}
    </>
  );
};

export default Patients;
