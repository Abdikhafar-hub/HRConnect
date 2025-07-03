# Africa Jobs Platform

A full-stack job platform designed specifically for the African job market, connecting workers and employers across Africa.

## 🏗️ Project Structure

```
africa-jobs-platform/
├── Frontend/                 # Next.js Frontend Application
│   ├── app/                  # Next.js App Router
│   │   ├── admin/           # Admin dashboard routes
│   │   ├── auth/            # Authentication pages
│   │   ├── employer/        # Employer-specific routes
│   │   ├── worker/          # Worker-specific routes
│   │   └── lib/             # Frontend utilities
│   ├── components/          # Reusable React components
│   │   └── ui/              # shadcn/ui component library
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── public/              # Static assets
│   ├── styles/              # Global styles
│   └── package.json         # Frontend dependencies
├── Backend/                 # Node.js/Express Backend API
│   ├── routes/              # API route handlers
│   ├── controllers/         # Business logic handlers
│   ├── models/              # MongoDB/Mongoose models
│   ├── middleware/          # Express middleware
│   ├── config/              # Configuration files
│   ├── utils/               # Utility functions
│   └── package.json         # Backend dependencies
└── package.json             # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd africa-jobs-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   **Frontend** (`Frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

   **Backend** (`Backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Run the development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🛠️ Development

### Running Individual Servers

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
npm start
```

## 🏛️ Architecture

### Frontend (Next.js 15)
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Context + Local Storage
- **Authentication**: JWT-based with localStorage

### Backend (Node.js/Express)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express-validator

## 👥 User Types

### Workers
- Browse available jobs
- Apply for jobs
- Manage profile and settings
- View ratings and reviews
- Manage wallet/earnings

### Employers
- Post job opportunities
- Review applications
- Manage worker profiles
- Handle ratings and reviews
- Manage payments and wallet

### Admins
- Platform management dashboard
- User management
- Content moderation

## 🔧 Key Features

- **Modern UI/UX**: Responsive design with dark/light mode
- **Real-time Updates**: Live job postings and applications
- **Rating System**: Worker and employer rating system
- **Payment Integration**: Wallet system for transactions
- **Search & Filter**: Advanced job and worker search
- **Security**: JWT authentication, rate limiting, input validation

## 📁 File Organization

### Frontend Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and API clients
- `hooks/` - Custom React hooks
- `styles/` - Global CSS and Tailwind configuration

### Backend Structure
- `routes/` - API endpoint definitions
- `controllers/` - Business logic implementation
- `models/` - MongoDB schema definitions
- `middleware/` - Express middleware functions
- `config/` - Database and app configuration

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Security headers with Helmet

## 📝 API Documentation

See `Backend/API_DOCUMENTATION.md` for detailed API endpoints and usage.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

Abdikhafar Issack

---

**Note**: Make sure MongoDB is running and properly configured before starting the application. 