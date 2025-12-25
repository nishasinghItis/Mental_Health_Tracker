# 🛡️ authMiddleware.js - Complete Security Guard Documentation

## What is Middleware? 🤔

In Express/Node.js, middleware is a function that sits between the request and the response.
It processes the request before it reaches the route handler (controller).
It can modify the request, validate data, check authentication, or send a response itself.

### Real-World Analogy:
```
You → Security Guard → VIP Room
     (Middleware)    (Protected Route)
```

**In our app:**
- **Public routes** = Login, Register (no authentication needed)
- **Protected routes** = Dashboard, Profile, Mood entries (authentication required)
- **authMiddleware** = Security guard checking JWT tokens

## 🔄 Middleware Flow in Express

### **How Middleware Works:**
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
    ↓         ↓             ↓              ↓            ↓
  Login    CORS Check   Auth Check    Dashboard    User Data
```

### **In Our App:**
```
Frontend Request → authMiddleware → Protected Route → Controller → Response
       ↓               ↓                ↓              ↓          ↓
   JWT Token      Token Valid?     Dashboard.jsx   User Data   Success!
```

## 📋 Line-by-Line Breakdown

### **Import Statements (Lines 2-3)**
```javascript
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
```

**What each import does:**
- `jwt` = **Token decoder** - reads and verifies JWT tokens
- `User` = **Database model** - to fetch user details from database

**Like:** Importing tools for a security guard - ID scanner and employee database

### **Secret Key (Line 5)**
```javascript
const JWT_SECRET = process.env.JWT_SECRET || 'yourVerySecretKey123';
```

**Breaking it down:**
- `process.env.JWT_SECRET` = "Get secret from environment variables"
- `||` = "OR operator - if not found, use fallback"
- `'yourVerySecretKey123'` = "Backup secret (for development)"

**Like:** The master key that security uses to verify all ID cards

### **Middleware Function Declaration (Line 7)**
```javascript
export const protect = async (req, res, next) => {
```

**Keyword breakdown:**
- `export` = "Other files can use this function"
- `const protect` = "Function name (you can call it anything)"
- `async` = "This function can wait for database operations"
- `(req, res, next)` = "Three parameters every middleware receives"
  - `req` = **Request** (what user sent)
  - `res` = **Response** (what we send back)
  - `next` = **Function** to call when middleware is done

**Like:** Security guard function that takes visitor info, has access to response system, and can call "next person in line"

## 🔍 Token Extraction Process

### **Get Authorization Header (Line 8)**
```javascript
const authHeader = req.headers.authorization;
```

**What's happening:**
- `req.headers` = All HTTP headers sent by frontend
- `.authorization` = Specific header containing the token
- **Expected format:** `"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`

**Like:** Looking for the visitor's ID badge

### **Check if Token Exists (Lines 10-12)**
```javascript
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ message: 'Unauthorized: No token' });
}
```

**Breaking it down:**
- `!authHeader` = "If no authorization header exists"
- `!authHeader.startsWith('Bearer ')` = "If header doesn't start with 'Bearer '"
- `return res.status(401)` = "Send 401 Unauthorized error and stop here"

**Like:** "Sorry, no ID badge = no entry"

### **Extract Token (Line 14)**
```javascript
const token = authHeader.split(' ')[1];
```

**What's happening:**
- `authHeader.split(' ')` = Split "Bearer token123" into ["Bearer", "token123"]
- `[1]` = Get the second part (the actual token)

**Example:**
```javascript
authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
authHeader.split(' ') = ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Like:** Removing the ID badge from its holder to scan it

## 🔐 Token Verification Process


jwt.sign(payload, secret, options) → token banata hai.

jwt.verify(token, secret) → token ko check karta hai aur agar valid hai to payload wapas deta hai.

**Why we need this:**
- Token might be expired
- Token might be tampered with
- Token might be malformed
- Database might be down

**Like:** Having a backup plan if the ID scanner breaks

### **Decode Token (Line 17)**
```javascript
const decoded = jwt.verify(token, JWT_SECRET);
```

**What happens:**
- `jwt.verify()` = "Check if this token is valid"
- `token` = The JWT token from frontend
- `JWT_SECRET` = Our secret key for verification
- `decoded` = The original data (usually contains user ID)

**Example of decoded token:**
```javascript
decoded = {
  id: "507f1f77bcf86cd799439011",
  iat: 1640995200,  // issued at
  exp: 1641081600   // expires at
}
```

**Like:** Using the master key to verify the ID badge is authentic

### **Fetch User from Database (Line 18)**
```javascript
const user = await User.findById(decoded.id).select('-password');
```

**Breaking it down:**
- `User.findById()` = "Find user in database by ID"
- `decoded.id` = User ID from the token
- `.select('-password')` = "Get all user data EXCEPT password"
- `await` = "Wait for database to respond"

**Like:** Looking up the person in the employee database to get their details

### **Check if User Exists (Lines 20-22)**
```javascript
if (!user) {
  return res.status(401).json({ message: 'Unauthorized: User not found' });
}
```

**Why this check:**
- User might have been deleted
- Token might contain invalid user ID
- Database might have issues

**Like:** "ID badge is valid, but this person is no longer an employee"

### **Attach User to Request (Line 24)**
```javascript
req.user = user; // attach full user document to request
```

**What this does:**
- Adds user information to the request object
- Now any route handler can access `req.user`
- Contains user's name, email, ID, etc. (but not password)

**Like:** Giving the visitor a temporary badge with their info

### **Call Next Middleware (Line 25)**
```javascript
next();
```

**What `next()` does:**
- "I'm done, move to the next middleware or route handler"
- Continues the request flow
- Without this, request hangs forever

**Like:** Security guard saying "You're cleared, go ahead"

### **Error Handling (Lines 26-29)**
```javascript
} catch (err) {
  console.error(err);
  res.status(401).json({ message: 'Unauthorized: Invalid token' });
}
```

**When this runs:**
- Token is expired
- Token is malformed
- Token signature is invalid
- Database connection fails

**Like:** "Something's wrong with your ID badge - access denied"

## 🛣️ How to Use This Middleware

### **In Route Files:**
```javascript
import { protect } from '../middleware/authMiddleware.js';

