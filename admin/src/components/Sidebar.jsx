import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContextProvider';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    return (
        <div className="min-h-screen bg-white border-r shadow-md md:w-64 sm:w-16 transition-all">
            {aToken && (
                <ul className="text-gray-700 mt-5 space-y-2">
                    {/* Dashboard Link */}
                    <NavLink
                        to="/admin-dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-6 rounded-md ${
                                isActive
                                    ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500'
                                    : 'hover:bg-gray-100'
                            }`
                        }
                    >
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDA4YzY3IiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjFINC44M2ExIDEgMCAwIDEtMS0xVjYuODNhMSAxIDAgMCAxIC4yOS0uNzJMNS88V3LV2nciImXkdy==" width="35" height="35" alt="Icon" />
                        <p className="hidden sm:block">Dashboard</p>
                    </NavLink>

                    {/* All Appointments Link */}
                    <NavLink
                        to="/all-appointments"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-6 rounded-md ${
                                isActive
                                    ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500'
                                    : 'hover:bg-gray-100'
                            }`
                        }
                    >
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmY3MDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJhNiA2IDAgMSAwIDAgMTIgNiA2IDAgMCAwIDAtMTIgNiA2IDAgMCAwIDAtMTRaTTEyIDRoM3YyaC0zdi0yek0zIDEwaDE4djJoLTFWMTRoLTF2Mmgxdi0yaDEydi0ySDN2MnoiLz48L3N2Zz4="
                            alt="Appointments Icon"
                            className="w-6 h-6"
                        />
                        <p className="hidden sm:block">All Appointments</p>
                    </NavLink>

                    {/* Add Doctor Link */}
                    <NavLink
                        to="/add-doctor"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-6 rounded-md ${
                                isActive
                                    ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500'
                                    : 'hover:bg-gray-100'
                            }`
                        }
                    >
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDA4YzY3IiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjFINC44M2ExIDEgMCAwIDEtMS0xVjYuODNhMSAxIDAgMCAxIC4yOS0uNzJMNS88V3LV2nciImXkdy==" width="35" height="35" alt="Icon" />
                        <p className="hidden sm:block">Add Doctor</p>
                    </NavLink>

                    {/* Doctor List Link */}
                    <NavLink
                        to="/doctor-list"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 md:px-6 rounded-md ${
                                isActive
                                    ? 'bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-500'
                                    : 'hover:bg-gray-100'
                            }`
                        }
                    >
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDA4YzY3IiBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjFINC44M2ExIDEgMCAwIDEtMS0xVjYuODNhMSAxIDAgMCAxIC4yOS0uNzJMNS88V3LV2nciImXkdy==" width="35" height="35" alt="Icon" />
                        <p className="hidden sm:block">Doctor List</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
