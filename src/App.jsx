import React from 'react';
import SplashScreen from './assets/Components/SplashScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './assets/Pages/Dashboard';
import Login from './assets/Pages/Login';
import Navbar from './assets/Components/Navbar';
import Card from './assets/Components/Card';
import Home from './assets/Pages/Home';
import AuthModal from './assets/Components/AuthModal';
import Register from './assets/Pages/Register';
import Footer from './assets/Components/Footer';
import Services from './assets/Components/Services';
import AboutUs from './assets/Components/AboutUs';
import TermsAndConditions from './assets/Components/TermsAndConditions';
import PrivacyPolicy from './assets/Components/PrivacyPolicy';
import SignUpModal from './assets/Components/SignUpModal';
import FAQ from './assets/Components/FAQ';
import Appointments from './assets/Components/Appointments';
import OurPartners from './assets/Components/OurPartners';
import ContactUs from './assets/Components/ContactUs';
import Map from './assets/Components/Map';
import VideoCall from './assets/Components/VideoCall';
import Career from './assets/Components/Career';
import Voice from './assets/Components/Voice';
import Blog from './assets/Components/Blog';
import SOSButton from './assets/Components/SOSButton';
import Cookies from './assets/Components/Cookies';
import HeroSection from './assets/Components/HeroSection';
import HelpCenter from './assets/Components/HelpCenter';
import FeaturesSection from './assets/Components/FeaturesSection';
import UserDashboards from './assets/Components/UserDashboards';
import Emergency from './assets/Components/Emergency';
import Profile from './assets/Pages/Profile';
import HealthHub from './assets/Components/HealthHub';
import Admin from './assets/Pages/Admin';
import SMS from './assets/Components/SMS';
import ClinicLocator from './assets/Components/ClinicLocator';
import Kick from './assets/Components/Kick';
import MedicalReport from './assets/Components/MedicalReport';
import Weight from './assets/Components/Weight';
import Accessibility from './assets/Components/Accessibility';





import "./App.css";
























const App = () => {
  return (

    <BrowserRouter>
      <Routes>
         <Route path='/SplashScreen' element={<SplashScreen />} />
      </Routes>
      <Navbar />
      <Routes>





        <Route path='/' element={<Home />} />
        <Route path='map' element={<Map />} /> 
            <Route path='Accessibility' element={<Accessibility />} /> 
            <Route path='Voice' element={<Voice />} /> 
        <Route path='Cookies' element={<Cookies />} />
        <Route path='SOSButton' element={<SOSButton />} />
        <Route path='Dashboard' element={<Dashboard />} />
        <Route path='Navbar' element={<Navbar />} />
        <Route path='Card' element={<Card />} />
               <Route path='MedicalReport' element={<MedicalReport />} />
            <Route path='Weight' element={<Weight />} />
            <Route path='Profile' element={<Profile />} />
                <Route path='ClinicLocator' element={<ClinicLocator />} />
            <Route path='HelpCenter' element={<HelpCenter />} />
         <Route path='/login' element={<Login />} />
            <Route path='/VideoCall' element={<VideoCall />} />
                <Route path='/UserDashboards' element={<UserDashboards />} />
        <Route path='Register' element={<Register />} />
              <Route path='AuthModal' element={<AuthModal />} />
        <Route path='TermsAndConditions' element={<TermsAndConditions />} />
        <Route path='AboutUs' element={<AboutUs />} />
         <Route path='SMS' element={<SMS />} />
        <Route path='Emergency' element={<Emergency />} />
         <Route path='FeaturesSection' element={<FeaturesSection />} />
         <Route path='HeroSection' element={<HeroSection />} />
        <Route path='Services' element={<Services />} />
        <Route path='OurPartners' element={<OurPartners />} />
        <Route path='PrivacyPolicy' element={<PrivacyPolicy />} />
        <Route path='SignUpModal' element={<SignUpModal />} />
        <Route path='ContactUs' element={<ContactUs />} />
        <Route path='FAQ' element={<FAQ />} />
         <Route path='Kick' element={<Kick />} />
                <Route path='Admin' element={<Admin />} />
        <Route path='Career' element={<Career />} />
        <Route path='Blog' element={<Blog />} />
              <Route path='HealthHub' element={<HealthHub />} />
        <Route path='Appointments' element={<Appointments />} />








      </Routes>
      <Footer />
    </BrowserRouter>

  );
};

export default App;
