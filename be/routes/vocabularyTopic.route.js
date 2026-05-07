const express = require('express');

const router = express.Router();
const controller = require('../controllers/vocabularyTopic.controller');
const validate = require('../validations/vocabularyTopic.validate');
const middleware = require('../middlewares/validate.middleware');
const { author, auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Vocabulary Topic
 *   description: Quản lý chủ đề từ vựng
 */

/**
 * @swagger
 * /vocabulary-topic/get-all-topic:
 *   get:
 *     summary: Lấy danh sách tất cả topic (có phân trang)
 *     tags: [Vocabulary Topic]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *         description: Số lượng mỗi trang
 *     responses:
 *       200:
 *         description: Lấy dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách chủ đề thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     topics:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                     total:
 *                       type: number
 *                       example: 100
 *                     page:
 *                       type: number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       example: 10
 */

/**
 * @swagger
 * /vocabulary-topic/create-topic:
 *   post:
 *     summary: Thêm chủ đề mới (Admin)
 *     tags: [Vocabulary Topic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Giao tiếp cơ bản
 *               description:
 *                 type: string
 *                 example: Chủ đề dành cho người mới bắt đầu
 *     responses:
 *       201:
 *         description: Thêm thành công
 *       400:
 *         description: Chủ đề đã tồn tại hoặc lỗi validation
 */

/**
 * @swagger
 * /vocabulary-topic/update-topic/{id}:
 *   patch:
 *     summary: Cập nhật chủ đề (Admin)
 *     tags: [Vocabulary Topic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của topic
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Giao tiếp nâng cao
 *               description:
 *                 type: string
 *                 example: Chủ đề nâng cao hơn
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy topic
 */

/**
 * @swagger
 * /vocabulary-topic/delete-topic/{id}:
 *   delete:
 *     summary: Xóa chủ đề (Admin)
 *     tags: [Vocabulary Topic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của topic
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy topic
 */

/**
 * @swagger
 * /vocabulary-topic/{id}:
 *   get:
 *     summary: Lấy chi tiết chủ đề theo ID
 *     tags: [Vocabulary Topic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của topic
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *       404:
 *         description: Không tìm thấy topic
 */

router.get('/get-all-topic', middleware(validate.getAllTopic), controller.getAllTopic);
router.post('/create-topic', auth, author(['admin']), middleware(validate.createTopic), controller.createTopic);
router.patch('/update-topic/:id', auth, author(['admin']), middleware(validate.updateTopic), controller.updateTopic);
router.delete('/delete-topic/:id', auth, author(['admin']), controller.deleteTopic);
router.get('/:id', controller.getTopicById);

module.exports = router;
