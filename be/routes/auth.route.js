const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controllers');
const validate = require('../validations/auth.validate');
const middleware = require('../middlewares/validate.middleware');

const { auth } = require('../middlewares/auth.middleware');
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Lỗi validation
 *       404:
 *         description: Email hoặc mật khẩu không đúng
 */
router.post('/login', middleware(validate.login), controller.login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Làm mới access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
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
 *                   example: Làm mới token thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Lỗi validation
 *       401:
 *         description: Refresh token không hợp lệ hoặc hết hạn
 */
router.post('/refresh-token', middleware(validate.refreshToken), controller.refreshToken);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
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
 *                   example: Lấy thông tin người dùng thành công
 *       401:
 *         description: Chưa đăng nhập hoặc token không hợp lệ
 */
router.get('/me', auth, controller.getCurrentUser);

module.exports = router;
