const express = require('express');
const router = express.Router();

const controller = require('../controllers/videoSave.controller');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Video Save
 *   description: Quản lý video đã lưu
 */

/**
 * @swagger
 * /video-save:
 *   get:
 *     summary: Lấy danh sách video đã lưu
 *     tags: [Video Save]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: level
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Lấy danh sách video đã lưu thành công
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               message: Lấy danh sách video đã lưu thành công
 *               data:
 *                 videos: []
 *                 pageSize: 10
 *                 currentPage: 1
 *                 totalPage: 1
 *                 totalResults: 0
 */

/**
 * @swagger
 * /video-save/save:
 *   post:
 *     summary: Lưu hoặc bỏ lưu video
 *     tags: [Video Save]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - videoId
 *             properties:
 *               videoId:
 *                 type: string
 *                 example: 69c21156da26c143e1d5abf4
 *     responses:
 *       201:
 *         description: Lưu video thành công
 *         content:
 *           application/json:
 *             example:
 *               code: 201
 *               message: Lưu video thành công
 *               data:
 *                 saved: true
 *       200:
 *         description: Bỏ lưu video thành công
 *         content:
 *           application/json:
 *             example:
 *               code: 200
 *               message: Bỏ lưu video thành công
 *               data:
 *                 saved: false
 */

router.get('/', auth, controller.getAllSaveVideos);
router.post('/save', auth, controller.saveVideo);

module.exports = router;
