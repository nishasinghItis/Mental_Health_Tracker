import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'neutral', 'anxious', 'excited'],
  },
  intensity: {
    type: Number,
    default: 5,
  },
  activities: {
    type: String,
  },
  note: {
    type: String,
  },
  duration: {
    type: String,
  },
  physicalSymptoms: {
    type: String,
  },
  trigger: {
    type: String,
  },
  coping: {
    type: String,
  },
  intention: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Prevent OverwriteModelError
const MoodEntry = mongoose.models.MoodEntry || mongoose.model('MoodEntry', moodEntrySchema);
export default MoodEntry;
