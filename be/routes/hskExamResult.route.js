const express = require('express');
const router = express.Router();

const controller = require('../controllers/hskExamResult.controller');
const { auth } = require('../middlewares/auth.middleware');

router.post('/submit', auth, controller.submitExam);

module.exports = router;
