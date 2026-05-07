const express = require('express');
const router = express.Router();

const controller = require('../controllers/support.controller');
const validate = require('../validations/support.validate');
const middleware = require('../middlewares/validate.middleware');
const { author, auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Support
 *   description: Quản lý support
 */

/**
 * @swagger
 * /supports/create-support:
 *   post:
 *     summary: Gửi yêu cầu hỗ trợ
 *     tags: [Support]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               subject:
 *                 type: string
 *                 example: Lỗi thanh toán gói Premium
 *               message:
 *                 type: string
 *                 example: Tôi không thể thanh toán gói Premium bằng thẻ Visa...
 *     responses:
 *       201:
 *         description: Gửi yêu cầu hỗ trợ thành công
 */

/**
 * @swagger
 * /supports/all:
 *   get:
 *     summary: Lấy danh sách yêu cầu hỗ trợ (Admin)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang hiện tại
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng bản ghi mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách yêu cầu hỗ trợ thành công
 */

/**
 * @swagger
 * /supports/detail/{id}:
 *   get:
 *     summary: Lấy chi tiết yêu cầu hỗ trợ (Admin)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy
 */

/**
 * @swagger
 * /supports/update-status/{id}:
 *   patch:
 *     summary: Cập nhật trạng thái yêu cầu hỗ trợ (Admin)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, resolved]
 *                 example: resolved
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */

router.post('/create-support', middleware(validate.createSupport), controller.createSupportRequest);
router.get('/all', auth, author(['admin']), controller.getAllSupportRequests);
router.get('/detail/:id', auth, author(['admin']), controller.getSupportDetail);
router.patch('/update-status/:id', auth, author(['admin']), controller.updateSupportStatus);
module.exports = router;
