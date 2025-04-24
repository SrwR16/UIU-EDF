import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Leadership from './pages/Leadership';
import Membership from './pages/Membership';
import Showcase from './pages/Showcase';
import Alumni from './pages/Alumni';
import Notices from './pages/Notices';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/notices" element={<Notices />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;