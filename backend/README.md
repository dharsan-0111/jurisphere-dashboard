## Tech Stack

- FastAPI
- Python 3.8–3.11
- Uvicorn
- CORS Middleware

## Folder Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI application and routes
│   └── data.py          # Mock customer data
├── requirements.txt     # Python dependencies
```

## Prerequisites

- Python 3.8 to 3.11
- pip (Python package manager)

## Setup Instructions

```bash
# Clone the repository and navigate to backend
git clone https://github.com/yourusername/jurisphere-dashboard.git
cd jurisphere-dashboard/backend

# Create and activate a virtual environment
python -m venv env

# Linux/macOS
source env/bin/activate

# Windows
.\env\Scriptsctivate

# Install dependencies
pip install -r requirements.txt
```

## Run the Server

```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

- `GET /customers` – Returns a list of mock customer objects

API Docs:
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Notes
- No environment variables are needed
- CORS is configured for `http://localhost:3000`