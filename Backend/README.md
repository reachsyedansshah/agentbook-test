# AGENT BOOK

## Description
Robust backend application designed for managing user profiles and authentication. It offers a secure and efficient way to handle user registrations and logins, profile updates, and avatar uploads.

## Features
- User Authentication (Registration, Login)
- Profile Management (Create/Update Profile, Upload Avatar)
- JWT-based Authentication
- Secure Password Storage
- Custom Analytics Middleware
  - Logs API usage statistics
  - Provides insights through API endpoint
- Enhanced Security Features:
  - API Rate Limiter to prevent abuse
  - Encrypted Hashed Passwords for secure storage
  - Helmet for added security headers
  - CORS for cross-origin resource sharing
  - Morgan for HTTP request logging

## Technology Stack
- Node.js
- Express.js
- MongoDB

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB

## Environment Configuration
Set up the required environment variables in a .env file:
PORT=  Port number
MONGODB_URI= Your MongoDB connection string.
JWT_SECRET= A secret key for JWT signing.

### Installation
```bash
git clone [your-repo-link]
cd [your-repo-name]
npm install 
npm run doc
npm start
```

## API Documentation
API detailed documentation can be viewed in docs folder. open index.html
for the Postman collection, open this:
https://www.postman.com/grey-spaceship-992954/workspace/agentbook/collection/29412604-c45514ba-f2d4-44ef-8ef0-f51a6ee7d50d?action=share&creator=29412604

## Authors and Acknowledgment
Syed Ans Shah




