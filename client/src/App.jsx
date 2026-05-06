import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DetailSupply } from "./pages/DetailSupply";
import { DetailDemand } from "./pages/DetailDemand";
import { EditProfile } from "./pages/EditProfile";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Matching } from "./pages/Matching";
import { Notifications } from "./pages/Notifications";
import { Saved } from "./pages/Saved";
import { ChangePassword } from "./pages/ChangePassword";
import { ChangePhone } from "./pages/ChangePhone";
import { DeleteAccount } from "./pages/DeleteAccount";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./features/profile/LanguageContext";
import { AuthProvider } from "./features/auth/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function AppContent() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/listing/:id" element={<DetailSupply />} />
        <Route path="/demand/:id" element={<DetailDemand />} />
        <Route path="/matching" element={<Matching />} />
        <Route
          path="/notifications"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <Notifications />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <Profile />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <EditProfile />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <Settings />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/saved"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <Saved />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/settings/password"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <ChangePassword />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/settings/phone"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <ChangePhone />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/settings/delete"
          element={
            <div className="min-h-screen bg-white sm:bg-gray-50 flex flex-col">
              <div className="hidden sm:block">
                <Header />
              </div>
              <DeleteAccount />
              <div className="hidden sm:block">
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/profile-setup"
          element={<Navigate to="/edit-profile" replace />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
