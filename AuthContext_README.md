# 🔐 AuthContext.jsx Documentation

## Overview
The `AuthContext.jsx` file implements React Context API for global authentication state management across the Mental Health Tracker application. It provides user authentication state and functions to all components without prop drilling.

## 🎯 Purpose
- **Global State Management**: Manages user authentication state across the entire app
- **Persistent Login**: Maintains user session using localStorage
- **Component Communication**: Allows any component to access/modify auth state
- **Authentication Flow**: Handles login/logout functionality seamlessly

## 📋 Code Structure

### 1. Context Creation
```javascript
export const AuthContext = createContext();
```
- Creates a React Context object
- Acts as a container for authentication data
- Allows components to subscribe to context changes

### 2. Provider Component
```javascript
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
```
- **Wraps the entire app** to provide auth state
- **Initial State**: Retrieves user from localStorage or sets to null
- **Children Prop**: Renders all child components with access to context

### 3. Persistent Storage Effect
```javascript
useEffect(() => {
  localStorage.setItem('user', JSON.stringify(user));
}, [user]);
```
- **Auto-Save**: Automatically saves user state to localStorage
- **Dependency Array**: Runs whenever `user` state changes
- **Data Persistence**: Maintains login state across browser sessions

### 4. Context Provider Value
```javascript
return (
  <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
);
```
- **Provides**: `user` (current user object) and `setUser` (state updater)
- **Wraps**: All child components get access to these values
- **Global Access**: Any component can read/modify auth state

### 5. Custom Hook
```javascript
export const useAuthContext = () => useContext(AuthContext);
```
- **Convenience Hook**: Simplifies context consumption
- **Error Prevention**: Ensures context is used within provider
- **Clean API**: Components use `useAuthContext()` instead of `useContext(AuthContext)`

## 🔄 Authentication Flow

### Login Process
```javascript
// In Login component
const { setUser } = useAuthContext();

const handleLogin = async (userData) => {
  // API call to login
  const response = await loginAPI(userData);
  
  // Update global state
  setUser(response.user);
  
  // User is now logged in globally
};
```

### Logout Process
```javascript
// In Dashboard component
const { setUser } = useAuthContext();

const handleLogout = () => {
  localStorage.removeItem('user');
  setUser(null);
  navigate('/login');
};
```

### Protected Route Check
```javascript
// In ProtectedRoute component
const { user } = useAuthContext();

return user ? <Outlet /> : <Navigate to="/login" />;
```

## 🏗️ Implementation in App Structure

### 1. App.jsx Wrapper
```javascript
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* All routes have access to auth context */}
      </Routes>
    </AuthContextProvider>
  );
}
```

### 2. Component Usage
```javascript
// Any component can access auth state
import { useAuthContext } from '../context/AuthContext';

const SomeComponent = () => {
  const { user, setUser } = useAuthContext();
  
  return (
    <div>
      {user ? `Welcome ${user.name}` : 'Please login'}
    </div>
  );
};
```

## 💾 Data Structure

### User Object Format
```javascript
{
  id: "user_mongodb_id",
  name: "John Doe",
  email: "john@example.com",
  token: "jwt_token_string"
}
```

### LocalStorage Key
- **Key**: `'user'`
- **Value**: JSON stringified user object
- **Persistence**: Survives browser refresh/restart

## 🔒 Security Considerations

### Token Management
```javascript
// Token is stored in user object
const { user } = useAuthContext();
const token = user?.token;

// Used in API calls
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### Automatic Cleanup
- **Logout**: Removes user from both state and localStorage
- **Token Expiry**: Frontend should handle expired tokens
- **Session Management**: Context resets on app restart if no valid user

## 🎯 Benefits

1. **No Prop Drilling**: Direct access to auth state from any component
2. **Persistent Sessions**: User stays logged in across browser sessions
3. **Centralized Logic**: All auth logic in one place
4. **Real-time Updates**: State changes reflect immediately across app
5. **Clean API**: Simple `useAuthContext()` hook for components

## 🔧 Usage Examples

### Check Authentication Status
```javascript
const { user } = useAuthContext();
const isAuthenticated = !!user;
```

### Get User Information
```javascript
const { user } = useAuthContext();
const userName = user?.name;
const userEmail = user?.email;
```

### Update User Profile
```javascript
const { user, setUser } = useAuthContext();

const updateProfile = (newData) => {
  setUser({ ...user, ...newData });
};
```

## 🚀 Integration Points

- **Login/Signup Pages**: Set user state after successful authentication
- **Dashboard**: Access user info for personalization
- **ProtectedRoute**: Check authentication status
- **Navbar**: Display user name and logout functionality
- **API Calls**: Include JWT token from user object

This AuthContext implementation provides a robust, persistent, and easy-to-use authentication system for the Mental Health Tracker application.