import FarmerDashboard from "./components/farmer/FarmerDashboard";
import Navbar from "./components/global/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import Auth from "./pages/Auth";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
