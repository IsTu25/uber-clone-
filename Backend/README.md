# 🚗 Uber Clone API Documentation

This documentation describes the authentication endpoints for the Uber Clone API. Each endpoint is thoroughly documented with examples and response formats.

## 🔐 Authentication Endpoints

### 1. Register New User (`/users/register`)

Register a new user account with the system.

#### 📝 Request Details
- **Method**: POST
- **URL**: `/users/register`
- **Content-Type**: application/json

#### Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "secret123"
}
```

#### Validation Rules
| Field | Rules |
|-------|--------|
| email | Must be valid email format |
| firstname | Minimum 3 characters |
| lastname | Minimum 3 characters |
| password | Minimum 6 characters |

#### 📤 Response Examples

**Success (201 Created)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

**Validation Error (400 Bad Request)**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid Email"
    }
  ]
}
```

### 2. User Login (`/users/login`)

Authenticate an existing user and receive a JWT token.

#### 📝 Request Details
- **Method**: POST
- **URL**: `/users/login`
- **Content-Type**: application/json

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

#### 📤 Response Examples

**Success (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "12345",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

**Authentication Failed (401 Unauthorized)**
```json
{
  "message": "Invalid email or password"
}
```

### 3. Get User Profile (`/users/profile`)

Retrieve the authenticated user's profile information.

#### 📝 Request Details
- **Method**: GET
- **URL**: `/users/profile`
- **Authentication**: Required
  - Cookie: `token=<jwt-token>` or
  - Header: `Authorization: Bearer <jwt-token>`

#### 🔒 Authentication
The endpoint requires a valid JWT token which can be provided in two ways:
1. As an HTTP-only cookie (recommended)
2. In the Authorization header using Bearer scheme

#### 📤 Response Examples

**Success (200 OK)**
```json
{
  "id": "12345",
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### 4. User Logout (`/users/logout`)

Securely log out the user by invalidating their JWT token.

#### 📝 Request Details
- **Method**: GET
- **URL**: `/users/logout`
- **Authentication**: Required
  - Cookie: `token=<jwt-token>` or
  - Header: `Authorization: Bearer <jwt-token>`

#### 🔐 Security Features
- Clears the authentication cookie
- Blacklists the JWT token
- Prevents token reuse after logout

#### 📤 Response Examples

**Success (200 OK)**
```json
{
  "message": "Logged Out"
}
```

**No Token (400 Bad Request)**
```json
{
  "message": "No token found to logout"
}
```

## 💻 Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message description"
}
```

Common HTTP Status Codes:
- **200/201**: Success
- **400**: Bad Request / Validation Error
- **401**: Unauthorized
- **500**: Server Error

## 🔍 Tips for Implementation

1. Always store JWT tokens securely
2. Use HTTPS in production
3. Include the token in every authenticated request
4. Handle token expiration gracefully

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)
