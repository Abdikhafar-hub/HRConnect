# Africa Jobs Platform - Backend API

A Node.js, Express, and MongoDB backend API for the Africa Jobs Platform with JWT authentication and authorization.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 User Management (Register, Login, Profile)
- 🛡️ Security Middleware (Helmet, CORS, Rate Limiting)
- ✅ Input Validation
- 🗄️ MongoDB Database with Mongoose
- 🔒 Password Hashing with bcrypt
- 📝 Error Handling
- 🚀 Production Ready

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Logging**: morgan

## Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   - Copy `.env` file and configure your variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user",
    "phone": "+1234567890",
    "location": "Nairobi, Kenya"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`

#### Update User Details
- **PUT** `/api/auth/updatedetails`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Smith",
    "email": "johnsmith@example.com",
    "phone": "+1234567890",
    "location": "Lagos, Nigeria"
  }
  ```

#### Update Password
- **PUT** `/api/auth/updatepassword`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }
  ```

#### Logout
- **POST** `/api/auth/logout`
- **Headers**: `Authorization: Bearer <token>`

## User Roles

- **user**: Regular job seeker
- **employer**: Job poster/recruiter
- **admin**: Platform administrator

## Response Format

### Success Response
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890",
    "location": "Nairobi, Kenya",
    "profilePicture": "",
    "isVerified": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Validation Error Response
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Cross-Origin Resource Sharing configuration
- **Helmet**: Security headers for Express apps
- **Error Handling**: Comprehensive error handling and logging

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRE` | JWT token expiration time | `30d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── auth.js              # Authentication controller
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── error.js             # Error handling middleware
│   └── validate.js          # Validation middleware
├── models/
│   └── User.js              # User model
├── routes/
│   └── auth.js              # Authentication routes
├── utils/                   # Utility functions
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 