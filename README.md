# Habit-Decay-Tracker  
**Full-Stack MERN Habit Tracking & Consistency Analysis Application**

## 🔗 Live Demo
https://habit-decay-tracker-1.onrender.com/

## 📂 GitHub Repository
https://github.com/sharonbrayan/habit-decay-tracker

---

## 📌 Overview

Habit-Decay-Tracker is a full-stack MERN application that helps users track daily habits and analyze consistency over time using a **decay-based scoring system**.

The application focuses on **long-term habit behavior**, showing how missed days affect consistency rather than just counting streaks.

---

## 🧠 Key Concepts Implemented

- Secure authentication using **JWT with protected routes**
- Habit consistency analysis using **timestamp-based decay logic**
- Visual data representation using charts
- RESTful API design with user-specific data isolation

---

## ✨ Features

### 🔐 Authentication
- User signup and login with JWT authentication
- Protected backend APIs and frontend routes
- Session persistence across browser refresh

### 📅 Habit Tracking
- Create and manage multiple habits
- Log daily habit completions
- View habit-specific activity timelines

### 📉 Decay Score System
- Backend logic computes habit consistency based on completion gaps
- Automatically updates decay score over time
- Encourages long-term consistency rather than short streaks

### 📊 Visual Insights
- Interactive charts displaying habit performance trends
- Clear visual feedback for habit decay and improvement

---

## 🔄 Habit Tracking Flow

1. User logs in
2. Creates one or more habits
3. Logs daily completions
4. Backend recalculates decay score based on timestamps
5. Frontend displays progress using charts

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB (Mongoose)

### Deployment
- Render

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/sharonbrayan/habit-decay-tracker.git
cd backend
npm install
npm run dev

cd frontend
npm install
npm start
```
Create a .env file using .env.example.


---

🎯 Learning Outcomes

Designing habit tracking systems beyond simple streak logic

Implementing backend-based analytical scoring

Visualizing user data using charts

Structuring secure full-stack MERN applications


---