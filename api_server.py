
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Lead(BaseModel):
    full_name:str
    phone_number:str
    email:str|None=None
    city:str
    service_needed:str
    urgency_level:str

@app.post("/api/lead")
def create_lead(lead:Lead):
    # In production store in database
    print("New lead received:",lead)
    return {"status":"received"}
