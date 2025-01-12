const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User"); // Assuming you have a User model

const updateUserPassword = async (userId, newPassword) => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb+srv://daveclydesdale:RpmHFPJmf17LZ6oM@dev-cluster.ca3eabn.mongodb.net/?retryWrites=true&w=majority&appName=dev-cluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Find the user and update the password
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return;
    }

    user.password = hashedPassword;
    await user.save();

    console.log("Password updated successfully");
  } catch (err) {
    console.error("Error updating password:", err.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Example usage
updateUserPassword("66aa7ec4bde82ac40547e782", "testing");
