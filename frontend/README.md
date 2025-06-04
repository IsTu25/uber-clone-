# 🚗 Uber Clone Implementation

A simplified Uber clone focusing on core authentication and ride management features.

## ✨ Implemented Features

### 1. Authentication System
- User Login/Logout
- Captain (Driver) Login/Logout
- JWT-based secure authentication
- Token blacklisting for secure logout

### 2. Core Ride Features
- Real-time ride tracking
- Socket-based communication
- Basic fare calculation

## 🛠️ Technical Stack

### Frontend
```javascript
// Key Dependencies
{
  "react": "^18.x",
  "gsap": "for animations",
  "socket.io-client": "for real-time features",
  "tailwindcss": "for styling"
}
```

### Backend
```javascript
// Key Dependencies
{
  "express": "^4.x",
  "mongoose": "for MongoDB",
  "jsonwebtoken": "for authentication",
  "socket.io": "for real-time features"
}
```

## 🔒 API Implementation

### User Authentication
```javascript
// Login Request
POST /users/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    // ...other user details
  }
}
```

### Captain Authentication
```javascript
// Login Request
POST /captain/login
{
  "email": "captain@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt_token",
  "captain": {
    "id": "captain_id",
    "email": "captain@example.com",
    "vehicle": {
      // vehicle details
    }
  }
}
```

### Real-time Communication
```javascript
// Socket Events
socket.emit("join", { userType, userId });
socket.on("ride-confirmed", (ride) => {});
socket.on("ride-started", (ride) => {});
```

## 🙏 Credits & Acknowledgments

This project was developed with assistance from:
- ChatGPT for code suggestions and debugging
- GitHub repositories for architectural inspiration
- Various online tutorials and documentation

### Key Learning Resources
- Socket.IO Documentation
- React with TypeScript tutorials
- JWT Authentication best practices
- MongoDB/Mongoose guides

## 🚧 Development Status

Current implementation focuses on:
- Basic authentication flows
- Real-time ride tracking
- Simple user/captain interaction

Future enhancements planned:
1. Payment integration
2. Rating system
3. Ride history
4. Enhanced error handling

## ⚙️ Environment Setup
```bash
# Required Environment Variables
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

*Note: This is a learning project implementing core ride-sharing features.*
