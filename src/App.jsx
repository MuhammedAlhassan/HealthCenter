import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from './assets/Components/SplashScreen';
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
import FlyerCard from './assets/Components/FlyerCard';
import Accessibility from './assets/Components/Accessibility';

import "./App.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

const AppWrapper = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <MainApp />
      )}
    </QueryClientProvider>
  );
};

const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/splashscreen' element={<SplashScreen />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path='/flyercard' element={<FlyerCard />} />
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Map />} />
        <Route path='/accessibility' element={<Accessibility />} />
        <Route path='/voice' element={<Voice />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/sosbutton' element={<SOSButton />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/card' element={<Card />} />
        <Route path='/medicalreport' element={<MedicalReport />} />
        <Route path='/weight' element={<Weight />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cliniclocator' element={<ClinicLocator />} />
        <Route path='/helpcenter' element={<HelpCenter />} />
        <Route path='/login' element={<Login />} />
        <Route path='/videocall' element={<VideoCall />} />
        <Route path='/userdashboards' element={<UserDashboards />} />
        <Route path='/register' element={<Register />} />
        <Route path='/authmodal' element={<AuthModal />} />
        <Route path='/termsandconditions' element={<TermsAndConditions />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/sms' element={<SMS />} />
        <Route path='/emergency' element={<Emergency />} />
        <Route path='/featuressection' element={<FeaturesSection />} />
        <Route path='/herosection' element={<HeroSection />} />
        <Route path='/services' element={<Services />} />
        <Route path='/ourpartners' element={<OurPartners />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/signupmodal' element={<SignUpModal />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/kick' element={<Kick />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/career' element={<Career />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/healthhub' element={<HealthHub />} />
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppWrapper;