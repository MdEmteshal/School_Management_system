import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom"


import Home from './pages/Home'
import EditStudentTopper from './pages/edit_pages/EditStudentTopper'
import EditPrincipal from './pages/edit_pages/EditPrincipalImage'
import EditCarusel from './pages/edit_pages/EditCarusel'
import EditEvents from './pages/edit_pages/EditEvents'
import EditFaculty from './pages/edit_pages/EditFaculty'
import EditGallery from './pages/edit_pages/EditGallery'
import { SendOtpMessage } from './pages/SendOtp'
import { AddNewPassword } from './pages/AddNewPassword'
import Login from './pages/Login'
import { getAdminDataHooks } from './customHooks/getAdminHooks'
import Logout from './pages/Logout'
import { useSelector } from 'react-redux'
import SimpleSettings from './pages/edit_pages/ChangeSetting'
import AdmissionEnquiryList from './pages/AddmissionEnquery'
import ContactUsList from './pages/ContactUsList'
export const backendUrl = "http://localhost:3000"
function App() {

  getAdminDataHooks()
  const { adminData } = useSelector(state => state.admin)
  console.log("admin data", adminData)

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path="/send-otp" element={<SendOtpMessage />} />
          <Route path="/add-new-password" element={<AddNewPassword />} />
          <Route path="/login" element={adminData ? <Logout /> : <Login />} />
          <Route path="/logout" element={adminData ? <Logout /> : <Login />} />
          <Route path="/admission-enquery" element={<AdmissionEnquiryList />} />
          <Route path="/contactus" element={<ContactUsList />} />



          {/* Edit Pages Route */}
          <Route path="/change-settings" element={adminData ? <SimpleSettings /> : <Login />} />
          <Route path="/upload-carousel" element={adminData ? <EditCarusel /> : <Login />} />
          <Route path="/principal" element={adminData ? <EditPrincipal /> : <Login />} />
          <Route path="/student-topper" element={adminData ? <EditStudentTopper /> : <Login />} />
          <Route path="/events" element={adminData ? <EditEvents /> : <Login />} />
          <Route path="/faculty" element={adminData ? <EditFaculty /> : <Login />} />
          <Route path="/gallery" element={adminData ? <EditGallery /> : <Login />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
