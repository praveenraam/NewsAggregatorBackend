const User = require('../models/user');

// interest Update topics
exports.updateInterests = async (req, res) => {
  const { interests } = req.body;

  if (!Array.isArray(interests)) {
    return res.status(400).json({ message: 'Interests must be an array.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { interests },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Interests updated', interests: user.interests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update interests', error: err.message });
  }
};

// Get interests topics
exports.getInterests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('interests');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ interests: user.interests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch interests', error: err.message });
  }
};

// User details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user details', error: err.message });
  }
};