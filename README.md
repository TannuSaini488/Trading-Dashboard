# Zerodha Clone

A full-stack Zerodha-inspired trading platform clone built with React, Express, MongoDB, and Socket.IO.

## Project Structure

- `frontend/` - Public marketing site and landing pages
- `dashboard/` - Logged-in trading dashboard UI
- `backend/` - Express API, MongoDB models, and Socket.IO server

## Features

- Responsive Zerodha-style landing pages
- Authentication flow for register/login
- Dashboard views for holdings, positions, orders, funds, and apps
- MongoDB-backed data models
- Real-time mock price updates over Socket.IO

## Tech Stack

- React
- React Router
- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- Material UI

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
```

Optional dashboard env:

```env
REACT_APP_API_URL=http://localhost:3002
```

## Setup

Install dependencies in each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../dashboard
npm install
```

## Run Locally

Start the backend first:

```bash
cd backend
npm start
```

Start the public frontend:

```bash
cd frontend
npm start
```

Start the dashboard:

```bash
cd dashboard
npm start
```

## Seed Data

The backend includes `seed.js` to populate holdings and positions in MongoDB:

```bash
cd backend
node seed.js
```

## API Overview

- `POST /user/register`
- `POST /user/login`
- `GET /holdings/index`
- `GET /positions/index`
- `GET /orders/index`
- `POST /orders/create`

## Notes

- The backend emits mock stock price updates every 2 seconds via Socket.IO.
- CORS is configured for local development and the deployed dashboard URL.
- The dashboard defaults to `http://localhost:3002` if `REACT_APP_API_URL` is not set.

## Deployment

Both React apps include `vercel.json`, so they are set up for Vercel-style deployment. The backend is designed to run as a separate Node service with MongoDB access.
