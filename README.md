# 🧠 Mental Health Tracker

A comprehensive full-stack Mental Health Tracker built with the MERN stack that empowers users to monitor their mental well-being through mood tracking, AI insights, and professional support.

## 🚀 Features

- **User Authentication** - Secure JWT-based login/signup system
- **Daily Mood Tracking** - Log moods with intensity, triggers, activities, and symptoms
- **Data Visualization** - Interactive charts showing mood trends over time
- **AI-Powered Insights** - Get personalized mood analysis and recommendations
- **AI Chat Support** - 24/7 mental health chatbot assistance
- **Professional Consultation** - Connect with mental health professionals
- **Theme Customization** - Light/dark mode with personalized themes
- **Contact System** - Reach out for support via integrated contact forms

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Chart.js & React-ChartJS-2** - Data visualization
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI-powered features
- **Nodemailer** - Email service integration

## 📁 Project Structure

```
Mental_Health_Tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Custom middleware
│   ├── config/             # Database configuration
│   └── server.js           # Entry point
└── README.md
```

## 🔧 Key Implementation Details

### Authentication System
```javascript
// JWT Token Generation
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

// Password Hashing
const hashedPassword = await bcrypt.hash(password, 12);
```

### Mood Entry Schema
```javascript
const moodEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['happy', 'sad', 'angry', 'neutral', 'anxious', 'excited'] },
  intensity: { type: Number, default: 5 },
  activities: String,
  trigger: String,
  physicalSymptoms: String,
  createdAt: { type: Date, default: Date.now }
});
```

### Protected Routes
```javascript
// Route Protection with Context
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
}>
  <Route index element={<Welcome />} />
  <Route path="entry" element={<NewMoodEntry />} />
  <Route path="charts" element={<ProgressCharts />} />
  <Route path="chat" element={<AIChatSupport />} />
</Route>
```

### API Endpoints Structure
```javascript
// Server Routes Configuration
app.use('/api/auth', authRoutes);        // Authentication
app.use('/api/moods', moodRoutes);       // Mood tracking
app.use('/api/ai', aiRoutes);            // AI features
app.use('/api/consultation', consultationRoutes); // Professional support
app.use('/api/users', userRoutes);       // User management
app.use('/api/contact', contactRoutes);  // Contact system
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mental-health-tracker.git
cd mental-health-tracker
```

2. **Backend Setup**
```bash
cd server
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

3. **Frontend Setup**
```bash
cd ../client
npm install
```

4. **Run the Application**

Backend (Terminal 1):
```bash
cd server
npm run dev
```

Frontend (Terminal 2):
```bash
cd client
npm run dev
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/moods` | Get user's mood entries |
| POST | `/api/moods` | Create new mood entry |
| POST | `/api/ai/analyze` | Get AI mood analysis |
| POST | `/api/ai/chat` | AI chat support |
| POST | `/api/consultation/book` | Book consultation |
| POST | `/api/contact` | Send contact message |

## 🎨 Key Features Implementation

### Dashboard Layout
```javascript
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background dark:bg-darkBg">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Nested routes render here */}
        </main>
        <Footer />
      </div>
    </div>
  );
};
```

### Mood Tracking Flow
1. User logs daily mood with intensity (1-10)
2. Records triggers, activities, and symptoms
3. Data stored in MongoDB with user reference
4. Charts display mood trends over time
5. AI analyzes patterns and provides insights

### AI Integration
- **Mood Analysis**: Processes mood data to identify patterns
- **Chat Support**: Provides 24/7 mental health assistance
- **Personalized Insights**: Generates recommendations based on user data

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## 📱 Responsive Design

Built with Tailwind CSS for:
- Mobile-first responsive design
- Dark/light theme support
- Accessible UI components
- Consistent design system

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render/Railway)
```bash
# Set environment variables in hosting platform
# Deploy with start script: "node server.js"
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@mentalhealthtracker.com or join our Slack channel.

---

**Built with ❤️ for mental health awareness and support**