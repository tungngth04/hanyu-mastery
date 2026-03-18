const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    // auth
    fullName: String,
    email: String,
    password: String,
    // profile
    avatar: String,
    learningGoal: String,

    // learning
    studyStreak: {
      type: Number,
      default: 0,
    },

    lastStudyDate: Date, 
    // nhắc học
    notification: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: 'user',
    },

    status: {
      type: String,
      default: 'active',
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
