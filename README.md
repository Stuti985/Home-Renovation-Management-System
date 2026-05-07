# 🏡 RenovatePro - Home Renovation Management SaaS

<p align="center">
  <img src="frontend/public/hero-renovation.png" alt="RenovatePro Cover Image" width="800"/>
</p>

> A modern, premium, production-level MERN stack application designed to seamlessly manage home renovation projects, track budgets, and connect homeowners with top-rated local contractors.

---

## ✨ Features

- **Modern Glassmorphism UI**: A highly responsive, animated, and premium frontend built with React, Vite, and Framer Motion.
- **Robust Authentication**: Secure JWT-based authentication featuring role-based access control (Admin vs. User), bcrypt password hashing, and complete email verification & password reset workflows.
- **Contractor Directory**: A searchable, filterable directory of professional contractors complete with public profiles and ratings.
- **Project Tracking**: Manage renovation tasks, expenses, and materials via Mongoose Virtual relationships (Parent Referencing).
- **Cloudinary Integration**: Secure drag-and-drop image uploads for Before/After galleries and user avatars.
- **Performance & Security**: Built with `helmet`, `xss-clean`, `express-rate-limit`, `express-mongo-sanitize`, and `apicache` for enterprise-grade security and lightning-fast speeds.
- **SEO Optimized**: Dynamic meta tags powered by `react-helmet-async` and code-splitting via `React.lazy`.

---

## 📸 Screenshots

*(Add your screenshots here by replacing the placeholder URLs)*

| Contractor Directory | Transformation Gallery |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250?text=Contractor+Search" alt="Contractors" /> | <img src="https://via.placeholder.com/400x250?text=Gallery+View" alt="Gallery" /> |

| Project Dashboard | Profile & Uploads |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250?text=Project+Dashboard" alt="Dashboard" /> | <img src="https://via.placeholder.com/400x250?text=Image+Upload" alt="Uploads" /> |

---

## 📂 Folder Structure

The project utilizes a clear separation of concerns via a monorepo structure.

```text
e:\Home Renovate\
├── backend/                  # Express.js API Server
│   ├── config/               # Database connection logic
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Auth, Error, & Upload middleware
│   ├── models/               # Mongoose DB Schemas
│   ├── routes/               # API endpoint definitions
│   ├── services/             # Business logic & Email handlers
│   ├── utils/                # Helper functions (catchAsync, AppError)
│   └── server.js             # Main server entry point
│
└── frontend/                 # Vite + React Application
    ├── public/               # Static assets
    ├── src/
    │   ├── api/              # Axios configuration & interceptors
    │   ├── components/       # Reusable UI components (Cards, Navbar, Uploads)
    │   ├── contexts/         # React Context (Auth, Theme)
    │   ├── pages/            # Core views (Landing, Dashboard, Profile, etc.)
    │   ├── App.jsx           # Lazy-loaded Router & Suspense boundary
    │   └── index.css         # Global design tokens and animations
    └── vercel.json           # Production SPA routing configuration
```

---

## 🛠️ Installation & Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)
- Cloudinary Account (Optional, for image uploads)

### 1. Clone & Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/renovatepro
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_user
EMAIL_PASS=your_pass

# Cloudinary
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=12345
CLOUDINARY_API_SECRET=secret
```

### 3. Run the Application
You need two terminal windows to run both servers simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
The application will be running at `http://localhost:5173`.

*(Optional: Run `node seedServices.js` in the backend to populate your database with dummy contractors!)*

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication (`/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT
- `POST /forgot-password` - Generate reset token
- `PATCH /reset-password/:token` - Reset password

### Projects (`/projects`)
- `GET /` - Get all projects for logged-in user
- `POST /` - Create a new project
- `GET /:id` - Get specific project details (including populated virtuals)

### Contractors (`/contractors`)
- `GET /` - Search contractors (Supports `?search=`, `?service=`, `?minRating=`) *(Cached via RAM)*
- `GET /services` - Get all service categories *(Cached via RAM)*
- `GET /:id` - Get contractor profile

### Media (`/upload`)
- `POST /` - Upload a multipart/form-data image to Cloudinary

---

## 🚀 Deployment Guide

This project is fully optimized for cloud deployment.

### Backend (Render / Railway)
1. Push your repository to GitHub.
2. Connect your repository to Render/Railway, selecting the `backend` folder as the Root Directory.
3. Set the Build Command to `npm install` and Start Command to `node server.js`.
4. Inject all your `.env` variables into the host's environment settings.
5. Set `FRONTEND_URL` to your future Vercel domain to secure CORS.

### Database (MongoDB Atlas)
1. Create a free M0 Sandbox cluster.
2. Under Network Access, whitelist `0.0.0.0/0` (Allow access from anywhere).
3. Copy the Connection String and set it as your `MONGO_URI` in Render.

### Frontend (Vercel)
1. Connect the `frontend` folder to Vercel.
2. Vercel will automatically detect the Vite framework and apply the `vercel.json` SPA routing.
3. Add `VITE_API_URL` to your environment variables, pointing it to your deployed Render/Railway backend URL.
4. Deploy!

---

*Designed & Developed as a Premium SaaS Showcase.*
