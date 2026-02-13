import axios from "axios";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { backendUrl } from "../App";
import { setAdminData } from "../redux/adminSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate()
  const { adminData } = useSelector(state => state.admin)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    Home: false,
    About: false,
  });

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleSubmenu = (item) => {
    setSubmenuOpen((prev) => ({ ...prev, [item]: !prev[item] }));
  };



  const dispatch = useDispatch()


  async function handleLogout() {
    try {
      const result = await axios.post(backendUrl + "/admin/auth/logout", {}, { withCredentials: true })
      console.log(result.data)
      dispatch(setAdminData(null))

      toast.success('Logout Successfully')
      navigate("/")
    } catch (error) {
      console.log("Backend error message:",
        error?.response?.data?.message
      )
      dispatch(setAdminData(null))
      toast.error("logout failed")

    }

  }

  return (
    <nav className="bg-orange-600 text-white relative z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold z-50 relative">MyLogo</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-center gap-6 z-50 relative">
            <li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200">
                Home
              </button>

            </li>

            {/* Admission Enquery Button */}
            <li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200" onClick={() => navigate("/admission-enquery")}>
                Admission Enquery
              </button>

            </li>
            {/* ContactUs Button */}
            <li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200" onClick={() => navigate("/contactus")}>
                ContactUs
              </button>

            </li>
            {/* Academics */}

            <li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200">
                Academics
              </button>
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-orange-500 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <li className="p-2 hover:bg-orange-400 border-b border-orange-400">Sub 1</li>
                <li className="p-2 hover:bg-orange-400">Sub 2</li>
              </ul>
            </li>


            <li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200">
                About
              </button>

            </li>

            {/* Login & Logout Button */}

            {!adminData ? (<li className="relative group">
              <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200" onClick={() => navigate("/login")}>
                Login
              </button>

            </li>) : (

              <li className="relative group">
                <button className="px-4 py-2 hover:bg-orange-500 rounded transition-colors duration-200" onClick={handleLogout}>
                  Logout
                </button>

              </li>)}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center z-50 relative">
            <button onClick={toggleMobileMenu}>
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <ul className="md:hidden flex flex-col gap-2 bg-orange-600 pb-4 relative z-50">
            {/* Home */}
            <li className="flex flex-col relative z-50">
              <button
                onClick={() => toggleSubmenu("Home")}
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
              >
                Home

              </button>

            </li>

            {/*  Admission Enquery */}

            <li className="flex flex-col relative z-50">
              <button
                onClick={() => navigate("/admission-enquery")}
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
              >
                Admission Enquery

              </button>
            </li>
            {/* ContactUs Button */}
            <li className="flex flex-col relative z-50">
              <button
                onClick={() => navigate("/contactus")}
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
              >
                ContactUs

              </button>
            </li>
            {/* Academics */}
            <li className="flex flex-col relative z-50">
              <button
                onClick={() => toggleSubmenu("About")}
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
              >
                Academics
                <span>{submenuOpen.About ? "-" : "+"}</span>
              </button>
              {submenuOpen.About && (
                <ul className="bg-orange-500 ml-4 mt-1 rounded z-50 relative">
                  <li className="px-4 py-2 hover:bg-orange-400 border-b border-orange-400">Sub 1</li>
                  <li className="px-4 py-2 hover:bg-orange-400">Sub 2</li>
                </ul>
              )}
            </li>

            {/* About Button */}
            <li className="flex flex-col relative z-50">
              <button
                onClick={() => toggleSubmenu("About")}
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
              >
                About

              </button>

            </li>

            {/* Login & Logout Button */}
            {!adminData ? (<li className="flex flex-col relative z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                Login

              </button>

            </li>) : (


              <li className="flex flex-col relative z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-orange-500 rounded flex justify-between items-center transition-colors duration-200" onClick={handleLogout}
                >
                  Logout

                </button>

              </li>)}




          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
