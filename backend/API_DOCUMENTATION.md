# Africa Jobs Platform API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Authentication Endpoints

#### 1.1 Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
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

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
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

**Validation Errors (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ]
}
```

#### 1.2 Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
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

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### 1.3 Get Current User
**GET** `/auth/me`

Get current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890",
    "location": "Nairobi, Kenya",
    "profilePicture": "",
    "isVerified": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

#### 1.4 Update User Details
**PUT** `/auth/updatedetails`

Update current user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "johnsmith@example.com",
  "phone": "+1234567890",
  "location": "Lagos, Nigeria"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Smith",
    "email": "johnsmith@example.com",
    "role": "user",
    "phone": "+1234567890",
    "location": "Lagos, Nigeria",
    "profilePicture": "",
    "isVerified": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 1.5 Update Password
**PUT** `/auth/updatepassword`

Update current user's password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
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

**Error (401):**
```json
{
  "success": false,
  "message": "Password is incorrect"
}
```

#### 1.6 Logout
**POST** `/auth/logout`

Logout current user (client-side token removal).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `user` | Regular job seeker | View jobs, apply for jobs, manage profile |
| `employer` | Job poster/recruiter | Post jobs, manage job listings, view applications |
| `admin` | Platform administrator | Full access to all features and user management |

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (Authentication Required) |
| 403 | Forbidden (Insufficient Permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

- **Limit**: 100 requests per 10 minutes per IP address
- **Headers**: Rate limit information is included in response headers

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Authentication**: Secure token-based authentication
3. **Input Validation**: All inputs are validated using express-validator
4. **Rate Limiting**: API rate limiting to prevent abuse
5. **CORS**: Cross-Origin Resource Sharing configuration
6. **Helmet**: Security headers for Express apps
7. **Error Handling**: Comprehensive error handling and logging

## Testing the API

You can test the API using the provided test script:

```bash
cd backend
npm test
```

Or manually using curl:

```bash
# Test basic endpoint
curl http://localhost:5000/

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Environment Variables

Make sure to set up your `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
``` 