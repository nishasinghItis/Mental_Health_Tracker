// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthContextProvider } from './context/AuthContext.jsx';
 // ✅ Import ThemeContext

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
         {/* ✅ Wrap ThemeProvider inside AuthProvider */}
          <App />
        
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
