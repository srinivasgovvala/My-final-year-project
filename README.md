# Toxic Comments Detection Web App

## Overview
This project is a full-stack web application for detecting toxic comments using a machine learning model. It features user registration/login and allows users to submit comments for toxicity classification across multiple categories (toxic, severe toxic, obscene, threat, insult, identity hate).

## Features
- User registration and login
- Toxic comment classification (multi-label)
- React frontend and Node.js/Express backend
- Python-based ML model (scikit-learn)
- SQLite database for user management

## Prerequisites
- Node.js (for backend and frontend)
- Python 3 (for model prediction)
- pip (Python package manager)

## Getting Started

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Install required Python packages:
   ```bash
   pip install scikit-learn pandas
   ```
4. Ensure `model.pkl` and `vectorizer.pkl` are present in the backend directory (already included).
5. Start the backend server:
   ```bash
   node server.js
   ```
   The backend will run on [http://localhost:5001](http://localhost:5001).

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000).

### 3. Model Training (Optional)
If you want to retrain the model:
1. Go to the `modelTraining` directory:
   ```bash
   cd modelTraining
   ```
2. Ensure `train.csv` is present.
3. Run the training script:
   ```bash
   python train_model.py
   ```
4. This will generate new `model.pkl` and `vectorizer.pkl` files. Copy them to the `backend` directory.

## Deployment

### Option 1: Deploy with Heroku (or similar)
- Deploy the backend as a Node.js app (ensure Python is available for the child process).
- Deploy the frontend as a static site (e.g., Netlify, Vercel, or serve the build from the backend).

### Option 2: Docker (Recommended)
- Create a Dockerfile for the backend (Node.js + Python).
- Build the frontend (`npm run build` in `frontend`), then serve the static files from the backend or a static server.
- Use `docker-compose` if you want to orchestrate both services.

### Option 3: Manual VPS Deployment
- Set up Node.js and Python on your server.
- Copy backend and frontend files.
- Build the frontend and serve it (either from the backend or a static server).
- Run the backend with `node server.js`.

## Project Structure
```
backend/      # Node.js backend (Express, Python integration)
frontend/     # React frontend
modelTraining/# Model training scripts and data
```

## License
This project is licensed under the MIT License. 
