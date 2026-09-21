# Trex Wallet - 2 Page Posts Test

React frontend + Python FastAPI backend.

## Pages
- `/` = Posts page
- `/admin` = Admin page

Admin has no password because this is only for testing.

## Run Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / Codespaces
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Open the forwarded frontend port, normally `5173`.

## GitHub Codespaces

Upload this repository to GitHub, open it in Codespaces, then use two terminals:

Terminal 1:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

GitHub Codespaces will show the forwarded ports. Open port `5173`.

## Important

The backend currently stores posts in memory. Restarting the backend clears the posts.

The passwordless admin page is only for testing. Add authentication before public production use.
