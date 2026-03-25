const express = require('express');
const router = express.Router();
const controller = require('../controllers/videoNote.controller');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Video Note
 *   description: Ghi chú video theo timestamp
 */

/**
 * @swagger
 * /video-note:
 *   post:
 *     summary: Tạo note
 *     tags: [Video Note]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *               - time
 *               - content
 *             properties:
 *               videoId:
 *                 type: string
 *               time:
 *                 type: number
 *                 example: 12
 *               content:
 *                 type: string
 *                 example: "đoạn này quan trọng"
 *     responses:
 *       201:
 *         description: Tạo thành công
 */

/**
 * @swagger
 * /video-note/{videoId}:
 *   get:
 *     summary: Lấy danh sách note theo video
 *     tags: [Video Note]
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

/**
 * @swagger
 * /video-note/{id}:
 *   delete:
 *     summary: Xóa note
 *     tags: [Video Note]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */

router.post('/', auth, controller.createNote);
router.get('/:videoId', auth, controller.getNotes);
router.delete('/:id', auth, controller.deleteNote);

module.exports = router;
