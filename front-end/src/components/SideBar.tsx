
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BottomSidebar } from "./BottomSidebar"
// import { Transition } from '@headlessui/react';


// export interface SideBarButtons {
//   id: number;
//   text: string;
//   linkTo: string;
//   SvgComponent: JSX.Element;
//   badgeText?: string;
// }

// export function SideBar({
//   buttons,
// }: {
//   buttons: SideBarButtons[];
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const [active, setActive] = useState("");
//   const location = useLocation();


//   useEffect(() => {
//     const currentPath = location.pathname;
//     const activeButton = buttons.find(button => currentPath.startsWith(button.linkTo));
//     if (activeButton) {
//       setActive(activeButton.text);
//     }
//   }, [location.pathname, buttons]);


//   return (
//     <div>
      
//       <div className="hidden lg:flex flex-col justify-between h-screen bg-primary_blue2 text-primary_white w-60 font-sans">
//         <div className="p-6">
//           <h2 className="text-xl font-semibold italic ml-2">Cogniverse-Learn</h2>
//         </div>
//                 {/* Sidebar Menu */}
//         <div className="flex-grow">
//           <ul>
//           {buttons.map(({ id, text, linkTo, SvgComponent, badgeText }) => (
//               <div key={id} className={`flex items-center p-4 hover:bg-blue-500 cursor-pointer pl-12 border-l-4 ${text===active ? 'bg-blue-500 border-l-4 font-bold' : 'border-l-transparent'}`} onClick={() => setIsOpen(false)}>
//                 <Link to={linkTo} className="flex gap-x-2 text-primary_white">
//                   {SvgComponent}
//                   <span className="text-sm font-medium">{text}</span>
//                 </Link>
//                 {badgeText && (
//                   <div>
//                     <h4  className="text-[9px]">{badgeText}</h4>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </ul>
//         </div>
//           <BottomSidebar />
//         </div>
//         {/*mobile View */}
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary_blue2 text-primary_white flex justify-around p-2">
//         {buttons.map(({ id,text, linkTo, SvgComponent, badgeText }) => (
//               <div key={id} className={`flex items-center justify-start p-3 gap-x-1 `} onClick={() => setIsOpen(false)}>
//                 <Link to={linkTo} className={`flex gap-x-2 text-primary_white`} onClick={() => setIsOpen(false)}>
//                 {React.cloneElement(SvgComponent, { className: `${text === active ? "text-black" : "text-white"}` })}
//                 </Link> 
//                 {badgeText && (
//                   <div>
//                     <h4 className="text-[15px]">{badgeText}</h4>
//                   </div>
//                 )}
//               </div>
//             ))}
//       </div>

//       {/* Backdrop */}
//       <Transition
//         show={isOpen}
//         enter="transition-opacity duration-200"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition-opacity duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div
//           className={`fixed inset-0 bg-gray-900 opacity-50 md:hidden ${isOpen ? 'block ' : 'hidden'}`}
//           onClick={toggleSidebar}
//         />
//       </Transition>

//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BottomSidebar } from './BottomSidebar';
// import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
// import { Transition } from '@headlessui/react';
// export interface SideBarButtons {
//   id: number;
//   text: string;
//   linkTo: string;
//   SvgComponent: JSX.Element;
//   badgeText?: string;
// }

