import { useState } from "react";
import PatientPersonalParticulars from "./PatientPersonalParticulars";
import { allWards } from "../constant/constant";

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
          {allWards.map((e) => (
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
