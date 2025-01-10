import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContextProvider';

const DoctorList = () => {
  const { doctors, aToken, getallDoctors,changeAvailablity } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getallDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-lg font-medium mb-5 text-center">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
        {doctors.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
            <div className="mt-4">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
            <div className="flex items-center mt-2">
              <input onChange={()=>changeAvailablity(item._id)} type="checkbox" checked={item.available} className="mr-2"  />
              <p className="text-sm">{item.available ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
