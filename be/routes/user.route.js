const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth, author } = require('../middlewares/auth.middleware');
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

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           fullName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           birthday:
 *                             type: string
 *                             format: date-time
 *                           role:
 *                             type: string
 *                           status:
 *                             type: string
 *                             example: active
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền (không phải admin)
 */

/**
 * @swagger
 * /users/detail/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết người dùng (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Lấy chi tiết người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *                         phone:
 *                           type: string
 *                         birthday:
 *                           type: string
 *                           format: date-time
 *                         avatar:
 *                           type: string
 *                         role:
 *                           type: string
 *                         status:
 *                           type: string
 *       404:
 *         description: Không tìm thấy người dùng
 */

/**
 * @swagger
 * /users/toggle-status/{id}:
 *   patch:
 *     summary: Khoá hoặc mở khoá tài khoản người dùng (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Khoá tài khoản thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         status:
 *                           type: string
 *                           example: locked
 *       400:
 *         description: Không thể tự khoá tài khoản
 *       404:
 *         description: Không tìm thấy người dùng
 */

router.patch('/notification', auth, controller.updateNotification);
router.patch('/profile', auth, upload.single('avatar'), uploadSingle('avatars'), controller.updateProfile);
router.patch('/change-password', auth, middleware(validate.changePassword), controller.changePassword);
router.get('/all', auth, author(['admin']), controller.getAllUsers);
router.get('/detail/:id', auth, author(['admin']), controller.getUserDetail);
router.patch('/toggle-status/:id', auth, author(['admin']), controller.toggleUserStatus);

module.exports = router;
