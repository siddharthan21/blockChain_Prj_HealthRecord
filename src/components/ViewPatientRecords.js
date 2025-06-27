import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients") // Your Node server
      .then((res) => {
        console.log(res.data);  // You already see this in console
        setPatients(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch patients:", err);
      });
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white font-mono min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">All Patient Records</h2>
      {patients.length === 0 ? (
        <p>No patient data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">DOB</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Blood Group</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">HH Number</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="bg-gray-700">
                  <td className="px-4 py-2 border">{patient.name}</td>
                  <td className="px-4 py-2 border">{patient.dateOfBirth}</td>
                  <td className="px-4 py-2 border">{patient.gender}</td>
                  <td className="px-4 py-2 border">{patient.bloodGroup}</td>
                  <td className="px-4 py-2 border">{patient.homeAddress}</td>
                  <td className="px-4 py-2 border">{patient.email}</td>
                  <td className="px-4 py-2 border">{patient.hhNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAllPatients;
