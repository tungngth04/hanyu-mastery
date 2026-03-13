const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controllers');
const validate = require('../validations/auth.validate');
const middleware = require('../middlewares/validate.middleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Đăng ký người dùng thành công
 *       409:
 *         description: Email đã tồn tại
 *       400:
 *         description: Lỗi validation
 */
router.post('/register', middleware(validate.register), controller.register);

module.exports = router;
