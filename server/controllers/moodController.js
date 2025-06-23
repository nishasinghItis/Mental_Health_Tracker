import MoodEntry from '../models/MoodEntry.js';

// 🟢 Create mood entry

export const createMoodEntry = async (req, res) => {
  try {
     
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
   
    const moods = await MoodEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch moods' });
  }
};

// 🗑️ Delete a mood entry
export const deleteMoodEntry = async (req, res) => {
  try {
    const mood = await MoodEntry.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    // Make sure the logged-in user owns the entry
    if (mood.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this entry' });
    }

    await MoodEntry.findByIdAndDelete(req.params.id); // ✅ Use this instead of mood.remove()
    res.status(200).json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ message: 'Failed to delete mood entry' });
  }
};

