# React OpenStreetMap Project

This project is a React application that integrates OpenStreetMap using react-leaflet. It includes APIs for login, dashboard, and map view, using JWT authentication.

# Features

**User Authentication**: Secure login using JWT.

**Dashboard**: Displays a list of card components.

**Map Integration**: Shows OpenStreetMap with zoom controls.

**Routing**: Redirects users based on authentication status.

# Prerequisites

Node.js
npm (Node Package Manager)

# Setup Instructions

# Backend Setup

1. **Navigate to the backend directory:**

cd backend

2. **Install dependencies:**

npm install

3. **Start the backend server:**

node server.js

The backend runs on http://localhost:5000.

# Frontend Setup

1. **Navigate to the frontend directory:**

cd frontend

2. **Install dependencies:**

npm install

3. **Start the frontend application:**

npm start

The frontend runs on http://localhost:3000.

# API Endpoints

1. **Login API**

Endpoint: POST /api/login

Request Body:

{
  "username": "vinay@gmail.com",
  "password": "Vinay007"
}

2. **Dashboard API**

Endpoint: GET /api/dashboard

Headers:

{
  "Authorization": "Bearer <your_jwt_token>"
}

3. **Map View API**

Endpoint: GET /api/map

Headers:

{
  "Authorization": "Bearer <your_jwt_token>"
}