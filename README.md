# 🚀 ReSell Hub

A modern second-hand marketplace platform where users can buy and sell pre-owned products securely and efficiently. ReSell Hub promotes sustainable shopping by connecting buyers and sellers in a trusted marketplace ecosystem.

## 🌐 Live Links

- Live Site: https://re-sell-hub-client.vercel.app/
- Client Repository: https://github.com/omarFarukGit/ReSellHubClient
- Server Repository: https://github.com/omarFarukGit/ReSellHubServer

---

## 📖 Project Overview

ReSell Hub is an online marketplace designed for buying and selling second-hand products. Sellers can list their unused items, while buyers can discover affordable products, place orders, and make secure payments through Stripe.

The platform aims to reduce waste, promote sustainability, and create earning opportunities for users through a seamless and secure marketplace experience.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- Email & Password Login
- Google Authentication
- Better Auth Integration
- JWT Protected APIs
- Role-Based Access Control
- Persistent User Sessions

### 🛒 Product Management

- Add New Products
- Edit Existing Products
- Delete Products
- Product Categories
- Product Condition Selection
- Product Image Upload

### ❤️ Wishlist System

- Add Products to Wishlist
- Remove Wishlist Items
- View Saved Products

### 📦 Order Management

- Place Orders
- View Order History
- Cancel Orders
- Track Order Status

### 💳 Stripe Payment Integration

- Secure Checkout
- Payment Validation
- Transaction Tracking
- Payment History

### 📊 Dashboard Analytics

#### Buyer Dashboard

- Total Orders
- Wishlist Count
- Recent Purchases
- Payment History

#### Seller Dashboard

- Total Products
- Total Revenue
- Total Sales
- Pending Orders

#### Admin Dashboard

- Total Users
- Total Products
- Total Orders
- Platform Analytics

### 🔍 Advanced Features

- Product Search
- Product Sorting
- Pagination
- Responsive Dashboard
- Dynamic Statistics

### 🎨 UI Features

- Modern Marketplace Design
- Framer Motion Animations
- Skeleton Loading
- Fully Responsive Layout
- Custom 404 Page

---

## 👥 User Roles

### Buyer

- Browse Products
- Add to Wishlist
- Place Orders
- Complete Payments
- Manage Profile

### Seller

- Add Products
- Manage Products
- Handle Orders
- View Sales Analytics

### Admin

- Manage Users
- Manage Products
- Manage Orders
- Monitor Transactions

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Hero UI
- Framer Motion
- React Toastify

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Better Auth
- JWT

### Payment Gateway

- Stripe

### Deployment

- Vercel
- MongoDB Atlas

---

## 📦 NPM Packages

### Frontend

```bash
next
react
typescript
tailwindcss
react-hook-form
framer-motion
react-toastify
lucide-react
react-icons
@heroui/react

```

### Backend

```bash
typescript
express
mongoose
jsonwebtoken
bcryptjs
cors
dotenv
stripe
ImageBB
```

---

## 🗄️ Database Collections

### Users

```js
{
  (name, email, image, role, phone, location, status);
}
```

### Products

```js
{
  (title, category, condition, price, images, description, sellerInfo, status);
}
```

### Orders

```js
{
  (buyerInfo, sellerInfo, productId, paymentStatus, orderStatus);
}
```

---

## 🔒 Security Features

- JWT Verification
- Protected Routes
- Protected APIs
- Role-Based Authorization
- Environment Variables
- Secure Stripe Payment Processing

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---

## 🚀 Installation Guide

### Clone Repositories

```bash
git clone https://github.com/your-username/ReSellHubClient.git
git clone https://github.com/your-username//ReSellHubClient.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## ⚙️ Environment Variables

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Server

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_BASE_URL=

MONGO_URI=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_IMGBB_KEY=

```

---

## 🌱 Sustainability Impact

ReSell Hub encourages responsible consumption by extending the lifecycle of products and reducing unnecessary waste through second-hand trading.

---

## 👨‍💻 Developer

**MD Omar Faruk**

---

## 📄 License

This project is developed for educational and portfolio purposes.
