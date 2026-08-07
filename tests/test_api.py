from fastapi.testclient import TestClient
from api_server import app

client = TestClient(app)


def test_submit_lead():
    # A valid lead submission should return status "received"
    response = client.post("/api/lead", json={
        "full_name": "Jane Smith",
        "phone_number": "555-123-4567",
        "email": "jane@example.com",
        "city": "Denver",
        "service_needed": "Water Damage Restoration",
        "urgency_level": "emergency"
    })
    assert response.status_code == 200
    assert response.json() == {"status": "received"}


def test_submit_lead_without_email():
    # Email is optional — should still succeed
    response = client.post("/api/lead", json={
        "full_name": "Bob Jones",
        "phone_number": "555-987-6543",
        "city": "Boulder",
        "service_needed": "Water Damage Restoration",
        "urgency_level": "urgent"
    })
    assert response.status_code == 200
    assert response.json() == {"status": "received"}
