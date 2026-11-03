# 🗣️ Varta (वार्ता)

<p align="center">
  <strong>A full-stack real-time chat experience built for seamless conversation.</strong><br />
  <em>"Varta" stems from the Sanskrit word for "Conversation" (वार्ता).</em>
</p>

<p align="center">
  <a href="https://varta-ixap.onrender.com/"><strong>Explore the Live Demo »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

---

## 🚀 Overview

Varta is a full-stack real-time chat application designed to be more than just a messaging tool. It’s a production-ready capstone project that implements advanced security, state management, and a tactile UI/UX. 

The project is **unified**, meaning the backend serves the frontend directly, allowing for a single-deployment architecture on **Render**.

### ✨ Key Features

- **Real-time Engine:** Bi-directional communication powered by **Socket.io**.
- **Tactile UX:** - ⌨️ Custom keyboard typing sounds.
  - 🔔 Notification alerts for new messages.
  - 🔇 Integrated **Sound Toggle** to manage audio preferences.
- **Advanced Security:**
  - **Arcjet:** Integrated middleware for bot protection and security inspection.
  - **JWT & Cookies:** Secure authentication using JSON Web Tokens stored in HTTP-only cookies.
  - **Bcrypt:** Industrial-grade password hashing.
- **Cloud Integration:** - **Cloudinary:** Cloud-based storage for user profile pictures.
  - **Resend:** Automated "Welcome" emails sent upon successful registration.
- **State Management:** Lightweight and snappy state handling via **Zustand**.

---

## 🛠️ Tech Stack

### Backend (The Core)
* **Runtime:** Node.js
* **Framework:** Express.js (v5.2.1+)
* **Database:** MongoDB via Mongoose
* **Communication:** Socket.io
* **Security:** Arcjet, Bcrypt, JsonWebToken
* **Mailing:** Resend

### Frontend (The Interface)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS & DaisyUI
* **State:** Zustand
* **API Client:** Axios
* **Notifications:** React Hot Toast

---

## 📂 Project Structure

This project follows a professional **Separation of Concerns** (SoC) architecture.

### Backend Structure
```
backend/
├── config/      # DB and API configurations
├── controllers/ # Business logic for routes
├── emails/      # Email templates and Resend logic
├── lib/         # Shared utility functions
├── middleware/  # Auth and Arcjet security layers
├── models/      # Mongoose schemas
└── routes/      # Express API endpoints
```
### Frontend Structure
```
frontend/src/
├── components/ # Reusable UI components
├── hooks/      # Custom React hooks
├── lib/        # Axios and Socket configurations
├── pages/      # Page-level components
└── store/      # Zustand state slices (Auth, Chat, etc.)
```

⚙️ Local Setup
#Clone the Repo
```
git clone [https://github.com/vishal-singh-web/Varta.git](https://github.com/vishal-singh-web/Varta.git)
cd Varta
```
#Install Dependencies
Install root and backend dependencies
```
npm install
```
# Install frontend dependencies
```
cd frontend
npm install
```
#Environment Variables Create a .env file in the root directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=...
ARCJET_KEY=...
NODE_ENV=development
```

For the Render deployment, add `MONGODB_URI` to the service's environment variables.
The backend will not start until it can connect to MongoDB.

The repository includes a scheduled GitHub Actions workflow that requests
`/health` every 10 minutes to prevent the Render service from sleeping due to
inactivity. GitHub Actions scheduled workflows can be delayed occasionally, so
this is not a substitute for a paid Render instance or a dedicated uptime
monitor.

#Run the Project
```
# From root (starts both using concurrently/nodemon)
npm run dev
```
🌐 Deployment:

This application is deployed on Render. The frontend is built and served as static files from the backend index.js, ensuring that the entire app runs on a single port for better performance and easier management.

Developed by Vishal Singh
