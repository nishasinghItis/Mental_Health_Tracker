import MoodEntry from '../models/MoodEntry.js';

// 🟢 Create mood entry

export const createMoodEntry = async (req, res) => {
  try {
     console.log('Received body:', req.body);
    const {
      mood,
      note,
      date,
      intensity,
      activities,
      duration,
      physicalSymptoms,
      trigger,
      coping,
      intention
    } = req.body;
console.log('User ID from token:', req.user._id);

    const newEntry = new MoodEntry({
      user: req.user._id,
      mood,
      note,
      date,
      date,
      intensity,
      activities,
      duration,
      physicalSymptoms,
      trigger,
      coping,
      intention,
     
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ message: 'Failed to save mood entry' });
  }
};

// 🟢 Get all moods for the logged-in user
export const getAllMoods = async (req, res) => {
  try {
   console.log('Fetching moods for user:', req.user._id);
    const moods = await MoodEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch moods' });
  }
};
