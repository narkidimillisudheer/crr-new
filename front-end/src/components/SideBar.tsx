import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Home, Notifications, Assessment, Inventory, Logout } from "@mui/icons-material";

const SideBar = () => {
    const navigate = useNavigate();
    //const [darkMode, setDarkMode] = React.useState(false);
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