// Public route (no middleware)
router.post('/login', loginUser);

// Protected route (with middleware)
router.get('/profile', protect, getUserProfile);
//                     ↑ middleware runs first
```

### **Multiple Middlewares:**
```javascript
router.get('/admin', protect, checkAdmin, getAdminData);
//                   ↑ auth   ↑ role     ↑ final handler
```

## 🔄 Complete Request Flow Example

### **Protected Route Access:**
```
1. User clicks "View Profile" in React app

2. Frontend sends request:
   GET /api/users/profile
   Headers: { Authorization: "Bearer eyJhbGciOiJIUzI1..." }

3. Express server receives request

4. Route definition:
   router.get('/profile', protect, getUserProfile);

5. authMiddleware (protect) runs FIRST:
   - Extracts token from Authorization header
   - Verifies token with JWT_SECRET
   - Finds user in database
   - Attaches user to req.user
   - Calls next()

6. getUserProfile controller runs:
   - Can access req.user (thanks to middleware)
   - Returns user profile data

7. Response sent back to frontend:
   { name: "John", email: "john@email.com", ... }
```

### **Failed Authentication:**
```
1. User sends request with invalid/expired token

2. authMiddleware runs:
   - Token verification fails
   - Returns 401 Unauthorized
   - STOPS here (doesn't call next())

3. Route handler NEVER runs

4. Frontend receives error:
   { message: "Unauthorized: Invalid token" }

5. Frontend redirects to login page
```

## 🎯 HTTP Status Codes Used

| Code | Meaning | When Used |
|------|---------|-----------|
| 401 | Unauthorized | No token, invalid token, user not found |
| 200 | OK | Token valid, user authenticated |

## ⚠️ Common Security Issues

### **1. Missing Bearer Prefix**
```javascript
// ❌ Wrong - just sending token
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// ✅ Correct - Bearer prefix required
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **2. Exposing Passwords**
```javascript
// ❌ Wrong - includes password
const user = await User.findById(decoded.id);

// ✅ Correct - excludes password
const user = await User.findById(decoded.id).select('-password');
```

### **3. Not Calling next()**
```javascript
// ❌ Wrong - request hangs
if (tokenValid) {
  req.user = user;
  // Missing next() - request never continues
}

// ✅ Correct - continues to route handler
if (tokenValid) {
  req.user = user;
  next(); // Essential!
}
```

## 🔧 Frontend Integration

### **How Frontend Sends Tokens:**
```javascript
// In React component
const token = localStorage.getItem('token');

const response = await axios.get('/api/users/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### **Axios Interceptor (Global Setup):**
```javascript
// Set token for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## 🎯 Key Concepts Summary

### **Middleware Chain:**
```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### **Authentication vs Authorization:**
- **Authentication** = "Who are you?" (this middleware)
- **Authorization** = "What can you do?" (role-based middleware)

### **JWT Token Structure:**
```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY0MDk5NTIwMH0.signature
```

### **Security Best Practices:**
1. Always use HTTPS in production
2. Keep JWT_SECRET secure
3. Set reasonable token expiration times
4. Never expose passwords in responses
5. Validate tokens on every protected request

## 💡 Beginner Tips

1. **Middleware runs in order** - protect must come before route handler
2. **Always call next()** - or request will hang
3. **Use try-catch** - tokens can be invalid
4. **Check token format** - must start with "Bearer "
5. **Exclude passwords** - use .select('-password')
6. **Handle all error cases** - no token, invalid token, user not found

This middleware is your app's security system - it ensures only authenticated users can access protected features in your Mental Health Tracker!