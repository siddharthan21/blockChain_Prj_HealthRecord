
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewPatientList = () => {
  const { hhNumber } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/get-patient/${hhNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Patient not found");
        return res.json();
      })
      .then((data) => {
        setPatient(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch patient data.");
      });
  }, [hhNumber]);

  const closePage = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavBar_Logout />
      <div className="p-6 bg-gray-900 min-h-screen text-white font-mono">
        <h2 className="text-3xl font-bold text-center mb-6">
          Patient Medical Records
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {patient ? (
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>DOB:</strong> {patient.dateOfBirth}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>HH Number:</strong> {patient.hhNumber}</p>
            <p><strong>Address:</strong> {patient.homeAddress}</p>
          </div>
        ) : !error ? (
          <p className="text-center">Loading...</p>
        ) : null}

        <div className="flex justify-center mt-6">
          <button
            onClick={closePage}
            className="px-6 py-3 bg-teal-500 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPatientList;
