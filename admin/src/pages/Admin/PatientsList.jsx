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
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Patients</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {patients?.map((patient, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer p-4"
          >
            <p className="text-[#262626] text-lg font-medium">
              {patient.name}
            </p>
            <p className="text-[#5C5C5C] text-sm">{patient.email}</p>
            <p className="text-[#5C5C5C] text-sm">Phone: {patient.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
