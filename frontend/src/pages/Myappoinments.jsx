import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';

const Myappoinments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className='text-black pb-3 font-medium border-b'>My Appointments</p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-10 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt={item.name} />
            </div>
            <div>
              <p className='text-semibold'>{item.name}</p>
              <p className='mt-1'>{item.speciality}</p>
              <p className='mt-1'>Address:</p>
              <p>{item.address.line1}</p>
              <p className='mt-1'>
                <span>Date & Time :</span> 25, July 2034 | 5:60 pm
              </p>
            </div>

            <div className='ml-auto flex items-center space-x-4'>
              <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
                Pay Online
              </button>
              <button className='px-4 py-2 bg-red-500 text-white rounded-lg'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappoinments;
