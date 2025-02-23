require("dotenv").config();
const { MongoClient } = require("mongodb");

//const uri = "mongodb://localhost:27017";
const client = new MongoClient(process.env.MONGO_URI);
const dbName = "customer_retention_db";

// Dummy Users
const users = [
    {
        name: "sudheer",
        age: 21,
        credit_limit: 5000,
        total_products_used: 3,
        credit_utilization: 0.45,
        customer_contacts: 5,
        education: "Graduate",
        income: "$120K +",
        joining_date: new Date("2020-01-15"),
    },
    {
        name: "Prajnesh",
        age: 22,
        credit_limit: 8000,
        total_products_used: 4,
        credit_utilization: 0.35,
        customer_contacts: 8,
        education: "Doctorate",
        income: "$120K +",
        joining_date: new Date("2018-07-10"),
    },
    {
        name: "Pavan",
        age: 29,
        credit_limit: 3000,
        total_products_used: 2,
        credit_utilization: 0.55,
        customer_contacts: 3,
        education: "College",
        income: "$40K - $60K",
        joining_date: new Date("2021-05-25"),
    },
    {
        name: "Vasavi",
        age: 31,
        credit_limit: 6000,
        total_products_used: 3,
        credit_utilization: 0.40,
        customer_contacts: 6,
        education: "Post-Graduate",
        income: "$80K - $120K",
        joining_date: new Date("2019-09-30"),
    },
    {
        name: "Swaroop",
        age: 50,
        credit_limit: 10000,
        total_products_used: 5,
        credit_utilization: 0.30,
        customer_contacts: 10,
        education: "High School",
        income: "Less than $40K",
        joining_date: new Date("2016-03-12"),
    }
];

// Realistic Banking Feedbacks
const feedbackSamples = [
    "My credit card was declined even though I have enough balance.",
    "Loan approval process is too slow. I have been waiting for weeks.",
    "The mobile banking app crashes every time I try to transfer funds.",
    "Unexpected charges on my account statement. Need clarification.",
    "ATM withdrawal limit is too low. I need more flexibility.",
    "My savings account interest rate has dropped without notice.",
    "Customer support takes too long to resolve issues.",
    "Fraudulent transaction detected on my account. Need urgent help.",
    "Auto-debit for my loan EMI failed, causing a penalty.",
    "Net banking keeps logging me out while making payments.",
    "I need better cashback offers on my debit card purchases.",
    "Unable to access my account after resetting my password.",
    "Mortgage loan processing time is too high. Lost my deal.",
    "Bank branch is always crowded, and waiting times are long.",
    "Transaction pending for too long, but amount is deducted.",
    "Cheque deposit takes too much time to clear.",
    "I was charged an extra service fee that I was not informed about.",
    "Unable to link my bank account to my investment portfolio.",
    "Interest rates on fixed deposits are not competitive anymore."
];

// Generate transactions with some users having missing months
const generateTransactions = (customerId) => {
    const transactions = [];
    const totalMonths = 12;
    const activeMonths = Math.floor(Math.random() * totalMonths) + 1; // Random active months (1 to 12)
    const activeMonthIndices = new Set();
    
    while (activeMonthIndices.size < activeMonths) {
        activeMonthIndices.add(Math.floor(Math.random() * totalMonths)); // Pick random months for transactions
    }

    for (let i = 0; i < totalMonths; i++) {
        if (!activeMonthIndices.has(i)) continue; // Skip some months

        const transactionDate = new Date();
        transactionDate.setMonth(transactionDate.getMonth() - i);

        transactions.push({
            customer_id: customerId,
            amount: Math.floor(Math.random() * 500) + 50, // Random amount between 50 and 550
            date: transactionDate,
            transaction_type: i % 2 === 0 ? "Purchase" : "Bill Payment",
            category: ["Groceries", "Electronics", "Dining", "Travel", "Entertainment"][i % 5],
            status: i % 3 === 0 ? "Successful" : "Pending",
            feedback: feedbackSamples[Math.floor(Math.random() * feedbackSamples.length)] // Random real feedback
        });
    }
    return transactions;
};

// Insert dummy data into MongoDB
const insertDummyData = async () => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection("users");
        const transactionsCollection = db.collection("transactions");

        // Insert users
        const userInsertResult = await usersCollection.insertMany(users);
        console.log("Users inserted successfully.");

        // Insert transactions for each user
        const transactions = userInsertResult.insertedIds
            ? Object.values(userInsertResult.insertedIds).flatMap((id) => generateTransactions(id))
            : [];

        await transactionsCollection.insertMany(transactions);
        console.log("Transactions inserted successfully.");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await client.close();
    }
};

insertDummyData();
