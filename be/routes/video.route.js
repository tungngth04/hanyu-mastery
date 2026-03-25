const express = require('express');
const router = express.Router();

const controller = require('../controllers/video.controller');
const { auth } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/uploadVideo.middlewares');

/**
 * @swagger
 * tags:
 *   name: Video
 *   description: Quản lý video (YouTube + S3)
 */

/**
 * @swagger
 * /videos/youtube:
 *   post:
 *     summary: Tạo video từ YouTube
 *     tags: [Video]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *                 example: "100 câu giao tiếp tiếng Trung"
 *               url:
 *                 type: string
 *                 example: "https://www.youtube.com/watch?v=DguQTBwIbk0"
 *               description:
 *                 type: string
 *                 example: "Bài học cơ bản HSK1"
 *               level:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tạo video thành công
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
 *                   example: Tạo video YouTube thành công
 *                 data:
 *                   type: object
 */

/**
 * @swagger
 * /videos/upload:
 *   post:
 *     summary: Upload video lên S3
 *     tags: [Video]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - video
 *               - title
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 example: "Bài giảng riêng"
 *               description:
 *                 type: string
 *               level:
 *                 type: number
 *                 example: 2
 *               thumbnail:
 *                 type: string
 *                 example: "https: ..."
 *     responses:
 *       201:
 *         description: Upload thành công
 */

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Lấy danh sách video (có phân trang + search + level)
 *     tags: [Video]
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *         description: Số lượng mỗi trang
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "HSK"
 *         description: Tìm kiếm theo title
 *       - in: query
 *         name: level
 *         schema:
 *           type: number
 *           example: 1
 *         description: Lọc theo level (HSK)
 *     responses:
 *       200:
 *         description: Lấy danh sách video thành công
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
 *                   example: Lấy danh sách video thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     videos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           type:
 *                             type: string
 *                             example: youtube
 *                           videoId:
 *                             type: string
 *                           videoUrl:
 *                             type: string
 *                           thumbnail:
 *                             type: string
 *                           level:
 *                             type: number
 *                     pageSize:
 *                       type: number
 *                     currentPage:
 *                       type: number
 *                     totalPage:
 *                       type: number
 *                     totalResults:
 *                       type: number
 */

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Lấy chi tiết video + progress + note
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID video
 *     responses:
 *       200:
 *         description: Lấy video thành công
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
 *                   example: Lấy video thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     video:
 *                       type: object
 *                     progress:
 *                       type: object
 *                     notes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           time:
 *                             type: number
 *                           content:
 *                             type: string
 */

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Xóa video
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID video
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.post('/youtube', auth, controller.createYoutubeVideo);
router.post('/upload', auth, upload.single('video'), controller.createS3Video);
router.get('/', auth, controller.getAllVideos);
router.get('/:id', auth, controller.getVideoDetail);
router.delete('/:id', auth, controller.deleteVideo);

module.exports = router;
