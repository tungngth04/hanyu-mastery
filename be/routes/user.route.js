const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../middlewares/auth.middleware');
const controller = require('../controllers/user.controllers');
const validate = require('../validations/user.validate');
const middleware = require('../middlewares/validate.middleware');
const { uploadSingle } = require('../middlewares/uploadCloud.middlewares');
const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Thông tin người dùng
 */

/**
 * @swagger
 * /users/notification:
 *   patch:
 *     summary: Cập nhật trạng thái thông báo của người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notification
 *             properties:
 *               notification:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cập nhật notification thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật notification thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         fullName:
 *                           type: string
 *                         email:
 *                           type: string
 *                         notification:
 *                           type: boolean
 *       401:
 *         description: Không có quyền truy cập (chưa đăng nhập)
 */

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Cập nhật thông tin cá nhân + avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Tùng
 *               email:
 *                 type: string
 *                 example: tunga@gmail.com
 *               learningGoal:
 *                 type: string
 *                 example: HSK5 trong 6 tháng
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */

/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     summary: Đổi mật khẩu người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: Password123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đổi mật khẩu thành công
 *       400:
 *         description: Mật khẩu cũ không đúng hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

router.patch('/notification', auth, controller.updateNotification);
router.patch('/profile', auth, upload.single('avatar'), uploadSingle('avatars'), controller.updateProfile);
router.patch('/change-password', auth, middleware(validate.changePassword), controller.changePassword);

module.exports = router;
