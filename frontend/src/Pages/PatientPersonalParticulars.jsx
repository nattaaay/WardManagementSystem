import { useState, useEffect } from "react";
import { BASE_URL, roles } from "../constant/constant";
import MedicalHistory from "./MedicalHistory";
import AddPatient from "./AddPatient";

const PatientPersonalParticulars = () => {
  const [users, setUsers] = useState([]);
  const [seeMedicalHistory, setSeeMedicalhistory] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [medicalHistoryDetails, setMedicalHistoryDetails] = useState("");

  const fetchUsers = () => {
    fetch(`${BASE_URL}/api/wmt/patientpp`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

  //discharge button function
  const handleDischarge = async (patientId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/wmt/patient/discharge/pp/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to discharge patient");
      }

      const data = await response.json();
      console.log(data); // Log success message
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Patient Personal Particulars
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the temas in your account including their user name,
              contact number, and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setAddPatient(true)}
            >
              Add patient
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ic number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Contact number
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ward number
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bed number
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Admission date
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Discharge date
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users &&
                    users
                      .filter((person) => !person.discharge_patient)
                      .map((person) => (
                        <tr key={person.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {person.patient_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.ic_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {/* {roles(person.employees_role)} */}
                            {person.contact_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.ward_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.bed_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.admission_date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.discharge_date}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-5"
                              onClick={() => {
                                setSeeMedicalhistory(true);
                                setMedicalHistoryDetails(person);
                              }}
                            >
                              Medical details
                            </button>
                            <button
                              className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                              onClick={() => handleDischarge(person.id)}
                            >
                              Discharge
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <AddNewTeam open={open} setOpen={setOpen} fetchUsers={fetchUsers} />
      {updateData && (
        <UpdateTeams
          open={updateOpen}
          setOpen={setUpdateOpen}
          updateData={updateData}
          fetchUsers={fetchUsers}
        />
      )} */}
        <MedicalHistory
          open={seeMedicalHistory}
          setOpen={setSeeMedicalhistory}
          medicalHistoryDetails={medicalHistoryDetails}
        />
        <AddPatient open={addPatient} setOpen={setAddPatient} />
      </div>
    </>
  );
};

export default PatientPersonalParticulars;
