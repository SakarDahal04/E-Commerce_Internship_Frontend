# ⚛️ React Frontend for E-Commerce Platform

This repository contains the **frontend** of a full-stack E-Commerce website built with **React**, connected to a **Django REST Framework** backend. It features secure token-based authentication, email verification, password management, and a complete e-commerce workflow.

---

## 📌 Features

* ✅ **User Authentication**

  * Registration
  * Secure login/logout

* 🛍 **Product Management**

  * View products in a responsive product list section
  * Product details and stock information

* 🛒 **Cart & Orders**

  * Add/remove products to cart
  * View and manage cart items
  * Place orders directly from the cart

* 💳 **Checkout & Payments**

  * Stripe integration for secure payments
  * Order confirmation after payment

* 📬 **Email Notifications**

  * Confirmation emails for registration and orders

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** v14 or higher
* **npm** or **yarn**

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/SakarDahal04/E-Commerce_Internship_Frontend.git
cd E-Commerce_Internship_Frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL="http://127.0.0.1:8000" # Backend base URL
```

4. **Start the development server**

```bash
npm run dev
```

Frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔗 Backend API

Ensure the Django backend is running at the URL specified in `.env`.
For backend setup, refer to the backend repository:

* **Backend Repo:** [Django E-Commerce Backend](https://github.com/SakarDahal04/E-Commerce_Internship)

---

## 🤝 Contributing

This project is a work in progress. Contributions, suggestions, and feedback are welcome!

---

## 📫 Contact

Connect with me on [LinkedIn](https://www.linkedin.com/in/sakar-dahal-30a560277/) for questions or collaboration.

---

Made with ❤️ and ⚛️ React.
