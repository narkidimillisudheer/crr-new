from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import joblib
import pandas as pd

app = FastAPI()

# Load trained Pickle model
best_rf_model = joblib.load('best_rf_model.pkl')

# Define Pydantic Models
class Customer(BaseModel):
    id: str
    Customer_Age: int
    Credit_Limit: float
    Total_Transactions_Count: int
    Total_Transaction_Amount: float
    Inactive_Months_12_Months: int
    Transaction_Count_Change_Q4_Q1: float
    Total_Products_Used: int
    Average_Credit_Utilization: float
    Customer_Contacts_12_Months: int
    Transaction_Amount_Change_Q4_Q1: float
    Months_as_Customer: int
    College: int
    Doctorate: int
    Graduate: int
    High_School: int
    Post_Graduate: int
    Uneducated: int
    
    

class PredictionRequest(BaseModel):
    customers: list[Customer]

# @app.post("/predict")
# async def predict(data:dict):
#     df = pd.DataFrame([customer.dict() for customer in data.customers])
    
#     # Drop the 'id' column as it's not needed for the prediction
#     df.drop(columns=["id"], inplace=True)

#     # Get predictions from the model
#     predictions = best_rf_model.predict(df)

#     # Convert to boolean (1 -> Leaving, 0 -> Staying)
#     return {"predictions": [bool(pred) for pred in predictions]}

@app.post("/predict")
async def predict(data: dict):
    try:
        customers = data.get("customers", [])
        if not customers:
            raise HTTPException(status_code=400, detail="No customer data provided.")

        # Convert input data to DataFrame
        df = pd.DataFrame(customers)

        # Drop 'id' column (not required for prediction)
        df.drop(columns=["id"], inplace=True, errors="ignore")

        # Ensure all missing columns are added with default 0
        expected_features = best_rf_model.feature_names_in_
        for col in expected_features:
            if col not in df.columns:
                df[col] = 0  # Assign 0 for missing columns

        # Reorder columns to match model input
        df = df[expected_features]

        # Get predictions
        predictions = best_rf_model.predict(df)

        # Convert output (1 -> Leaving, 0 -> Staying)
        return {"predictions": [bool(pred) for pred in predictions]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))