// export function SideBar({
//   buttons,
//   authSiteURL,
//   redirectTo,
//   role,
//   apiURL
// }: {
//   buttons: SideBarButtons[];
//   authSiteURL: string;
//   redirectTo: string;
//   role:string;
//   apiURL: string;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const [active, setActive] = useState("");
//   const location = useLocation();
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const activeButton = buttons.find(button => currentPath.startsWith(button.linkTo));
//     if (activeButton) {
//       setActive(activeButton.text);
//     }
//   }, [location.pathname, buttons]);
//   return (
//     <>
//       <aside className={`fixed inset-0 flex flex-col bg-background border-r justify-between min-h-screen pb-5 z-40 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0 backdrop-opacity-8' : '-translate-x-full'} md:w-72 w-64 md:translate-x-0`}>
//         <div className="flex flex-col h-full">
//           <div className="flex justify-between items-center p-4 md:hidden">
//             <button onClick={toggleSidebar} className="text-gray-600">
//               {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//           </div>
//           <div className="flex flex-col gap-x-6 gap-y-2 p-2 flex-grow">
//             {buttons.map(({ id, text, linkTo, SvgComponent, badgeText }) => (
//               <div key={id} className={`flex items-center justify-start p-3 gap-x-1 ${text === active ? "bg-slate-200 rounded-md" : ""}`} onClick={() => setIsOpen(false)}>
//                 <Link to={linkTo} className="flex gap-x-2 text-gray-900">
//                   {SvgComponent}
//                   <span className="text-sm font-medium">{text}</span>
//                 </Link>
//                 {badgeText && (
//                   <div>
//                     <h3  className="text-[9px]">{badgeText}</h3>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//             <BottomSidebar />
//         </div>
//       </aside>

//       {/* Backdrop */}
//       <Transition
//         show={isOpen}
//         enter="transition-opacity duration-200"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="transition-opacity duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div
//           className={`fixed inset-0 bg-gray-900 opacity-50 md:hidden ${isOpen ? 'block ' : 'hidden'}`}
//           onClick={toggleSidebar}
//         />
//       </Transition>

//       {/* Hamburger Menu Button */}
//       <div className="absolute top-4 left-4 md:hidden z-50">
//         <button onClick={toggleSidebar} className="text-gray-600">
//           {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//         </button>
//       </div>
//     </>
//   );
// }

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

// const SideBar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         console.log("Logging out...");
//         // Perform logout logic (e.g., clear token, redirect)
//         navigate("/login");
//     };

//     return (
//         <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-5 shadow-lg">
//             <h2 className="text-xl font-semibold mb-6">Bank CRM</h2>
//             <div className="flex flex-col gap-4">
//                 <Button variant="contained" className="w-full" onClick={() => navigate("/dashboard")}>
//                     Dashboard
//                 </Button>
//                 <Button variant="contained" color="error" className="w-full" onClick={handleLogout}>
//                     Logout
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default SideBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Switch } from "@mui/material";
import { Home, BarChart, Notifications, Assessment, Inventory, Logout, WbSunny, Nightlight } from "@mui/icons-material";

const SideBar = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = React.useState(false);
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    const handleLogout = () => {
        console.log("Logging out...");
        navigate("/");
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col p-5">
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-5">
                <img src="https://i.ibb.co/YT3qh9VH/user-image-blue-2.png" alt="Profile" className="w-10 h-10 rounded-full" />
                <div>
                    <h2 className="text-lg font-semibold">Duck UI</h2>
                    <p className="text-sm text-gray-500">duckui@demo.com</p>
                </div>
            </div>

            {/* Search Bar */}
            {/* <TextField 
                placeholder="Search..." 
                variant="outlined" 
                size="small" 
                className="mb-4 bg-gray-100 rounded-lg"
                fullWidth 
            /> */}

            {/* Navigation Menu */}
            <nav className="flex flex-col justify-start gap-4">
                <Button startIcon={<Home />} onClick={() => handleNavigation("/employee-dashboard")} fullWidth className="justify-start text-black">
                    Dashboard
                </Button>
                <Button startIcon={<Notifications />} onClick={() => handleNavigation("/customer-form")} fullWidth className="justify-start text-black">
                    Single User
                </Button>
                <Button startIcon={<Assessment />} onClick={() => handleNavigation("/search-customer")} fullWidth className="justify-start text-black">
                    Search Users
                </Button>
                <Button startIcon={<Inventory />} fullWidth className="justify-start text-black">
                    Inventory
                </Button>
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto">
                <Button 
                    startIcon={<Logout />} 
                    fullWidth 
                    className="justify-start text-red-500"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

                {/* Theme Toggle
                <div className="flex items-center justify-between mt-4">
                    <WbSunny className="text-yellow-500" />
                    <Switch 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                        color="primary"
                    />
                    <Nightlight className="text-purple-500" />
                </div> */}
            </div>
        </div>
    );
};

export default SideBar;

