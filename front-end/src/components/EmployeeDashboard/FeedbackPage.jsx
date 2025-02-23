import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Card, CardContent, Typography, Button, IconButton, Checkbox, Box, Stack, CircularProgress 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import SideBar from "../SideBar";

const FeedbackPage = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [improvements, setImprovements] = useState([]);
    const [assignedImprovements,setassignedImprovements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [improvementsLoading, setImprovementsLoading] = useState(false);
    const [selectedImprovements, setSelectedImprovements] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/get-feedbacks/${customerId}`);
                console.log("Feedbacks:", response.data.feedbacks);
                setFeedbacks(response.data.feedbacks || []);
                setassignedImprovements(response.data.improvements || []);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, [customerId]);

    const generateSuggestions = async () => {
        try {
            setImprovementsLoading(true);
            const response = await axios.get(`http://localhost:5000/generate-suggestions/${customerId}`);
            setImprovements(response.data.improvements || []);
        } catch (error) {
            console.error("Error fetching improvements:", error);
        } finally {
            setImprovementsLoading(false);
        }
    };

    const handleSelect = (id, title, description) => {
        setSelectedImprovements((prev) => {
            const exists = prev.some((item) => item.id === id);
            return exists
                ? prev.filter((item) => item.id !== id)
                : [...prev, { id, title, description }];
        });
    };

    const handleSelectAll = () => {
        if (selectedImprovements.length === improvements.length) {
            setSelectedImprovements([]);
        } else {
            setSelectedImprovements(improvements.map(({ id, title, description }) => ({ id, title, description })));
        }
    };

    const sendImprovements = async () => {
        try {
            await axios.post("http://localhost:5000/send-improvements", { customerId,selectedImprovements });
            alert("Improvements sent successfully!");
        } catch (error) {
            console.error("Error sending improvements:", error);
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 h-screen overflow-y-auto">
            <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
            <Typography variant="h4" textAlign="center" marginBottom={2}>Customer Feedback</Typography>

            {/* Feedbacks Section */}
            <Stack spacing={2}>
                {loading ? <CircularProgress /> : feedbacks.map((feedback, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Typography variant="h6">{feedback.category}</Typography>
                            <Typography variant="body2">{feedback.feedback}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            {assignedImprovements.length > 0 && (
                <>
                    <Box display="flex" justifyContent="space-between" marginY={3}>
                        <Typography variant="h5">Already assigned Improvements</Typography>
                    </Box>

                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={2}>
                        {assignedImprovements.map(({ id, title, description,createdAt }) => {
                            return (
                                <Card 
                                    key={id} 
                                    variant="outlined" 
                                    onClick={() => handleSelect(id, title, description)} 
                                    sx={{ cursor: "pointer",border: "1px solid #ddd" }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">{title}</Typography>
                                        <Typography variant="body2">{description}</Typography>
                                        <Typography variant="body2">Assigned date:{createdAt}</Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Box>
                    </>
                    )}
            {/* Generate Suggestions Button */}
            <Box display="flex" justifyContent="center" marginTop={3}>
                {improvementsLoading ? <CircularProgress /> : (
                    <Button variant="contained" color="primary" onClick={generateSuggestions}>
                        Generate Suggestions
                    </Button>
                )}
            </Box>

            {/* Improvements Section */}
            {improvements.length > 0 && (
                <>
                    <Box display="flex" justifyContent="space-between" marginY={3}>
                        <Typography variant="h5">Suggested Improvements</Typography>
                        <Button variant="outlined" onClick={handleSelectAll}>
                            {selectedImprovements.length === improvements.length ? "Deselect All" : "Select All"}
                        </Button>
                    </Box>

                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={2}>
                        {improvements.map(({ id, title, description }) => {
                            const isSelected = selectedImprovements.some((item) => item.id === id);
                            return (
                                <Card 
                                    key={id} 
                                    variant="outlined" 
                                    onClick={() => handleSelect(id, title, description)} 
                                    sx={{ cursor: "pointer", border: isSelected ? "2px solid blue" : "1px solid #ddd" }}
                                >
                                    <CardContent>
                                        <Checkbox checked={isSelected} />
                                        <Typography variant="h6">{title}</Typography>
                                        <Typography variant="body2">{description}</Typography>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Box>

                    {selectedImprovements.length > 0 && (
                        <Box display="flex" justifyContent="center" marginTop={3}>
                            <Button variant="contained" color="success" onClick={sendImprovements}>
                                Send Improvements
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </div>
    </div>
    );
};

export default FeedbackPage;

