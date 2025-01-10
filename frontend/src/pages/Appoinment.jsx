import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Appoinment = () => {
  const { docId } = useParams();
  const { doctors, backendurl, token } = useContext(AppContext);

  const [doctinfo, setDocInfo] = useState(null);
  const [docslots, setdocslots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const fetchDoctinfo = async () => {
    const doctinfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctinfo);
  };

  const getAvailableSlots = async () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push({
        day: new Date(today).toLocaleDateString('en-US', { weekday: 'short' }),
        date: today.getDate(),
        slots: timeslots,
      });
      today.setDate(today.getDate() + 1);
    }

    setdocslots(slots);
  };

  const handleDayClick = (daySlots) => {
    setSelectedDay(daySlots);
    setAvailableTimes(daySlots.slots);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please log in to book an appointment.');
      return navigate('/login');
    }

    if (!selectedDay || !selectedTime) {
      toast.warn('Please select a date and time slot.');
      return;
    }

    try {
      const date = new Date(selectedTime.datetime);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}-${month}-${year}`;
      const slotTime = selectedTime.time;

      const { data } = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
        console.log(data)
      if (data.success) {
        toast.success('Appointment booked successfully!');
      } else {
        toast.error('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('An error occurred while booking the appointment.');
    }
  };

  useEffect(() => {
    fetchDoctinfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (doctinfo) {
      getAvailableSlots();
    }
  }, [doctinfo]);

  return (
    doctinfo && (
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-white shadow-lg rounded-xl p-6 md:p-8 lg:p-10 border border-gray-200">
          {/* Doctor Information Section */}
          <div className="flex flex-col items-center text-center md:text-left">
            <img
              className="w-full sm:w-48 md:w-64 h-48 sm:h-64 md:h-80 rounded-xl object-cover bg-gray-200 shadow-md"
              src={doctinfo.image}
              alt={doctinfo.name}
            />
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-4">
              {doctinfo.name}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {doctinfo.degree} - {doctinfo.speciality}
            </p>
            <button className="mt-4 px-6 py-2 text-xs sm:text-sm md:text-base bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
              {doctinfo.experience} Years Experience
            </button>
          </div>

          {/* About Doctor */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">About</h3>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              {doctinfo.about}
            </p>
            <p className="text-base sm:text-lg md:text-xl font-medium text-black mt-4">
              Doctor Fees - ${doctinfo.fees}
            </p>

            <div className="mt-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Booking Slots</h3>
              <div className="flex gap-2 sm:gap-4 flex-wrap mt-4">
                {docslots.map((day, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base text-center rounded-lg shadow-md border ${
                      selectedDay?.date === day.date
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                    } hover:bg-blue-100 transition`}
                    onClick={() => handleDayClick(day)}
                  >
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm">{day.date}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Available Times */}
          {selectedDay && (
            <div className="col-span-1 md:col-span-3 mt-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Available Times for {selectedDay.day}, {selectedDay.date}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4 mt-4">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    className={`px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg text-center font-medium shadow-md border transition ${
                      selectedTime?.time === time.time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                    } hover:bg-blue-100`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time.time}
                  </button>
                ))}
              </div>
              <button
                onClick={bookAppointment}
                className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg font-light px-10 py-2 sm:px-14 sm:py-3 lg:px-20 lg:py-4 rounded-full my-6 hover:bg-blue-600 transition"
              >
                Book An Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Appoinment;
