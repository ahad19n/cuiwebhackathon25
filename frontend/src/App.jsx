import FarmerDashboard from "./components/farmer/FarmerDashboard";
import Navbar from "./components/global/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
function App() {
  return (
    <>
      <Navbar />
      <FarmerDashboard />
      <AdminDashboard />
    </>
  );
}

export default App;
