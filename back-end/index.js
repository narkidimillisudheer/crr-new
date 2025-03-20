require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bp = require("body-parser");
const cors = require("cors");
const {
  calculateInactiveMonths,
  calculateMonthsAsCustomer,
} = require("./utils/helper");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
app.use(cors());
app.use(bp.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyDuGJM-eeTKZXKaZ8tmqYt_C6OuSE8ktuc"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("customer_retention_db"); // Database name
    console.log("Connected to MongoDB: customer_retention_db");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
connectDB();

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const usersCollection = db.collection("users");

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ email, name, password: hashedPassword });

  res.status(201).json({ message: "User created successfully" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, email: user.email, username: user?.name });
});

//employee-Signup Route
app.post("/employee-signup", async (req, res) => {
  const { email, password, name } = req.body;
  const employeeCollection = db.collection("employee");

  const existingUser = await employeeCollection.findOne({ email });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await employeeCollection.insertOne({ email, name, password: hashedPassword });

  res.status(201).json({ message: "Employee created successfully" });
});

//Employee-Login Route
app.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;
  const employeeCollection = db.collection("employee");

  const user = await employeeCollection.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, email: user.email, username: user?.name ?? "Employee" });
});

// Middleware to check auth
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Protected Route Example
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

// Route to predict a single customer
app.get("/predict-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("users");

    // Fetch customer details
    const customer = await collection.findOne({ _id: new ObjectId(id) });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Fetch customer transactions
    const transactions = await db
      .collection("transactions")
      .find({ customer_id: customer._id })
      .toArray();

    // Prepare customer data
    const customerData = {
      id: customer._id,
      name: customer.name,
      Customer_Age: customer.age,
      Credit_Limit: customer.credit_limit || 0,
      Total_Transactions_Count: transactions.length,
      Total_Transaction_Amount: transactions.reduce(
        (sum, txn) => sum + txn.amount,
        0
      ),
      Inactive_Months_12_Months: calculateInactiveMonths(transactions),
      Transaction_Count_Change_Q4_Q1:
        transactions.length > 0 ? (transactions.length / 12) * 4 : 0,
      Total_Products_Used: customer.total_products_used || 0,
      Average_Credit_Utilization: customer.credit_utilization || 0,
      Customer_Contacts_12_Months: customer.customer_contacts || 0,
      Transaction_Amount_Change_Q4_Q1:
        transactions.length > 0
          ? (transactions.reduce((sum, txn) => sum + txn.amount, 0) / 12) * 4
          : 0,
      Months_as_Customer: calculateMonthsAsCustomer(customer.joining_date),
      College: customer.education === "College" ? 1 : 0,
      Doctorate: customer.education === "Doctorate" ? 1 : 0,
      Graduate: customer.education === "Graduate" ? 1 : 0,
      "High School": customer.education === "High School" ? 1 : 0,
      "Post Graduate": customer.education === "Post-Graduate" ? 1 : 0,
      Uneducated: customer.education === "Uneducated" ? 1 : 0,
      "$120K +": customer.income === "$120K +" ? 1 : 0,
      "$40K - $60K": customer.income === "$40K - $60K" ? 1 : 0,
      "$60K - $80K": customer.income === "$60K - $80K" ? 1 : 0,
      "$80K - $120K": customer.income === "$80K - $120K" ? 1 : 0,
      "Less than $40K": customer.income === "Less than $40K" ? 1 : 0,
    };

    // Call FastAPI for prediction
    const fastApiResponse = await axios.post("http://localhost:8000/predict", {
      customers: [customerData],
    });
    const prediction = fastApiResponse.data.predictions[0];

    // Determine status
    const status = prediction ? "Leaving" : "Staying";

    res.json({
      id: customer._id,
      name: customer.name,
      isSuggestionsGiven: customer.give_improvements || false,
      status,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to fetch all users
app.get("/get-all-users", async (req, res) => {
  try {
    const collection = db.collection("users");

    // Fetch users
    const users = await collection
      .find({}, { projection: { _id: 1, name: 1, email: 1 } })
      .toArray();

    // Format response
    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/predict-customers", async (req, res) => {
  try {
    const collection = db.collection("users");

    // Fetch all customers
    const customers = await collection.find({}).toArray();

    const customersData = await Promise.all(
      customers.map(async (customer) => {
        const transactions = await db
          .collection("transactions")
          .find({ customer_id: customer._id })
          .toArray();

        return {
          id: customer._id,
          name: customer.name,
          Customer_Age: customer.age,
          Credit_Limit: customer.credit_limit || 0,
          Total_Transactions_Count: transactions.length,
          Total_Transaction_Amount: transactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
          ),
          Inactive_Months_12_Months: calculateInactiveMonths(transactions),
          Transaction_Count_Change_Q4_Q1:
            transactions.length > 0 ? (transactions.length / 12) * 4 : 0,
          Total_Products_Used: customer.total_products_used || 0,
          Average_Credit_Utilization: customer.credit_utilization || 0,
          Customer_Contacts_12_Months: customer.customer_contacts || 0,
          Transaction_Amount_Change_Q4_Q1:
            transactions.length > 0
              ? (transactions.reduce((sum, txn) => sum + txn.amount, 0) / 12) *
                4
              : 0,
          Months_as_Customer: calculateMonthsAsCustomer(customer.joining_date),
          College: customer.education === "College" ? 1 : 0,
          Doctorate: customer.education === "Doctorate" ? 1 : 0,
          Graduate: customer.education === "Graduate" ? 1 : 0,
          "High School": customer.education === "High School" ? 1 : 0,
          "Post Graduate": customer.education === "Post-Graduate" ? 1 : 0,
          Uneducated: customer.education === "Uneducated" ? 1 : 0,
          "$120K +": customer.income === "$120K +" ? 1 : 0,
          "$40K - $60K": customer.income === "$40K - $60K" ? 1 : 0,
          "$60K - $80K": customer.income === "$60K - $80K" ? 1 : 0,
          "$80K - $120K": customer.income === "$80K - $120K" ? 1 : 0,
          "Less than $40K": customer.income === "Less than $40K" ? 1 : 0,
        };
      })
    );

    // Call FastAPI for predictions
    const fastApiResponse = await axios.post("http://localhost:8000/predict", {
      customers: customersData,
    });
    const predictions = fastApiResponse.data.predictions;

    // Combine predictions with customer data
    let leavingCount = 0;
    let stayingCount = 0;

    // Combine predictions with customer data and calculate counts
    const responseCustomers = customers.map((customer, index) => {
      const status = predictions[index] ? "Leaving" : "Staying";
      if (status === "Leaving") leavingCount++;
      else stayingCount++;
      return {
        id: customer._id,
        name: customer.name,
        isSuggestionsGiven: customer.give_improvements || false,
        status,
      };
    });
    const chartData = [
      { category: "Leaving", count: leavingCount },
      { category: "Staying", count: stayingCount },
    ];
    console.log(responseCustomers);
    res.json({ customers: responseCustomers, chartData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//create one new route same like predict-customers but in this route all the attributes will come from the front end and then we will call the fastapi model to get the prediction
app.post("/predict-single-customer", async (req, res) => {
  try {
    console.log(req.body);
    const { customerData } = req.body;
    let customer = customerData;
    console.log("Customer Data:", customer);
    const customerDataUpdated = {
      name: customer.name,
      Customer_Age: customer.age,
      Credit_Limit: customer.credit_limit || 0,
      Total_Transactions_Count: customer.Total_Transactions_Count || 0,
      Total_Transaction_Amount: customer.Total_Transaction_Amount || 0,
      Inactive_Months_12_Months: customer.Inactive_Months_12_Months || 0,
      Transaction_Count_Change_Q4_Q1:
        customer.Transaction_Count_Change_Q4_Q1 || 0,
      Total_Products_Used: customer.total_products_used || 0,
      Average_Credit_Utilization: customer.credit_utilization || 0,
      Customer_Contacts_12_Months: customer.customer_contacts || 0,
      Transaction_Amount_Change_Q4_Q1:
        customer.Transaction_Amount_Change_Q4_Q1 || 0,
      Months_as_Customer: customer.Months_as_Customer || 0,
      College: customer.education === "College" ? 1 : 0,
      Doctorate: customer.education === "Doctorate" ? 1 : 0,
      Graduate: customer.education === "Graduate" ? 1 : 0,
      "High School": customer.education === "High School" ? 1 : 0,
      "Post Graduate": customer.education === "Post-Graduate" ? 1 : 0,
      Uneducated: customer.education === "Uneducated" ? 1 : 0,
      "$120K +": customer.income === "$120K +" ? 1 : 0,
      "$40K - $60K": customer.income === "$40K - $60K" ? 1 : 0,
      "$60K - $80K": customer.income === "$60K - $80K" ? 1 : 0,
      "$80K - $120K": customer.income === "$80K - $120K" ? 1 : 0,
      "Less than $40K": customer.income === "Less than $40K" ? 1 : 0,
    };

    // Call FastAPI for prediction
    const fastApiResponse = await axios.post("http://localhost:8000/predict", {
      customers: [customerDataUpdated],
    });
    const prediction = fastApiResponse.data.predictions[0];

    // Determine status
    const status = prediction ? "Leaving" : "Staying";

    res.json({
      id: customer._id,
      name: customer.name,
      isSuggestionsGiven: customer.give_improvements || false,
      status,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/get-feedbacks/:id", async (req, res) => {
  console.log("Received request for feedbacks with ID:", req.body);
  try {
    const customerId = req.params.id;
    const transactionsCollection = db.collection("transactions");
    const improvementsCollection = db.collection("improvements");
    // Fetch all transactions for the given customer ID that contain feedback
    const transactions = await transactionsCollection
      .find({
        customer_id: new ObjectId(customerId),
        feedback: { $exists: true, $ne: "" },
      })
      .toArray();
    const improvements = await improvementsCollection
      .find({ customerId: customerId })
      .toArray();
    if (!transactions.length) {
      return res
        .status(405)
        .json({ message: "No feedbacks found for this customer." });
    }
    const feedbacks = transactions.map((txn) => ({
      transaction_id: txn._id,
      date: txn.date, // Include transaction date
      feedback: txn.feedback,
      category: txn.category || "General",
    }));
    res.json({
      feedbacks,
      improvements: improvements.length ? improvements : null,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to generate customer-specific offers based on feedback
app.get("/generate-suggestions/:customerId", async (req, res) => {
  const { customerId } = req.params;

  // Fetch feedbacks from MongoDB
  const transactionsCollection = db.collection("transactions");
  let feedbacks = await transactionsCollection
    .find({
      customer_id: new ObjectId(customerId),
      feedback: { $exists: true, $ne: "" },
    })
    .toArray();
  if (!feedbacks.length) {
    return res.status(404).json({ error: "No feedbacks found" });
  }
  feedbacks = feedbacks.map((fb) => ({
    category: fb.category || "General",
    feedback: fb.feedback || "No feedback provided",
  }));
  console.log("Feedbacks:", feedbacks);
  // Construct prompt for Google Gemini API
  const prompt = `
  The following are feedbacks from a bank customer. Generate **personalized offers** to retain the customer:

  ${JSON.stringify(feedbacks, null, 2)}

  Return structured JSON like this:
  [
      { "id": 1, "title": "Lower Credit Card Interest", "description": "Offer 5% cashback on transactions for 3 months." },
      { "id": 2, "title": "Premium Support Access", "description": "Provide 24/7 priority support for high-value customers." }
  ]
      Also make sure the description should be in 15 words or less.and  Ensure that any numeric values, such as interest rates, cashback percentages, compensation amounts, or discounts, are explicitly provided as real numbers instead of placeholders.
  `;

  try {
    // Call Google Gemini API
    const result = await model.generateContent(prompt);
    console.log("Result:", result);
    let responseText = result.response.text();
    //console.log("Response Text:", responseText);
    responseText = responseText.replace(/```json|```/g, "").trim();
    const suggestions = JSON.parse(responseText);
    //console.log("Suggestions:", suggestions);
    res.json({ improvements: suggestions });
  } catch (error) {
    console.error("Error calling Google Gemini API:", error.message);
    res.status(500).json({ error: "Failed to generate suggestions" });
  }
});

// API to save selected improvements (each improvement as a separate document)
app.post("/send-improvements", async (req, res) => {
  try {
    const { customerId, selectedImprovements } = req.body;

    if (
      !customerId ||
      !Array.isArray(selectedImprovements) ||
      selectedImprovements.length === 0
    ) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Prepare improvements for insertion
    const improvementsData = selectedImprovements.map((improvement) => ({
      customerId,
      title: improvement.title,
      description: improvement.description,
      createdAt: new Date(),
    }));
    const customerObjectId = new ObjectId(customerId);
    const usersCollection = db.collection("users");
    const improvementsCollection = db.collection("improvements");
    // Insert each improvement as a separate document
    await improvementsCollection.insertMany(improvementsData);

    // Update user collection with improvement status
    await usersCollection.updateOne(
      { _id: customerObjectId },
      {
        $set: {
          give_improvements: true,
          improvement_given_at: new Date(),
        },
      },
      { upsert: true }
    );

    res.json({ message: "Improvements saved successfully!" });
  } catch (error) {
    console.error("Error saving improvements:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
