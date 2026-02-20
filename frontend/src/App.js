import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import EditEmployee from "./components/EditEmployee";
import Reports from "./components/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<Employees />} />
          <Route path="add" element={<AddEmployee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="edit/:id" element={<EditEmployee/>} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;