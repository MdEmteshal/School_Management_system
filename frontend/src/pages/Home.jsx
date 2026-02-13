import React from 'react'
import SchoolHeader from '../component/Header'
import Navbar from '../component/Nav'
import FullScreenCarousel from '../component/Carousel'
import PrincipalNotice from '../component/Principal_NoticeBoard'
import EventAndAdmission from '../component/Event_Admission'
import SchoolGallery from '../component/Gallery'
import ContactUs from '../component/ContactUs'
import Footer from '../component/Footer'
import FacultySection from '../component/FacultySection'
import StudentTopperList from '../component/TopperStudentList'


function Home() {
    return (
        <div>
            <SchoolHeader />
            <Navbar />
            <FullScreenCarousel />
            <PrincipalNotice />
            <StudentTopperList />
            <EventAndAdmission />
            <FacultySection />
            <SchoolGallery />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default Home
