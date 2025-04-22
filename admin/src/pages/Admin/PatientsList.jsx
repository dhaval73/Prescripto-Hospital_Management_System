import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const PatientsList = () => {
  const { patients, getAllPatients, aToken } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllPatients();
    }
  }, [aToken]);

  const filteredPatients = patients?.filter((patient) => {
    const fullAddress = `${patient.address?.line1 || ''} ${patient.address?.line2 || ''}`;
    return (
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery) ||
      patient.gender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.dob?.includes(searchQuery) ||
      fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Patients</p>

      <input
        type="text"
        placeholder="Search by name, email, phone, gender, DOB or address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full border px-4 py-2 rounded shadow-sm text-sm"
      />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2.5fr_2fr_1fr_1.5fr_3fr] py-3 px-6 border-b bg-[#F5F8FF] text-gray-600 uppercase text-xs">
          <p>#</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>DOB</p>
          <p>Address</p>
        </div>

        {filteredPatients?.map((patient, index) => (
          <div
            key={patient._id}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2.5fr_2fr_1fr_1.5fr_3fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <p>{patient.name}</p>
            <p className="max-sm:hidden">{patient.email}</p>
            <p>{patient.phone}</p>
            <p className="max-sm:hidden">{patient.gender}</p>
            <p className="max-sm:hidden">{patient.dob}</p>
            <p className="sm:truncate">{patient.address?.line1 || '-'}, {patient.address?.line2 || '-'}</p>
          </div>
        ))}

        {filteredPatients?.length === 0 && (
          <div className="p-4 text-center text-gray-500">No patients found.</div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
