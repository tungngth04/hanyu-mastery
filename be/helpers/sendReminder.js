const User = require('../models/user.model');
const mailer = require('../utils/mailer');
// jobs/sendReminder.js
const sendReminder = async () => {
  const users = await User.find({ notification: true });
  users.forEach((u) => {
    const subject = 'Nhắc học';
    const html = `
        <p>Xin chào <b>${u.fullName || u.email}</b>,</p>
        <p>Mỗi ngày một chút, hôm nay hãy tiếp tục chinh phục Hanyu Master nào! 🌟</p>
        <p>Chúc bạn một ngày học tập đầy hứng khởi!</p>`;
    mailer.sendMail(u.email, subject, html);
  });
};

module.exports = sendReminder;
