const express = require('express');

const router = express.Router();
const controller = require('../controllers/vocabularyTopic.controller');
const validate = require('../validations/vocabularyTopic.validate');
const middleware = require('../middlewares/validate.middleware');

/**
 * @swagger
 * tags:
 *   name: Vocabulary Topic
 *   description: Quản lý tiêu đề vocabulary
 */

/**
 * @swagger
 * /vocabulary-topic/get-all-topic:
 *   get:
 *     summary: Lấy danh sách tất cả topic
 *     tags: [Vocabulary Topic]
 *     responses:
 *       200:
 *         description: Lấy dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Lấy dữ liệu thành công
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *       400:
 *         description: Lỗi validation
 */
router.get('/get-all-topic', middleware(validate.getAllTopic), controller.getAllTopic);

module.exports = router;
