# 🔐 JWT Token Authentication System - Complete Guide

## 🎯 What is JWT Token?

**JWT (JSON Web Token)** is a secure way to transmit information between client and server. It's like a **digital passport** that proves user identity.

### JWT Structure

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGE4ZjNkMmY4YjRhMDAxMjM0NTY3OCIsImlhdCI6MTczMjg5NzE0MSwiZXhwIjoxNzMyOTgzNTQxfQ.K8vX2Y9mZ1nQ3pR4sT6uV7wA8bC9dE0fG1hI2jK3lM4n
```

**Three Parts (separated by dots):**

1. **Header**: Algorithm info
2. **Payload**: User data (id, expiration)
3. **Signature**: Security verification

---

## 👥 WHO Generates the Token?

### **Server-Side Generation** (Node.js/Express)

```jsx
// File: server/controllers/authController.js
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
```

**Who:** Backend server (your Express.js API)  
**When:** After successful login/registration  
**Where:** `authController.js` - `loginUser` function

---

## 🕐 WHEN is Token Generated?

### **Login Process Flow**

```
1. User enters email/password → Frontend
2. POST /api/auth/login → Backend
3. Verify credentials → Database
4. Generate JWT token → Server
5. Send token back → Frontend
6. Store in localStorage → Browser
```

### **Code Implementation**

```jsx
// LOGIN CONTROLLER (server/controllers/authController.js)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. 🎯 GENERATE TOKEN HERE
    const token = jwt.sign(
      { id: user._id }, // Payload: user ID
      JWT_SECRET, // Secret key
      { expiresIn: "1d" } // Expires in 1 day
    );

    // 4. Send token to frontend
    res.status(200).json({
      message: "User logged in successfully",
      token, // 🔑 TOKEN SENT HERE
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
```

---

## 🤔 WHY Use JWT Tokens?

HTTP kya hai?
HTTP (web ka protocol) stateless hota hai = iska matlab hai server ko yaad नहीं रहता कि पिछली request किसने bheji thi.
हर नई request ekदम नई मानी जाती है.
👉 Example: Agar tum login करके अगली request bhejo, server ko yaad नहीं रहेगा कि tum login हो चुके हो.

🔹 Session kya hai? (Stateful Authentication)
Jab tum login karte ho, server ek session banata hai (ek memory entry jisme user ki details hoti hain, jaise userId: 101).
Server tumhe ek session ID deta hai (cookie ke through).
Har baar jab tum request bhejte ho, tum apna session ID wapas bhejte ho.
Server us ID ko apni memory/database me check karta hai → "haan yeh banda login hai".
👉 Matlab server state (yaad) rakhta hai = isko Stateful Authentication bolte hain.

Lekin dikkat: Har active user ke liye server ko memory/database me ek session object rakhna padta hai.
Agar 1 lakh users ek saath login ho jayein, toh 1 lakh session objects server memory/database me store rahenge.
Isi wajah se isko Stateful kehte hain (server har user ki state yaad rakhta hai).

🔹 JWT kya hai? (Stateless Authentication)
Jab tum login karte ho, server ek JWT token banata hai aur tumhe de deta hai.
Is JWT ke andar hi sari information hoti hai (jaise userId, role, expiry).
Tum jab bhi request bhejte ho, JWT bhejte ho (header me).
Server JWT ka signature verify karta hai → agar valid hai, toh accept kar leta hai.
👉 Yahan server ko koi session store karne ki zarurat nahi hai.
Server sirf JWT check karta hai → isko bolte hain Stateless Authentication.

### **Security Benefits**

1. **Stateless**: Server doesn't store session data
2. **Secure**: Cryptographically signed
3. **Portable**: Works across different domains
4. **Expirable**: Automatic timeout for security

### **User Experience**

1. **No repeated logins**: Token persists in browser
2. **Fast authentication**: No database lookup needed
3. **Seamless navigation**: Access protected routes instantly

---

## 🔄 HOW Token Authentication Works

### **Complete Authentication Flow**

#### **1. User Login (Token Generation)**

```jsx
// Frontend: Login.jsx
const handleLogin = async (formData) => {
  const response = await axios.post("/api/auth/login", formData);

  // 🔑 RECEIVE TOKEN FROM SERVER
  const { token, user } = response.data;

  // 💾 STORE TOKEN IN BROWSER
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  // ➡️ REDIRECT TO DASHBOARD
  navigate("/dashboard");
};
```

#### **2. Protected Route Access (Token Verification)**

```jsx
// Frontend: ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  // 🔍 CHECK IF TOKEN EXISTS
  const token = localStorage.getItem("token");

  if (!token) {
    // ❌ NO TOKEN = REDIRECT TO LOGIN
    return <Navigate to="/login" replace />;
  }

  // ✅ TOKEN EXISTS = ALLOW ACCESS
  return children;
};
```

#### **3. API Requests (Token Usage)**

```jsx
// Frontend: API calls with token
const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`, // 🔐 SEND TOKEN TO SERVER
    },
  });
};
```

#### **4. Server Verification (Token Validation)**

```jsx
// Backend: authMiddleware.js
export const protect = async (req, res, next) => {
  // 1. Extract token from request header
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1]; // Remove "Bearer "

  try {
    // 2. 🔍 VERIFY TOKEN SIGNATURE
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. 🔍 FIND USER IN DATABASE
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. ✅ ATTACH USER TO REQUEST
    req.user = user;
    next(); // Continue to protected route
  } catch (err) {
    // ❌ INVALID TOKEN
    res.status(401).json({ message: "Invalid token" });
  }
};
```

---

## 🗂️ Token Storage & Management

### **Frontend Storage (Browser)**

```jsx
// Store token after login
localStorage.setItem("token", token);

// Retrieve token for API calls
const token = localStorage.getItem("token");

// Remove token on logout
localStorage.removeItem("token");
```

### **Backend Secret Key**

```jsx
// server/controllers/authController.js
const JWT_SECRET = "yourVerySecretKey123"; // Should be in .env file

// Better approach:
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
```

---

## 🔒 Security Implementation

### **Token Expiration**

```jsx
// Token expires in 1 day
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

// Other options:
{
  expiresIn: "15m";
} // 15 minutes
{
  expiresIn: "7d";
} // 7 days
{
  expiresIn: "30d";
} // 30 days
```

### **Protected Routes Usage**

```jsx
// server/routes/moodRoutes.js
import { protect } from "../middleware/authMiddleware.js";

// All mood routes require authentication
router.get("/", protect, getMoods); // GET /api/moods
router.post("/", protect, createMood); // POST /api/moods
router.delete("/:id", protect, deleteMood); // DELETE /api/moods/:id
```

---

## 🚀 Complete Authentication Lifecycle

### **1. Registration/Login**

```
User → Frontend → Backend → Database → JWT Generation → Frontend Storage
```

### **2. Dashboard Access**

```
User clicks dashboard → ProtectedRoute checks token → Allow/Deny access
```

### **3. API Requests**

```
Frontend → Send token in header → Backend verifies → Database access → Response
```

### **4. Logout**

```
User clicks logout → Remove token from localStorage → Redirect to login
```

---

## 🛡️ Security Best Practices

### **Current Implementation**

✅ Token expiration (1 day)  
✅ Secure token generation  
✅ Protected routes  
✅ Server-side verification

### **Recommended Improvements**

```jsx
// 1. Use environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// 2. Shorter expiration for sensitive apps
{
  expiresIn: "15m";
}

// 3. Refresh token mechanism
// 4. HTTPS only in production
// 5. Token blacklisting on logout
```

---

## 🔧 Troubleshooting Common Issues

### **Token Not Found**

```jsx
// Check localStorage in browser DevTools
console.log(localStorage.getItem("token"));
```

### **Invalid Token Error**

- Token expired
- Wrong JWT_SECRET
- Malformed token

### **Unauthorized Access**

- Token missing from request headers
- User deleted from database
- Token signature invalid

---

This JWT system provides secure, scalable authentication for your Mental Health Tracker application, ensuring only authenticated users can access protected features while maintaining a smooth user experience.
