const express = require('express');
const router = express.Router();

const controller = require('../controllers/hskExam.controller');

router.post('/', controller.createExam);

router.get('/', controller.getAllExams);

router.get('/:id', controller.getExamDetail);

module.exports = router;
