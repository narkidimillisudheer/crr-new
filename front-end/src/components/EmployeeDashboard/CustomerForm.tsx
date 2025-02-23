import React, { useState } from "react";
import { TextField, MenuItem, Button, Paper, Typography } from "@mui/material";
import SideBar from "../SideBar";

const initialCustomer = {
    name: "",
    age: "",
    credit_limit: "",
    total_transactions_count: "",
    total_transaction_amount: "",
    inactive_months: "",
    transaction_count_change: "",
    total_products_used: "",
    credit_utilization: "",
    customer_contacts: "",
    transaction_amount_change: "",
    months_as_customer: "",
    education: "",
    income: "",
};

const educationOptions = ["College", "Doctorate", "Graduate", "High School", "Post-Graduate", "Uneducated"];
const incomeOptions = ["$120K +", "$40K - $60K", "$60K - $80K", "$80K - $120K", "Less than $40K"];

const CustomerForm = () => {
    const [customer, setCustomer] = useState(initialCustomer);
    const [errors, setErrors] = useState<Record<string, boolean>>({}); // Tracks empty fields
    const [prediction, setPrediction] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: e.target.value === "" }); // Remove error if field is filled
    };

    // Check if all fields are filled
    const isFormValid = Object.values(customer).every((val) => val !== "");

    const handleSubmit = async () => {
        if (!isFormValid) {
            const newErrors = Object.keys(customer).reduce((acc, key) => {
                acc[key as keyof typeof initialCustomer] = customer[key as keyof typeof initialCustomer] === "";
                return acc;
            }, {} as Record<string, boolean>);
            setErrors(newErrors);
            return;
        }

        try {
            console.log("Submitting data:", customer);
            const response = await fetch("http://localhost:5000/predict-single-customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({ customerData: customer }),
            });
            const data = await response.json();
            setPrediction(data.status);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
                <SideBar />
            {/* Main Content */}
            <div className="flex-1 ml-64  overflow-y-auto">
                <Paper className="p-8 w-full ">
                    <Typography variant="h4" className="font-bold mb-6 text-center">
                        Customer Form
                    </Typography>

                    {/* Form Grid */}
                    <div className="grid grid-cols-2 gap-6 pb-4">
                        {/* Name & Age */}
                        <TextField label="Customer Name" name="name" value={customer.name} onChange={handleChange} fullWidth required error={errors.name} helperText={errors.name ? "This field is required" : ""} />
                        <TextField label="Customer Age" name="age" type="number" value={customer.age} onChange={handleChange} fullWidth required error={errors.age} helperText={errors.age ? "This field is required" : ""} />

                        {/* Credit & Transactions */}
                        <TextField label="Credit Limit" name="credit_limit" type="number" value={customer.credit_limit} onChange={handleChange} fullWidth required error={errors.credit_limit} helperText={errors.credit_limit ? "This field is required" : ""} />
                        <TextField label="Total Transactions Count" name="total_transactions_count" type="number" value={customer.total_transactions_count} onChange={handleChange} fullWidth required error={errors.total_transactions_count} helperText={errors.total_transactions_count ? "This field is required" : ""} />

                        <TextField label="Total Transaction Amount" name="total_transaction_amount" type="number" value={customer.total_transaction_amount} onChange={handleChange} fullWidth required error={errors.total_transaction_amount} helperText={errors.total_transaction_amount ? "This field is required" : ""} />
                        <TextField label="Inactive Months (Last 12 Months)" name="inactive_months" type="number" value={customer.inactive_months} onChange={handleChange} fullWidth required error={errors.inactive_months} helperText={errors.inactive_months ? "This field is required" : ""} />

                        <TextField label="Transaction Count Change (Q4-Q1)" name="transaction_count_change" type="number" value={customer.transaction_count_change} onChange={handleChange} fullWidth required error={errors.transaction_count_change} helperText={errors.transaction_count_change ? "This field is required" : ""} />
                        <TextField label="Total Products Used" name="total_products_used" type="number" value={customer.total_products_used} onChange={handleChange} fullWidth required error={errors.total_products_used} helperText={errors.total_products_used ? "This field is required" : ""} />

                        <TextField label="Average Credit Utilization" name="credit_utilization" type="number" value={customer.credit_utilization} onChange={handleChange} fullWidth required error={errors.credit_utilization} helperText={errors.credit_utilization ? "This field is required" : ""} />
                        <TextField label="Customer Contacts (Last 12 Months)" name="customer_contacts" type="number" value={customer.customer_contacts} onChange={handleChange} fullWidth required error={errors.customer_contacts} helperText={errors.customer_contacts ? "This field is required" : ""} />

                        <TextField label="Transaction Amount Change (Q4-Q1)" name="transaction_amount_change" type="number" value={customer.transaction_amount_change} onChange={handleChange} fullWidth required error={errors.transaction_amount_change} helperText={errors.transaction_amount_change ? "This field is required" : ""} />
                        <TextField label="Months as Customer" name="months_as_customer" type="number" value={customer.months_as_customer} onChange={handleChange} fullWidth required error={errors.months_as_customer} helperText={errors.months_as_customer ? "This field is required" : ""} />


                        {/* Education Dropdown */}
                        <TextField select label="Education Level" name="education" value={customer.education} onChange={handleChange} fullWidth required error={errors.education} helperText={errors.education ? "This field is required" : ""}>
                            {educationOptions.map((level) => (
                                <MenuItem key={level} value={level}>{level}</MenuItem>
                            ))}
                        </TextField>

                        {/* Income Dropdown */}
                        <TextField select label="Income Level" name="income" value={customer.income} onChange={handleChange} fullWidth required error={errors.income} helperText={errors.income ? "This field is required" : ""}>
                            {incomeOptions.map((income) => (
                                <MenuItem key={income} value={income}>{income}</MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* Submit Button - Disabled until form is valid */}
                    <div className="mt-6 flex justify-center">
                        <Button variant="contained" color="primary" size="large" onClick={handleSubmit} disabled={!isFormValid}>
                            Submit
                        </Button>
                    </div>
            {prediction && (
                <div className="mt-4 flex flex-col items-center">
                    <Typography variant="h6" className={`font-bold ${prediction === "Leaving" ? "text-red-500" : "text-green-500"}`}>
                        Prediction: {prediction}
                    </Typography>
                </div>
            )} 
                </Paper>
                
            </div>
            
        </div>
    );
};

export default CustomerForm;
