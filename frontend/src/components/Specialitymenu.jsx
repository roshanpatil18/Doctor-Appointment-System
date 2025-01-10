import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const Specialitymenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Lorem ipsum dolor sit amet, necessitatibus. Magnam minus, rem iste aut culpa accusamus eos vero officiis consectetur ab? Eius perspiciatis sint nostrum
      </p>

      <div className='flex justify-center gap-4 pt-5 w-full overflow-x-auto scrollbar-hide'>
        {specialityData.map((items, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)} // scroll to top when clicked
            className='flex flex-col items-center text-xs cursor-pointer hover:translate-y-[-10px] translate-all duration-500'
            key={index}
            to={`/doctors/${items.speciality}`}
          >
            <img className='w-16 sm:w-24 mb-2' src={items.image} alt={items.speciality} />
            <p>{items.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialitymenu;
