# 📦 Enterprise Inventory Management System (MERN Stack)

[![Author](https://img.shields.io/badge/Author-AKASHMITTAL2004-blue.svg?style=for-the-badge&logo=github)](https://github.com/AKASHMITTAL2004)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A full-stack, real-time **Inventory Management System** engineered to automate stock tracking, sales order processing, supplier operations, and analytics visualization. Designed with modern web standards, role-based security, dynamic data charts, and real-time state synchronization.

---

## 🌟 Key Highlights

- 📈 **Real-Time Data Dashboard:** High-level overview displaying metrics for total stock value, low-stock notifications, recent sales orders, and product distributions.
- 🔐 **Role-Based Access Control (RBAC):** Token-based authentication using **JWT** enforcing granular access permissions between **Administrators** and **Managers**.
- 🛒 **Order & Sales Management:** Streamlined workflow for managing sales orders, dynamic inventory deductions, and order statuses.
- 📦 **Product & Category Administration:** Full CRUD operations for product catalogs, SKU tracking, pricing adjustments, and low-threshold alerts.
- 🖼️ **Cloud Image Assets:** Integrated cloud image upload pipelines powered by **Cloudinary**.
- 🎨 **Responsive UI/UX:** Built with React 19, Redux Toolkit, and Tailwind CSS/DaisyUI for desktop and mobile devices.

---

## 🏗️ Architecture & Tech Stack

### **Frontend Client**
* **Framework:** React.js (v19)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`)
* **Styling & UI:** Tailwind CSS, DaisyUI, Lucide React Icons
* **Charts & Analytics:** Chart.js, React-Chartjs-2
* **Form Validation:** React Hook Form & Yup

### **Backend Server**
* **Runtime:** Node.js & Express.js REST API
* **Database & ODM:** MongoDB with Mongoose ODM
* **Security & Auth:** JSON Web Tokens (JWT), Bcrypt password hashing, CORS configuration
* **Media Storage:** Cloudinary API

---

## 📂 Directory Structure

```text
Inventory-Management-System/
├── backend/                  # Server-side Application
│   ├── controller/           # Route handler controllers
│   ├── libs/                 # Database & helper libraries
│   ├── middleware/           # JWT & RBAC validation middleware
│   ├── models/               # Mongoose database schemas
│   ├── Routers/              # Express API router endpoints
│   ├── server.js             # Express application entry point
│   └── package.json          # Server dependencies & scripts
│
├── frontend/                 # Client-side Application
│   ├── public/               # HTML template & favicons
│   ├── src/                  # React source components & Redux slices
│   │   ├── components/       # Reusable UI components & layouts
│   │   ├── pages/            # View pages (Dashboard, Products, Orders)
│   │   └── redux/            # Store setup & state Reducers
│   └── package.json          # Client dependencies & scripts
│
└── README.md                 # Project Documentation

## ⚙️ Environment Configuration

To run this project locally, create a `.env` file inside the `backend` directory containing the following variables:

```env
# Server Configuration
PORT=5000

# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventory?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## 🚀 Step-by-Step Installation & Running Guide
Prerequisites
Ensure you have the following installed locally on your system:

Node.js (v18.0.0 or higher)

Git

MongoDB (Local instance or a free account on MongoDB Atlas)

1️⃣ Clone the Repository
Bash
git clone [https://github.com/AKASHMITTAL2004/Inventory-Management-System.git](https://github.com/AKASHMITTAL2004/Inventory-Management-System.git)
cd Inventory-Management-System
2️⃣ Configure & Start Backend
Navigate to the backend directory, install all required dependencies, and launch the server:

Bash
cd backend
npm install
npm start
The Express server will start running on http://localhost:5000.

3️⃣ Configure & Start Frontend
Open a new terminal tab or window, navigate to the frontend folder, install client packages, and launch the React app:

Bash
cd frontend
npm install
npm start
The React dashboard will automatically open at http://localhost:3000.