import React, { useContext, useState, useRef } from 'react';
import { AdminContext } from '../../context/AdminContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address, setAddress] = useState('');

  const { backendurl, aToken } = useContext(AdminContext);

  const fileInputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not Selected");
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', address);
      formData.append('about', about);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(backendurl + '/api/admin/add-doctor', formData, {
        headers: { aToken }
      });

      if (data.success) {
        toast.success(data.message); // Success toast

        // Reset the form fields after successful submission
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress('');
        setAbout('');

        // Reset the file input
        fileInputRef.current.value = null;

      } else {
        toast.error(data.message); // Error toast if not success
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <p className="text-2xl font-bold text-gray-800 text-center">Add Doctor</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
          </label>
          <input
            ref={fileInputRef}
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-600 mt-2 text-center">Upload doctor <br /> Picture</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Your Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <p className="text-gray-700 font-medium">Doctor Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <p className="text-gray-700 font-medium">Doctor Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <p className="text-gray-700 font-medium">Experience</p>
          <select
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="5 Year">5 Year</option>
            <option value="6 Year">6 Year</option>
            <option value="7 Year">7 Year</option>
            <option value="8 Year">8 Year</option>
            <option value="9 Year">9 Year</option>
            <option value="10 Year">10 Year</option>
            <option value="11 Year">11 Year</option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Fees</p>
          <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
            type="number"
            placeholder="Fees"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 font-medium">Speciality</p>
          <select
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="General physician">General physician</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Education</p>
          <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            type="text"
            placeholder="Education"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <p className="text-gray-700 font-medium">Address</p>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            placeholder="Address"
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <p className="text-gray-700 font-medium">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write About Doctor"
            rows={5}
            required
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
