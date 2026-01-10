import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import RegistrationForm from "./components/RegistrationForm";
import LocationModal from "./components/LocationModal";

import ThankYou from "./pages/THANKYOU/ThankYou";
import TermsAndConditions from "./pages/THANKYOU/TermsAndConditions";

// ✅ ADMIN PAGES
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  const [location, setLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      {/* HOT TOASTER */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen app-bg ">
        <Routes>

          {/* ================= REGISTRATION PAGE ================= */}
          <Route
            path="/"
            element={
              <>
                <LocationModal
                  open={modalOpen}
                  onSelect={(loc) => {
                    setLocation(loc);
                    setModalOpen(false);
                  }}
                  onClose={() => {
                    if (location) setModalOpen(false);
                  }}
                />

                <Header />

                {location && (
                  <RegistrationForm selectedLocation={location} />
                )}
              </>
            }
          />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin/login" element={<Login />} />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* ================= THANK YOU ================= */}
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/terms" element={<TermsAndConditions />} />

        </Routes>
      </div>
    </>
  );
}
