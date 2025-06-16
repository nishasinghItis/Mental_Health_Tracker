// controllers/moodController.js
import MoodEntry from '../models/MoodEntry.js';

export const createMood = async (req, res) => {
  const { mood, note } = req.body;
  try {
    const moodEntry = await MoodEntry.create({
      user: req.user.id,
      mood,
      note,
    });
    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save mood' });
  }
};

export const getUserMoods = async (req, res) => {
  try {
    const moods = await MoodEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch moods' });
  }
};
