![logo](https://user-images.githubusercontent.com/76046065/205491677-26a48b27-d210-4b7d-b05f-193b02d28b98.png)

# Shopsy-Store is a full-Stack React E-Commerce Web Application

Welcome to **Shopsy-Store**, a full-stack e-commerce application built with React, Firebase, Node.js, Express.js, and various other technologies.

## Demo

You can check out the live demo of Shopsy at [Demo Link](https://shopsy-store.vercel.app/).

## Features

- Browse a wide selection of products.
- Filter and sort products functionalities
- Add products to your cart.
- Manage your cart items and quantities.
- Add products to your wishlist
- Address management
- Checkout and make payments securely using rozarpay
- Routing handled with React Router DOM.
- State management via Context API.
- User authentication and authorization using Firebase.
- Data management with firebase firestore
- Live previews
- Responsive design with Tailwind CSS.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirandebnath81/Shopsy-Store.git

   ```

2. Change into the project directory:

   ```bash
   cd Shopsy-Store

   ```

3. Install the frontend dependencies and start the dev server:

   ```bash
   cd frontend
   npm install
   npm run dev

   ```

4. Install the backend dependicies and start the dev server:

   ```bash
   cd backend
   npm install
   node index.js

   ```

5. Set up Firebase configuration:

- Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/u/0/)

- Obtain your Firebase configuration object.

- Create a .env file in the project root and add your Firebase configuration:

  ```bash
  VITE_FIREBASE_API_KEY=your-api-key
  VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
  VITE_FIREBASE_PROJECT_ID=your-project-id
  VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
  VITE_FIREBASE_APP_ID=your-app-id
  ```

## Technologies Used

- React
- Context API for state management
- React Router DOM
- Firebase (Authentication, Firestore for data)
- Node.js and Express.js (for payment processing)
- Razorpay payment gateway
- Tailwind CSS
