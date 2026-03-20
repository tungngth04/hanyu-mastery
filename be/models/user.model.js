const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const avatars = [
  'https://i.pravatar.cc/100?u=1',
  'https://i.pravatar.cc/100?u=2',
  'https://i.pravatar.cc/100?u=3',
  'https://i.pravatar.cc/100?u=4',
];

const userSchema = new mongoose.Schema(
  {
    // auth
    fullName: String,
    email: String,
    password: String,
    // profile
    avatar: {
      type: String,
      default: () => {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex];
      },
    },
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
