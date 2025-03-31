import React, { useState, useEffect } from "react";
import CustomerSidebar from "./CustomerSidebar";
import { Card, CardContent, Button, TextField, Modal, Box } from "@mui/material";
import axios from "axios";

const CustomerDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const token = localStorage.getItem("token");
  const backEndUrl = "http://localhost:5000";
  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get("/api/customer/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.balance || "10000");
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-all-transactions/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("=========response=========", response.data);
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleTransaction = async (type) => {
    if (!amount || amount <= 0) return;
    try {
      const response = await axios.post(
        `${backEndUrl}/add-transaction`,
        { "category":type, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBalance(response.data.balance);
      fetchTransactions();
      setAmount("");
      // Show feedback modal
      setCurrentTransactionId(response.data.transactionId);
      setShowFeedback(true);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  const handleFeedback = async () => {
    console.log("Submitting feedback...");
    console.log("Feedback:", feedback);
    console.log("Transaction ID:", currentTransactionId);
    if (!feedback || !currentTransactionId) return;
    try {
      const repose = await axios.post(
        `${backEndUrl}/update-feedback`,
        { transactionId: currentTransactionId, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Feedback response:", repose.data);
      setFeedback("");
      setShowFeedback(false);
      fetchTransactions();
    } catch (error) {
      console.error("Feedback submission error:", error);
    }
  };

  return (
    <div className="flex">
      <CustomerSidebar />
      <div className="flex-1 p-6 ml-64 h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <Card className="mt-4 p-4">
          <CardContent>
            <h2 className="text-xl font-semibold">Balance: ${balance}</h2>
            <TextField
              label="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              className="mt-4"
            />
            <div className="flex gap-4 mt-4">
              <Button variant="contained" color="primary" onClick={() => handleTransaction("Deposit")}>
                Deposit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleTransaction("Withdraw")}>
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 p-4">
          <CardContent>
            <h2 className="text-xl font-semibold">Transaction History</h2>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <div key={txn.transaction_id} className="p-2 border-b">
                  <p><strong>Date:</strong> {new Date(txn.date).toLocaleString()}</p>
                  <p><strong>Amount:</strong> ${txn.amount}</p>
                  <p><strong>Category:</strong> {txn.category}</p>
                  <p><strong>Status:</strong> {txn.status}</p>
                  <p><strong>Feedback:</strong> {txn.feedback}</p>
                </div>
              ))
            ) : (
              <p>No transactions found.</p>
            )}
          </CardContent>
        </Card>

        <Modal open={showFeedback} onClose={() => setShowFeedback(false)}>
          <Box className="bg-white p-6 rounded-lg w-96 mx-auto mt-20">
            <h2 className="text-lg font-semibold">Submit Feedback</h2>
            <TextField
              label="Your Feedback"
              multiline
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              fullWidth
              className="mt-4"
            />
            <div className="flex gap-4 mt-4">
              <Button variant="contained" color="primary" onClick={handleFeedback}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setShowFeedback(false)}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerDashboard;

