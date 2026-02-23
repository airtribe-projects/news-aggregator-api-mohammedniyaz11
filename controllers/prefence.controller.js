const Preference = require("../models/Prefernce");
exports.createPreference = async (req, res) => {
  try {
    const { categories, languages } = req.body;

    const existing = await Preference.findOne({ user: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Preferences already exist" });
    }

    const preference = await Preference.create({
      user: req.user.id,
      categories,
      languages
    });

    res.status(201).json({
      message: "Preferences created",
      preference
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /preferences
exports.getPreference = async (req, res) => {
  try {
    const preference = await Preference.findOne({ user: req.user.id });

    if (!preference) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    res.status(200).json(preference);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /preferences (Update)
exports.updatePreference = async (req, res) => {
  try {
    const { categories, languages } = req.body;

    const preference = await Preference.findOneAndUpdate(
      { user: req.user.id },
      { categories, languages },
      { new: true }
    );

    if (!preference) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    res.status(200).json({
      message: "Preferences updated",
      preference
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};