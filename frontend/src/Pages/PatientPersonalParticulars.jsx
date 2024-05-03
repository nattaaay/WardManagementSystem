import { useState, useEffect } from "react";
import { BASE_URL } from "../constant/constant";
import MedicalHistory from "./MedicalHistory";
import AddPatient from "./AddPatient";
import moment from "moment";
import UpdatePatients from "./UpdatePatients";

const PatientPersonalParticulars = ({ wardNumber }) => {
  const employeeId = localStorage.getItem("employees_role");
  const [users, setUsers] = useState([]);
  const [seeMedicalHistory, setSeeMedicalhistory] = useState(false);
  const [addPatient, setAddPatient] = useState(false);
  const [medicalHistoryDetails, setMedicalHistoryDetails] = useState("");

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/wmt/patientpp/wards/${wardNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = `Error`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setUsers(data.data);
      // console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [wardNumber]);

  const handleDischarge = async (patientId) => {
    console.log("patientId", patientId);
    try {
      const response = await fetch(
        `${BASE_URL}/api/wmt/patient/discharge/pp/${patientId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      alert("Discharge patient successfuly");
      window.location.reload();

      console.log("test", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUpdate = (data) => {
    setUpdateData(data);
    setUpdateModalOpen(true);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Patient Personal Particulars
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              List of patients currently warded and have been discharged.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {employeeId == "3" ? (
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled
              >
                Add patient
              </button>
            ) : (
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setAddPatient(true)}
              >
                Add patient
              </button>
            )}
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
                      Status
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
                    users.map((person) => (
                      <tr key={person.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.patient_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.ic_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.contact_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.ward_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.bed_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium   
                          ${
                            person.discharge_patient == "discharge"
                              ? "text-red-700 bg-red-50"
                              : "text-green-700 bg-green-50"
                          }
                           ring-1 ring-inset ring-green-600/20`}
                          >
                            {person.discharge_patient == "discharge"
                              ? "Discharged"
                              : "In ward"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.admission_date &&
                            moment(person.admission_date).format("Do MMM YY")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.discharge_date === "1088-02-02"
                            ? null
                            : moment(person.discharge_date).format("Do MMM YY")}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          {person.discharge_patient == "discharge" ? null : (
                            <button
                              className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mr-5"
                              onClick={() => handleDischarge(person.uuid)}
                            >
                              Discharge
                            </button>
                          )}
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
                            className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            onClick={() => handleUpdate(person)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <MedicalHistory
          open={seeMedicalHistory}
          setOpen={setSeeMedicalhistory}
          medicalHistoryDetails={medicalHistoryDetails}
        />
        <AddPatient open={addPatient} setOpen={setAddPatient} />
        <UpdatePatients
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          data={updateData}
        />
      </div>
    </>
  );
};

export default PatientPersonalParticulars;
