const express = require('express');
const router = express.Router();
const controller = require('../controllers/videoProgress.controller');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Video Progress
 *   description: Quản lý tiến độ video
 */

/**
 * @swagger
 * /video-progress:
 *   post:
 *     summary: Lưu tiến độ video
 *     tags: [Video Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - currentTime
 *             properties:
 *               videoId:
 *                 type: string
 *               currentTime:
 *                 type: number
 *                 example: 45
 *               duration:
 *                 type: number
 *                 example: 120
 *     responses:
 *       200:
 *         description: Lưu thành công
 */

/**
 * @swagger
 * /video-progress/{videoId}:
 *   get:
 *     summary: Lấy tiến độ video
 *     tags: [Video Progress]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thành công
 */

router.post('/', auth, controller.saveProgress);
router.get('/:videoId', auth, controller.getProgress);

module.exports = router;
