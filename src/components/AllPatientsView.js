import React, { useEffect, useState } from 'react';

const AllPatientsView = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/patients') // Point to backend
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error('Error fetching patients:', err));
  }, []);

  return (
    <div>
      <h2>All Patients</h2>
      {patients.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {patients.map((patient, index) => (
            <li key={index}>
              <strong>ID:</strong> {patient.id} <br />
              <strong>Name:</strong> {patient.name} <br />
              <strong>Age:</strong> {patient.age}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllPatientsView;
