import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Topdoctor = () => {

    const {doctors} = useContext(AppContext)

    const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Top doctors to book</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
            key={index}   onClick={()=>navigate(`/appointment/${item._id}`)  }
          >
            <img src={item.image} alt={`Doctor ${index}`} className="w-full h-auto" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800 font-semibold">{item.name || "Doctor Name"}</p>
              <p className='w-2 h-2 bg-green-400 rounded-full'></p>  <p className="text-green-500 text-sm">Available</p>
              </div>
              <p className="text-gray-600 text-sm">{item.speciality || "Speciality"}</p>
            </div>
          </div>
        ))}
      </div>

      <button className='h-25 w-40 bg-gray-500 text-black text-center rounded-full' onClick={() => {
    navigate('/doctors');
    scrollTo(0, 0);
}}
>more</button>
    </div>
  );
};

export default Topdoctor;
