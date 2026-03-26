const express = require('express');
const router = express.Router();
const controller = require('../controllers/videoComment.controller');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Video Comment
 *   description: Quản lý comment video
 */

/**
 * @swagger
 * /video-comment:
 *   post:
 *     summary: Tạo comment cho video
 *     tags: [Video Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - content
 *             properties:
 *               videoId:
 *                 type: string
 *                 example: "65f123abc456"
 *               content:
 *                 type: string
 *                 example: "Video rất hay!"
 *     responses:
 *       201:
 *         description: Tạo comment thành công
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, controller.createComment);

/**
 * @swagger
 * /video-comment/{videoId}:
 *   get:
 *     summary: Lấy danh sách comment theo video
 *     tags: [Video Comment]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của video
 *     responses:
 *       200:
 *         description: Lấy danh sách comment thành công
 */
router.get('/:videoId', controller.getCommentsByVideo);

module.exports = router;
