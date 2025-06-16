// models/MoodEntry.js
import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'neutral', 'anxious', 'excited'],
  },
  note: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);
export default MoodEntry;
