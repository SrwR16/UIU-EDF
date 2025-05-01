import { AnimatePresence } from "framer-motion";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Alumni from "./pages/Alumni";
import EventPage from "./pages/EventPage";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Leadership from "./pages/Leadership";
import Membership from "./pages/Membership";
import NoticePage from "./pages/NoticePage";
import Notices from "./pages/Notices";
import Showcase from "./pages/Showcase";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticePage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
