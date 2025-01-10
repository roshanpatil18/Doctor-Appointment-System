import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContextProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendurl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendurl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          toast.success('Login successful!');
          setAToken(data.token); // Save token using the context method
        } else {
          toast.error(`Login : ${data.message}`);
        }
      } else {
        // Implement Doctor login logic here if applicable
        toast.info('Doctor login logic goes here.');
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button type="submit" className="bg-primary text-white w-full rounded">
            Login
          </button>
          {state === 'Admin' ? (
            <p>
              Doctor Login{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-blue-600 cursor-pointer"
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Admin Login{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-blue-600 cursor-pointer"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
