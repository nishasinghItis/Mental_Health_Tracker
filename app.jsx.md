# 📋 App.jsx Complete Documentation

## 🎯 Overview
The `App.jsx` file is the main routing component of the Mental Health Tracker application. It uses **React Router v6** to handle client-side navigation and implements authentication-based route protection.

---

## 📦 Dependencies & Imports

### React Router Components
```jsx
import { Routes, Route, Navigate } from "react-router-dom";
```

| Component | Purpose | Syntax |
|-----------|---------|--------|
| `Routes` | Container for all routes | `<Routes>...</Routes>` |
| `Route` | Individual route definition | `<Route path="/url" element={<Component />} />` |
| `Navigate` | Programmatic navigation/redirect | `<Navigate to="/path" replace />` |

### Page Components
```jsx
// Authentication Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import NewMoodEntry from "./pages/NewMoodEntry";
import ProgressCharts from "./pages/ProgressCharts";
import AIChatSupport from "./pages/AIChatSupport";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";

// Security Component
import ProtectedRoute from "./components/ProtectedRoute";
```

---

## 🛣️ Route Structure & Implementation

### 1. Root Route (Redirect)
```jsx
<Route path="/" element={<Navigate to="/login" replace />} />
```
- **Purpose**: Automatically redirects users from home page to login
- **Behavior**: When user visits `/`, they're sent to `/login`
- **`replace` prop**: Replaces current history entry (prevents back button issues)

### 2. Public Routes
```jsx
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
```
- **Access**: Available to all users (authenticated or not)
- **Components**: Login and Signup forms
- **URLs**: `/login` and `/signup`

### 3. Protected Routes with Nesting
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  {/* Nested routes go here */}
</Route>
```

#### Security Implementation
- **ProtectedRoute**: Wrapper component that checks authentication
- **Behavior**: Redirects to login if user not authenticated
- **Layout**: Dashboard component provides layout for all nested routes

#### Nested Route Types

**Index Route (Default)**
```jsx
<Route index element={<Welcome />} />
```
- **URL**: `/dashboard` (no additional path)
- **Purpose**: Default page when visiting dashboard
- **Component**: Welcome page with overview

**Named Nested Routes**
```jsx
<Route path="entry" element={<NewMoodEntry />} />
<Route path="charts" element={<ProgressCharts />} />
<Route path="chat" element={<AIChatSupport />} />
<Route path="consultation" element={<Consultation />} />
<Route path="profile" element={<Profile />} />
<Route path="contact" element={<ContactUs />} />
```

---

## 🗺️ Complete URL Mapping

| URL | Component | Description | Access |
|-----|-----------|-------------|--------|
| `/` | Navigate → `/login` | Root redirect | Public |
| `/login` | Login | User authentication | Public |
| `/signup` | Signup | User registration | Public |
| `/dashboard` | Welcome | Dashboard home | Protected |
| `/dashboard/entry` | NewMoodEntry | Log mood entries | Protected |
| `/dashboard/charts` | ProgressCharts | View mood analytics | Protected |
| `/dashboard/chat` | AIChatSupport | AI mental health chat | Protected |
| `/dashboard/consultation` | Consultation | Professional consultation | Protected |
| `/dashboard/profile` | Profile | User profile settings | Protected |
| `/dashboard/contact` | ContactUs | Contact form | Protected |

---

## 🔒 Authentication Flow

### Route Protection Pattern
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**How it works:**
1. User tries to access `/dashboard/*`
2. ProtectedRoute checks authentication status
3. If authenticated → renders Dashboard + nested route
4. If not authenticated → redirects to `/login`

### User Journey
```
Unauthenticated User:
/ → /login → (after login) → /dashboard

Authenticated User:
/ → /login → /dashboard (if already logged in)
```

---

## 🏗️ Component Architecture

### Nested Route Rendering
```jsx
// Parent Route
<Route path="/dashboard" element={<Dashboard />}>
  // Child routes render INSIDE Dashboard component
  <Route path="entry" element={<NewMoodEntry />} />
</Route>
```

**Dashboard Component Structure:**
```jsx
function Dashboard() {
  return (
    <div>
      <Sidebar /> {/* Always visible */}
      <Header />  {/* Always visible */}
      <Outlet />  {/* Child routes render here */}
    </div>
  );
}
```

---

## 🎨 React Router v6 Features Used

### 1. Declarative Routing
```jsx
<Routes>
  <Route path="/path" element={<Component />} />
</Routes>
```

### 2. Nested Routes
```jsx
<Route path="/parent" element={<Parent />}>
  <Route path="child" element={<Child />} />
</Route>
```

### 3. Index Routes
```jsx
<Route index element={<DefaultChild />} />
```

### 4. Programmatic Navigation
```jsx
<Navigate to="/path" replace />
```

---

## 🚀 Key Benefits

1. **Single Page Application**: No page refreshes, smooth navigation
2. **Authentication Protection**: Secure routes for logged-in users
3. **Nested Layouts**: Consistent dashboard layout across pages
4. **Clean URLs**: Semantic, user-friendly route structure
5. **Automatic Redirects**: Seamless user experience

---

## 🔧 Usage Examples

### Adding New Route
```jsx
// 1. Import component
import NewPage from './pages/NewPage';

// 2. Add route
<Route path="newpage" element={<NewPage />} />

// 3. Access at: /dashboard/newpage
```

### Making Route Public
```jsx
// Move outside ProtectedRoute wrapper
<Route path="/public-page" element={<PublicPage />} />
```

### Adding Route Parameters
```jsx
<Route path="user/:id" element={<UserProfile />} />
// Access at: /dashboard/user/123
```

---

## 📱 Navigation in Components

### Using useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/dashboard/charts');
  };
}
```

### Using Link Component
```jsx
import { Link } from 'react-router-dom';

<Link to="/dashboard/entry">Add Mood Entry</Link>
```

---

This routing setup provides a robust foundation for the Mental Health Tracker application with proper authentication, nested layouts, and intuitive navigation structure.