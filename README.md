# 🧼 Cleaning Service Management System

A full-stack web application to manage cleaning services — allows users to register, book services, and view their bookings, while administrators can manage services and customer bookings.

## 🚀 Features

### User
- Register and log in securely
- Browse services
- Book cleaning services
- View and manage their own bookings

### Admin
- Admin login/logout
- View all bookings
- Add, edit, and delete services
- Delete customer bookings

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

### 1. Clone the Repository

```bash
-git clone https://github.com/pabasaraabey/Clean_Service_mangement.git
cd Clean_Service_mangement-

###. Backend Setup

cd backend
npm install

Create a .env file in /backend with:

PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

Start the server: npm run server

###. Frontend Setup

cd ../frontend
npm install
npm run dev


