# 🏗️ user.js (Mongoose Model) - Complete Beginner's Guide

## What is a Mongoose Model? 🤔

Think of a **Mongoose Model** like a **blueprint for building houses**:

- **Schema** = Blueprint (defines what a house should have: rooms, doors, windows)
- **Model** = Model is a JavaScript object in Mongoose that represents a collection in MongoDB. It is created using a Schema (which defines structure and rules). Through the model, we can create, read, update, and delete documents in the database.

- **Document** = Actual house (a real user in your database)

### Real-World Analogy:
```
Cookie Cutter (Schema) → Cookie Factory (Model) → Individual Cookies (Documents)
```

**In our app:**
- **userSchema** = Blueprint defining what user data looks like
- **User Model** = Factory for creating/finding users
- **User Documents** = Actual users like John, Sarah, Mike in database

## 🔄 Complete Data Flow

```
React Form → Backend Route → Controller → User Model → MongoDB → Response
    ↓              ↓             ↓           ↓           ↓         ↓
{name: "John"}  POST /register  registerUser  User.create()  Database  Success!
```

## 📋 Line-by-Line Breakdown

### **Import Statements (Lines 1-2)**
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
```

**What each import does:**
- `mongoose` = **Database helper** - like Google Translate for talking to MongoDB
- `bcrypt` = **Password scrambler** - makes passwords unreadable to hackers

**Simple explanation:**
- `mongoose` = Your translator for speaking "database language"
- `bcrypt` = Your password safe that scrambles passwords

### **Schema Creation (Line 4)**
```javascript
const userSchema = new mongoose.Schema({
```

**Breaking it down:**
- `const userSchema` = "Create a blueprint called userSchema"
- `new mongoose.Schema()` = "Make a new blueprint using Mongoose"
- `{` = "Here's what the blueprint contains..."

**Like:** Drawing the floor plan for a house before building it

## 🏠 Schema Fields Explained

### **Name Field (Lines 5-8)**
```javascript
name: {
  type: String,
  required: true,
},
```

**What each property means:**
- `name:` = "This field is called 'name'"
- `type: String` = "Only text allowed (not numbers or dates)"
- `required: true` = "Every user MUST have a name (can't be empty)"

**Like:** Every house must have an address (required), and it must be text (type: String)

### **Email Field (Lines 9-13)**
```javascript
email: {
  type: String,
  required: true,
  unique: true,
},
```

**New property explained:**
- `unique: true` = "No two users can have the same email"

**Like:** Every house must have a unique address - no duplicates allowed!

### **Password Field (Lines 14-17)**
```javascript
password: {
  type: String,
  required: true,
},
```

**Why just String and required:**
- Passwords will be scrambled (hashed) automatically
- Every user needs a password to login

### **Profile Image Field (Lines 18-21)**
```javascript
profileImage: {
  type: String, // store URL or base64 string
  default: '',  // default is empty
},
```

**New property explained:**
- `default: ''` = "If no image provided, use empty string"
- This field is NOT required (optional)

**Like:** Houses can have a garden (optional), but if not specified, assume no garden

### **Timestamps Option (Line 23)**
```javascript
}, { timestamps: true });
```

**What timestamps does:**
- Automatically adds `createdAt` and `updatedAt` fields
- `createdAt` = When user registered
- `updatedAt` = When user info was last changed

**Like:** Automatically stamping "Built on [date]" and "Last renovated on [date]" on every house

## 🔒 Password Hashing (Pre-save Hook)

### **Pre-save Middleware (Lines 25-30)**
```javascript
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

**What's happening step by step:**

1. **`userSchema.pre('save', ...)`** = "Before saving user to database, do this first.It runs before a document is saved to the database."
1.1 **`async function (next)`**
The function runs asynchronously because hashing is an async operation.next is a callback that tells Mongoose → "Okay, I'm done with this middleware, move on."

2. **`if (!this.isModified('password'))`** = "If password wasn't changed, skip this"
3. **`const salt = await bcrypt.genSalt(10)`** = "Create random scrambling ingredient"
4. **`this.password = await bcrypt.hash(...)`** = "Scramble the password"
5. **`next()`** = "Okay, now save to database"

**Real-world analogy:**
Like having a security guard who automatically locks your valuables in a safe before storing them in your house.

**Example:**
```
User types: "mypassword123"
Before saving: "$2a$10$xyzabc123scrambledversion..."
Stored in DB: "$2a$10$xyzabc123scrambledversion..."
```

## 🔍 Password Comparison Method

### **Custom Method (Lines 32-35)**
```javascript
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

**What this creates:**
- A custom function attached to every user
- Compares plain password with scrambled password
- Returns true if they match, false if they don't

**How it's used in controller:**
```javascript
const user = await User.findOne({ email });
const isMatch = await user.matchPassword(enteredPassword);
```

**Like:** Having a special key that can check if your password fits the scrambled lock

## 🏭 Model Creation (Line 37)

### **Model Definition**
```javascript
const User = mongoose.models.User || mongoose.model('User', userSchema);

Aap usually likhte ho:

const User = mongoose.model("User", userSchema);
Ye User naam ka model banata hai (jo MongoDB me "users" collection se connect hota hai).

🔹 Problem
Development me (React/Next.js/Nodemon use karte waqt) code baar-baar reload hota hai.
Agar ek hi model baar-baar declare ho jaye → error aata ha

OverwriteModelError: Cannot overwrite `User` model once compiled.

🔹 Solution
Isiliye hum check karte hain:

mongoose.models.User   // Agar pehle se User model bana hua hai to use kar lo
||                     // warna
mongoose.model("User", userSchema)  // naya model banao
Matlab:
👉 “Agar User model pehle hi registered hai, to wahi use karo.
👉 Agar nahi hai, to abhi naya banao.”





**Breaking it down:**
- `mongoose.model('User', userSchema)` = "Create a factory called 'User' using our blueprint"
- `mongoose.models.User ||` = "If factory already exists, use it (prevents errors)"
- `const User` = "Store the factory in a variable called User"

**What this creates:**
- A factory that can create, find, update, and delete users
- Connects to MongoDB collection called 'users' (automatically pluralized)

**Like:** Setting up a cookie factory that uses your cookie cutter blueprint

## 🔄 How Controllers Use This Model

### **Creating Users (Registration)**
```javascript
// In authController.js
const user = await User.create({ name, email, password });
```

**What happens:**
1. `User.create()` = "Factory, make a new user!"
2. `{ name, email, password }` = "Here's the data to use"
3. Pre-save hook runs = Password gets scrambled automatically
4. User saved to database = New document created

### **Finding Users (Login)**
```javascript
// In authController.js
const user = await User.findOne({ email });
```

**What happens:**
1. `User.findOne()` = "Factory, find me a user!"
2. `{ email }` = "Look for this specific email"
3. Returns user document or null if not found

### **Other Common Operations**
```javascript
User.findById(id)                    // Find by ID
User.updateOne({ id }, { name })     // Update user
User.deleteOne({ id })               // Delete user
User.find({})                        // Find all users
```

## 🗄️ MongoDB Collection Connection

### **How Model Connects to Database**

**Your Model Name:** `User`
**MongoDB Collection:** `users` (automatically pluralized and lowercase)

**Collection Structure:**
```javascript
// MongoDB collection: "users"
[
  {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@email.com", 
    password: "$2a$10$scrambled...",
    profileImage: "",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    _id: ObjectId("..."),
    name: "Jane Smith",
    email: "jane@email.com",
    password: "$2a$10$scrambled...",
    profileImage: "https://...",
    createdAt: "2024-01-16T14:20:00Z", 
    updatedAt: "2024-01-16T14:20:00Z"
  }
]
```

## 🎯 Data Types Explained

| Type | What It Stores | Example |
|------|----------------|---------|
| `String` | Text | "John Doe", "john@email.com" |
| `Number` | Numbers | 25, 3.14, -10 |
| `Boolean` | True/False | true, false |
| `Date` | Dates/Times | new Date(), "2024-01-15" |
| `Array` | Lists | ["red", "blue"], [1, 2, 3] |
| `Object` | Complex data | { city: "NYC", zip: 10001 } |

## ⚠️ Common Beginner Mistakes

### **1. Forgetting `unique: true` for Email**
```javascript
// ❌ Wrong - allows duplicate emails
email: {
  type: String,
  required: true
}

// ✅ Correct - prevents duplicate emails  
email: {
  type: String,
  required: true,
  unique: true
}
```

### **2. Wrong Data Types**
```javascript
// ❌ Wrong - age should be Number
age: {
  type: String  // Will store "25" as text
}

// ✅ Correct
age: {
  type: Number  // Will store 25 as number
}
```

### **3. Forgetting `required: true`**
```javascript
// ❌ Wrong - allows empty passwords
password: {
  type: String
}

// ✅ Correct - password is mandatory
password: {
  type: String,
  required: true
}
```

### **4. Model Naming Confusion**
```javascript
// ❌ Wrong - inconsistent naming
const userModel = mongoose.model('Users', userSchema);

// ✅ Correct - singular model name
const User = mongoose.model('User', userSchema);
```

## 🔄 Complete Request Flow Example

### **User Registration Flow:**
```
1. React Form:
   User fills: {name: "John", email: "john@email.com", password: "123"}

2. Frontend API Call:
   POST /api/auth/register with form data

3. Backend Route (authRoutes.js):
   router.post('/register', registerUser)

4. Controller (authController.js):
   const user = await User.create({ name, email, password });

5. User Model (user.js):
   - Validates data (name, email, password all present?)
   - Checks email is unique
   - Pre-save hook scrambles password
   - Saves to MongoDB 'users' collection

6. Database Response:
   Returns new user document with _id

7. Controller Response:
   Sends success message + user data to frontend

8. Frontend:
   Shows "Registration successful!" message
```

## 🏗️ Schema vs Model vs Document

### **Visual Comparison:**
```
Schema (Blueprint):
┌─────────────────┐
│ House Blueprint │
│ - 3 bedrooms    │
│ - 2 bathrooms   │  
│ - 1 kitchen     │
└─────────────────┘

Model (Factory):
┌─────────────────┐
│ House Factory   │
│ - Build houses  │
│ - Find houses   │
│ - Update houses │
└─────────────────┘

Document (Product):
┌─────────────────┐
│ Actual House    │
│ - 123 Main St   │
│ - Built 2024    │
│ - Owner: John   │
└─────────────────┘
```

### **In Code Terms:**
```javascript
// Schema = Blueprint
const userSchema = new mongoose.Schema({ name: String });

// Model = Factory  
const User = mongoose.model('User', userSchema);

// Document = Product
const john = new User({ name: "John" });
```

## 💡 Key Takeaways for Beginners

1. **Schema = Blueprint** - Defines structure and rules
2. **Model = Factory** - Creates and manages documents  
3. **Document = Individual record** - Actual data in database
4. **Always use `unique: true` for emails** - Prevents duplicates
5. **Pre-save hooks are powerful** - Automatic password hashing
6. **Models connect to collections** - User model → users collection
7. **Validation happens automatically** - Required fields, data types
8. **Use meaningful field names** - `email` not `e`, `password` not `pwd`

This User model is the foundation of your authentication system - it defines how user data is structured, validated, and stored in your Mental Health Tracker application!