import { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
interface User {
    id: string;
    name: string;
    email: string;
}

const SearchCustomer = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Loader state
    const navigate = useNavigate();

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/get-all-users");
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Handle search filter
    useEffect(() => {
        if (search.trim() === "") {
            setFilteredUsers(users);
        } else {
            const lowerSearch = search.toLowerCase();
            setFilteredUsers(users.filter(user => 
               (user.name && user.name.toLowerCase().includes(lowerSearch))  || 
                (user.email && user.email.toLowerCase().includes(lowerSearch))
            ));
            setSelectedUser(null); // Reset selection when searching for another user
            setPrediction(null); 
        }
    }, [search, users]);

    // Handle card click
    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setPrediction(null); // Reset prediction when selecting a new user
    };

    // Handle prediction API call
    const handlePredict = async () => {
        if (!selectedUser) return;

        try {
            setLoading(true); // Show loader
            const response = await fetch(`http://localhost:5000/predict-customer/${selectedUser.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            setPrediction(data.status);
            setLoading(false); // "Staying" or "Leaving"
        } catch (error) {
            console.error("Error predicting customer:", error);
        } finally{
            setLoading(false); // Hide loader
        }
    };

    // Navigate to feedback page
    const handleGenerateSuggestions = () => {
        if (selectedUser) {
            navigate(`/feedback/${selectedUser.id}`);
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 h-screen overflow-y-auto">
            <Typography variant="h4" className="font-bold mb-4 text-center">
                Search Customer
            </Typography>

            {/* Search Bar */}
            <TextField
                label="Search by Name or Email"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6"
            />

            {/* User Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <Card 
                        key={user.id} 
                        className={`cursor-pointer shadow-md p-4 transition-transform duration-300 ${
                            selectedUser?.id === user.id ? "border-2 border-blue-500" : ""
                        }`}
                        onClick={() => handleSelectUser(user)}
                    >
                        <CardContent>
                            <Typography variant="h6" className="font-bold">{user.name}</Typography>
                            <Typography variant="body2" className="text-gray-600">{user.email}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Predict Button (Shows only when a user is selected) */}
            {selectedUser && (
                <div className="mt-6 flex justify-center">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handlePredict} 
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Predict"}
                    </Button>
                </div>
            )}

            {/* Generate Suggestions Button (Shows only if user is "Leaving") */}
           {/* Display Prediction Response */}
           {prediction && (
                <div className="mt-4 flex flex-col items-center">
                    <Typography variant="h6" className={`font-bold ${prediction === "Leaving" ? "text-red-500" : "text-green-500"}`}>
                        Prediction: {prediction}
                    </Typography>

                    {/* Generate Suggestions Button (Only if the user is leaving) */}
                    {prediction === "Leaving" && (
                        <Button variant="contained" color="secondary" onClick={handleGenerateSuggestions} className="mt-4">
                            Generate Suggestions
                        </Button>
                    )}
                </div>
            )}
        </div>
    </div>
    );
};

export default SearchCustomer;
