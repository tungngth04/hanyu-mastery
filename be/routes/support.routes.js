const express = require('express');
const router = express.Router();

const controller = require('../controllers/support.controller');
const validate = require('../validations/support.validate');
const middleware = require('../middlewares/validate.middleware');

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
router.post('/create-support', middleware(validate.createSupport), controller.createSupportRequest);

module.exports = router;
