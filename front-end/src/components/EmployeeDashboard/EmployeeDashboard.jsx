// import React, { useState, useEffect } from "react";
// import { Container, Tabs, Tab, Card, CardContent, Button, Typography, Grid } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// const dummyCustomers = [
//     { id: 1, name: "John Doe", status: "Leaving" },
//     { id: 2, name: "Jane Smith", status: "Staying" },
//     { id: 3, name: "Michael Johnson", status: "Leaving" },
//     { id: 4, name: "Emily Davis", status: "Staying" },
// ];

// const dummyChartData = [
//     { category: "Leaving", count: 2 },
//     { category: "Staying", count: 2 },
// ];

// const pieChartColors = ["#FF6384", "#36A2EB"];

// const EmployeeDashboard = () => {
//     const [value, setValue] = useState(0);
//     const [customers, setCustomers] = useState(dummyCustomers);

//     const handleTabChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const handleCardClick = (customerId) => {
//         alert(`Customer ID: ${customerId}`);
//     };

//     return (
//         <Container>
//             <Typography variant="h4" textAlign="center" gutterBottom>
//                 Employee Dashboard
//             </Typography>
            
//             <Button variant="contained" color="primary" fullWidth>
//                 Check Bank Prediction
//             </Button>
            
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={dummyChartData}>
//                     <XAxis dataKey="category" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#8884d8" />
//                 </BarChart>
//             </ResponsiveContainer>
            
//             <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                     <Pie data={dummyChartData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
//                         {dummyChartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                 </PieChart>
//             </ResponsiveContainer>
            
//             <Tabs value={value} onChange={handleTabChange} centered>
//                 <Tab label="Leaving Customers" />
//                 <Tab label="Staying Customers" />
//             </Tabs>
            
//             <Grid container spacing={2} marginTop={2}>
//                 {customers
//                     .filter(customer => customer.status === (value === 0 ? "Leaving" : "Staying"))
//                     .map(customer => (
//                         <Grid item xs={12} sm={6} md={4} key={customer.id}>
//                             <Card onClick={() => handleCardClick(customer.id)} style={{ cursor: "pointer" }}>
//                                 <CardContent>
//                                     <Typography variant="h6">{customer.name}</Typography>
//                                     <Typography variant="body2">Status: {customer.status}</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//             </Grid>
//         </Container>
//     );
// };

// export default EmployeeDashboard;


import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Card, CardContent, Button, Typography, Grid, CircularProgress, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SideBar from "../SideBar";
import axios from "axios";
const dummyCustomers = [
    { id: 1, name: "John Doe", status: "Leaving" },
    { id: 2, name: "Jane Smith", status: "Staying" },
    { id: 3, name: "Michael Johnson", status: "Leaving" },
    { id: 4, name: "Emily Davis", status: "Staying" },
];

const dummyChartData = [
    { category: "Leaving", count: 2 },
    { category: "Staying", count: 2 },
];

const pieChartColors = ["#FF6384", "#36A2EB"];

const EmployeeDashboard = () => {
    const [value, setValue] = useState(0);
    const [customers, setCustomers] = useState(dummyCustomers);
    const [chartData, setChartData] = useState(dummyChartData);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/predict-customers"); // Update API URL
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            console.log("Data:", data);
            setCustomers(data.customers || dummyCustomers);
            setChartData(data.chartData || dummyChartData);
        } catch (error) {
            console.error("Error fetching data:", error);
            //setCustomers(dummyCustomers);
            //setChartData(dummyChartData);
        }
        setLoading(false);
    };
    useEffect(() => { 
        fetchData();
    }, []);


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCardClick =async (customerId) => {
        // try{
        //     const response = await axios.get(`http://localhost:5000/get-feedbacks/${customerId}`);
        //     console.log("Feedbacks:", response.data.feedbacks);
        //     alert(`Feedbacks: ${response.data.feedbacks}`);
        // }
        // catch(error){
        //     console.error("Error fetching feedbacks:", error);
        // }
        navigate(`/feedback/${customerId}`);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 h-screen overflow-y-auto">
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Employee Dashboard
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                    Check Bank Prediction
                </Button>
                <Grid container spacing={3} className="mt-6">
                    <Grid item xs={12} md={6}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={chartData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
                <Tabs value={value} onChange={handleTabChange} centered className="mt-6">
                    <Tab label="Leaving Customers" />
                    <Tab label="Staying Customers" />
                </Tabs>
                {loading ? (
                    <div className="flex justify-center mt-6">
                        <CircularProgress />
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Grid container spacing={2} marginTop={2}>
                            {customers
                                .filter(customer => customer.status === (value === 0 ? "Leaving" : "Staying"))
                                .map(customer => (
                                    <Grid item xs={12} sm={6} md={4} key={customer.id}>
                                        <Card onClick={() => handleCardClick(customer.id)} style={{ cursor: "pointer" }}>
                                            <CardContent>
                                                <Typography variant="h6">{customer.name}</Typography>
                                                <Typography variant="body2">Status: {customer.status}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </motion.div>
                )}
            </div>
        </div>
        
    );
};

export default EmployeeDashboard;





