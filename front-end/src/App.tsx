// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage/HomePage"
// import CustomerLogin from "./components/CustomerLogin/Login";
// import EmployeeLogin from "./components/EmployeeLogin/Login";
// import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
// import FeedbackPage from "./components/EmployeeDashboard/FeedbackPage";
// import ProtectedRoute from "./ProtectedRoute";
// import { Outlet } from "react-router-dom";
// import { SideBar,SideBarButtons } from "./components/Sidebar";
// function App() {
//   function LayoutWithSideBar({ buttons }: { buttons: SideBarButtons[] }) {
//     return (
//       <div className="flex min-h-screen w-full">
//         <SideBar buttons={buttons} authSiteURL={""} redirectTo={""} role={""} apiURL={""}  />
//         <Outlet />
//       </div>
//     )
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/customer-login" element={<CustomerLogin />} />
//         <Route path="/employee-login" element={<EmployeeLogin />} />
//         <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
//         <Route path="/feedback/:customerId" element={<FeedbackPage />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="/dashboard" element={<HomePage/>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CustomerLogin from "./components/CustomerLogin/Login";
import EmployeeLogin from "./components/EmployeeLogin/Login";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import FeedbackPage from "./components/EmployeeDashboard/FeedbackPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayoutBranding from "./components/DashboardLayoutBranding";
import CustomerForm from "./components/EmployeeDashboard/CustomerForm";
import SearchCustomer from "./components/EmployeeDashboard/SearchCustomer";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/feedback/:customerId" element={<FeedbackPage />} />
            <Route path="/customer-form" element={<CustomerForm />} />
            <Route path="/search-customer" element={<SearchCustomer />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayoutBranding />} />
      </Routes>
    </Router>
  );
}

export default App;

