import User from '../models/User.js';

// @desc Update profile picture
// @route PUT /api/users/profile-image
// @access Private
export const updateProfileImage = async (req, res) => {
  try {
    const { userId, profileImage } = req.body;

    if (!userId || !profileImage) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileImage = profileImage;
    await user.save();

    res.status(200).json({ message: 'Profile image updated successfully', profileImage: user.profileImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
