import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const PatientsList = () => {
  const { patients, getAllPatients, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllPatients();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Patients</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {/* Header row for larger screens */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2.5fr_2fr_1fr_1.5fr_3fr] py-3 px-6 border-b bg-[#F5F8FF] text-gray-600 uppercase text-xs">
          <p>#</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>DOB</p>
          <p>Address</p>
        </div>

        {/* Data rows */}
        {patients?.map((patient, index) => (
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
      </div>
    </div>
  );
};

export default PatientsList;
