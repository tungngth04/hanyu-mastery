const express = require('express');
const router = express.Router();

const controller = require('../controllers/hskExam.controller');
const { auth, author } = require('../middlewares/auth.middleware');

router.get('/', controller.getAllExams);

router.get('/:id', controller.getExamDetail);

router.post('/', auth, author(['admin']), controller.createExam);

router.patch('/:id', auth, author(['admin']), controller.updateExam);

router.delete('/:id', auth, author(['admin']), controller.deleteExam);
module.exports = router;
