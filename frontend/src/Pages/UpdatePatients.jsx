import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BASE_URL, allBeds, allWards } from "../constant/constant";

export default function UpdatePatients({ open, setOpen, data }) {
  const employeeId = localStorage.getItem("employees_role");
  const cancelButtonRef = useRef(null);

  const token = localStorage.getItem("token");

  const [userName, setUserName] = useState(data?.patient_name || "");
  const [icNumber, setIcNumber] = useState(data?.ic_number || "");
  const [contactNumber, setContactNumber] = useState(
    data?.contact_number || ""
  );
  const [bedNumber, setBedNumber] = useState(data?.bed_number || "");
  const [wardNumber, setWardNumber] = useState(data?.ward_number || "");
  const [admissionDate, setAdmissionDate] = useState(
    data?.admission_date || ""
  );
  const [dischargeDate, setDischargeDate] = useState(
    data?.discharge_date || ""
  );
  const [medicalHistory, setMedicalHistory] = useState(
    data?.medical_history || ""
  );
  const [medicalNotes, setMedicalNotes] = useState(data?.medical_notes || "");
  const [treatmentPlans, setTreatmentPlans] = useState(
    data?.treatment_plans || ""
  );
  const [patientId, setPatientId] = useState(data?.uuid || "");

  const [loading, setLoading] = useState("");

  useEffect(() => {
    const formattedAdmissionDate = data?.admission_date
      ? new Date(data.admission_date).toISOString().split("T")[0]
      : "";

    setUserName(data?.patient_name || "");
    setIcNumber(data?.ic_number || "");
    setContactNumber(data?.contact_number || "");
    setBedNumber(data?.bed_number || "");
    setWardNumber(data?.ward_number || "");
    setAdmissionDate(formattedAdmissionDate || "");
    setDischargeDate("");
    setMedicalHistory(data?.medical_history || "");
    setMedicalNotes(data?.medical_notes || "");
    setTreatmentPlans(data?.treatment_plans || "");
    setPatientId(data?.uuid || "");
  }, [data]);

  const handleAddNewUser = async (event) => {
    event.preventDefault();
    if (wardNumber.length > 10) {
      alert("Ward length should be less than 10");
    } else if (bedNumber.length > 10) {
      alert("Bed number length should be less than 10");
    } else {
      try {
        setLoading(true);
        await fetch(`${BASE_URL}/api/wmt/patientpp/update`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: patientId,
            patient_name: userName,
            contact_number: contactNumber,
            admission_date: admissionDate,
            discharge_date: dischargeDate,
            ic_number: icNumber,
            ward_number: wardNumber,
            bed_number: bedNumber,
            medical_history: medicalHistory,
            medical_notes: medicalNotes,
            treatment_plans: treatmentPlans,
          }),
        });

        setLoading(false);
        alert("Patient update successfuly");
        setOpen(false);
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleAddNewUser}>
                  <h1 className="mb-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                    {employeeId == 2
                      ? "Update patient personal particulars"
                      : "Update medical details"}
                  </h1>
                  {employeeId == 2 ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Patient name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="lovedoctor123"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Ic number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={icNumber}
                            onChange={(e) => setIcNumber(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="ic number"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Contact number
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="12345678"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Ward number
                        </label>
                        <div className="mt-1">
                          <select
                            value={wardNumber}
                            onChange={(e) => setWardNumber(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option>Select ward</option>
                            {allWards.map((e) => (
                              <option key={e.id}>{e.ward_number}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Bed number
                        </label>
                        <div className="mt-1">
                          <select
                            value={bedNumber}
                            onChange={(e) => setBedNumber(e.target.value)}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option>Select Bed</option>
                            {allBeds.map((e) => (
                              <option key={e.id}>{e.bed_number}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Admission date
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            value={admissionDate}
                            onChange={(e) => setAdmissionDate(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="admission date"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Discharge date
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            value={dischargeDate}
                            onChange={(e) => setDischargeDate(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="discharge date"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  {employeeId == "3" ? (
                    <>
                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Medical History
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="medical history"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Medical Notes
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={medicalNotes}
                            onChange={(e) => setMedicalNotes(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="medical notes"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Treatment Plans
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={treatmentPlans}
                            onChange={(e) => setTreatmentPlans(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="treatment plans"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {loading ? (
                      <button className=" inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      >
                        {employeeId == 2
                          ? "Update patient personal particulars"
                          : "Update medical details"}
                      </button>
                    )}

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
