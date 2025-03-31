import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CustomerLogin from "./components/CustomerLogin/Login";
import EmployeeLogin from "./components/EmployeeLogin/Login";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import FeedbackPage from "./components/EmployeeDashboard/FeedbackPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayoutBranding from "./components/DashboardLayoutBranding";
import CustomerForm from "./components/EmployeeDashboard/CustomerForm";
import SearchCustomer from "./components/EmployeeDashboard/SearchCustomer";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        {/* Public Routes */}
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/feedback/:customerId" element={<FeedbackPage />} />
            <Route path="/customer-form" element={<CustomerForm />} />
            <Route path="/search-customer" element={<SearchCustomer />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayoutBranding />} />
      </Routes>
    </Router>
  );
}

export default App;

