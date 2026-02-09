# node-express-ecommerce
# 🛒 E-Commerce API Platform

A robust and scalable E-Commerce Backend API built with **Node.js, Express, and MongoDB**.
This project serves as the core engine for an online store, managing users, products, dynamic shopping carts, order processing, and secure payments via Stripe.

---

## 🚀 Features

* 🔐 **Secure Authentication:** User registration & login using JWT with Role-Based Access Control (Admin/User).
* 📦 **Product Management:** Full CRUD operations for products (Admin restricted).
* 🛒 **Smart Cart System:** Persistent shopping cart stored in the database with stock checks.
* 📝 **Order Lifecycle:** Complete order flow (Created → Processing → Paid → Delivered).
* 💳 **Payment Integration:** Secure payment processing using **Stripe Payment Intents**.
* 🛡️ **Security Best Practices:** Data validation, error handling, and password hashing (Bcrypt).

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT)
* **Payment Gateway:** Stripe API
* **Tools:** Dotenv, Nodemon, VS Code

---

## 📂 Project Structure

```text
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection logic
│   │   ├── controllers/        # Business logic (Auth, Cart, Order, Product, Payment)
│   │   ├── middlewares/        # Auth protection & Error handling
│   │   ├── models/             # Mongoose schemas (User, Product, Cart, Order)
│   │   ├── routes/             # API Endpoints definition
│   │   └── server.js           # Entry point & App configuration
│   ├── .env                    # Environment variables (Hidden)
│   └── package.json            # Dependencies & Scripts
└── frontend/                   # (Coming Soon: React + Vite)

----


## ⚙️ Installation & SetupFollow these steps to set up the project locally.
1. Clone the repositoryBashgit clone [https://github.com/YOUR_USERNAME/ecommerce-platform.git](https://github.com/YOUR_USERNAME/ecommerce-platform.git)
cd ecommerce-platform/backend
2. Install DependenciesBashnpm install
3. Configure EnvironmentCreate a .env file in the backend folder and add your credentials:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=your_stripe_test_key
4. Run the ServerBash# Development mode (with Nodemon)
npm run dev

# Production mode
npm start

## 🔌 Key API EndpointsMethodEndpointDescriptionAccess
POST/api/auth/registerRegister new userPublic
POST/api/auth/loginLogin userPublicGET/api/productsGet all productsPublic
POST/api/cartAdd item to cartUserPOST/api/ordersCreate orderUser
POST/api/payment/intentsInitialize Stripe paymentUser

## 🔮 Future Improvements:
-Frontend Development (React + Vite).
-Stripe Webhooks Implementation.
-Image Upload using Cloudinary.
-Email Notifications for Orders.

## 👨‍💻 Author
Mohammed Walid
Backend Developer (Node.js)
LinkedIn: https://github.com/MohammedWalid22
GitHub: www.linkedin.com/in/mohammed-waleed-2033872a7

---

## ⭐️ Don't forget to star the repo if you found it useful!



