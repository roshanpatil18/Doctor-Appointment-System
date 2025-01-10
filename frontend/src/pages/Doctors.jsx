import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Doctors = () => {
  const { speciality } = useParams(); // Getting the speciality from URL params
  console.log(speciality)
  const navigate = useNavigate(); // For navigation after clicking the doctor card
  const [filterDoc, setFilterDoc] = useState([]); // State for filtered doctors

  const { doctors } = useContext(AppContext); // Getting doctors from the context

  // Function to apply the filter based on speciality
  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  // Applying filter when doctors or speciality change
  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse your doctor specialties</p>
      <div className="space-y-4 flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className=" flex flex-col gap-2 text-sm text-gray-600  ">
          <p onClick={()=> speciality==='General physician'? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>General physician</p>
          <p  onClick={()=> speciality==='Gynecologist'? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>Gynecologist</p>
          <p  onClick={()=> speciality==='Dermatologist'? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>Dermatologist</p>
          <p  onClick={()=> speciality==='Neurologist'? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>Neurologist</p>
          <p  onClick={()=> speciality==='Gastroenterologist'? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>Gastroenterologist</p>
          <p  onClick={()=> speciality==='Pediatricians'? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer `}>Pediatricians</p>
        </div>

        {/* Render filtered doctors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filterDoc.map((item, index) => (
            <div
              className="doctor-card border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)} // Navigate to appointment page
            >
              <img
                src={item.image}
                alt={`Doctor ${index}`}
                className="w-full h-70 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-800 font-semibold text-lg">{item.name || 'Doctor Name'}</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-green-500 text-sm">Available</p>
                </div>
                <p className="text-gray-600 text-sm">{item.speciality || 'Speciality'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
