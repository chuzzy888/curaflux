import Dashboard from "../../components/health-care/Dashboard";
import Header from "../../components/health-care/Header";
import Sidebar from "../../components/health-care/Sidebar";

function Admin() {
  return (
    <div className="flex lg:block hidden">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default Admin;
