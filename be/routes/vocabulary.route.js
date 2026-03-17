const express = require('express');

const router = express.Router();
const controller = require('../controllers/vocabulary.controller');
const validate = require('../validations/vocabulary.valtdate');
const middleware = require('../middlewares/validate.middleware');

/**
 * @swagger
 * /vocabulary:
 *   get:
 *     summary: Lấy danh sách tất cả Vocabulary
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *         description: Số lượng mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Trang hiện tại
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
router.get('/', middleware(validate.getAllVocabulary), controller.getAllvocabulary);

/**
 * @swagger
 * /vocabulary/{topicId}:
 *   get:
 *     summary: Lấy danh sách từ vựng theo topicId
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của topic (ObjectId)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *         description: Số lượng mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Trang hiện tại
 *     responses:
 *       200:
 *         description: Lấy danh sách từ vựng theo topic thành công
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
 *                   example: Lấy danh sách từ vựng theo topic thành công
 *       400:
 *         description: Lỗi validation (topicId không hợp lệ)
 *       404:
 *         description: Không tìm thấy từ vựng
 */
router.get('/:topicId', middleware(validate.getVocabularyByTopicId), controller.getVocabularyByTopicId);

module.exports = router;
