const express = require('express');
const router = express.Router();

const {
  getGrammarSidebar,
  getLessonDetail,
  updateProgress,
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getAllGrammarTopics,
} = require('../controllers/grammar.controller');

const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Grammar
 *   description: Quản lý ngữ pháp
 */

/**
 * @swagger
 * /grammar/sidebar:
 *   get:
 *     summary: Lấy danh sách topic + lesson (sidebar) kèm trạng thái học
 *     tags: [Grammar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy sidebar thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       lessons:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             title:
 *                               type: string
 *                             isCompleted:
 *                               type: boolean
 */

/**
 * @swagger
 * /grammar/lesson/{lessonId}:
 *   get:
 *     summary: Lấy chi tiết bài học ngữ pháp
 *     tags: [Grammar]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lesson
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     duration:
 *                       type: number
 *                     content:
 *                       type: string
 *                     examples:
 *                       type: array
 *                       items:
 *                         type: object
 */

/**
 * @swagger
 * /grammar/progress:
 *   post:
 *     summary: Cập nhật tiến độ học bài ngữ pháp
 *     tags: [Grammar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lessonId
 *               - progressPercent
 *             properties:
 *               lessonId:
 *                 type: string
 *               progressPercent:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Cập nhật tiến độ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 data:
 *                   type: object
 */

/**
 * @swagger
 * /grammar/lessons:
 *   get:
 *     summary: Lấy danh sách tất cả bài học ngữ pháp
 *     tags: [Grammar]
 *     responses:
 *       200:
 *         description: Lấy danh sách bài học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "69fcbd329e4e69212b3a7a5a"
 *                       title:
 *                         type: string
 *                         example: "Đại từ nhân xưng"
 *                       duration:
 *                         type: number
 *                         example: 10
 *                       content:
 *                         type: string
 *                         example: "<h2>Khái niệm...</h2>"
 *                       orderIndex:
 *                         type: number
 *                         example: 1
 *                       topicId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "69fcbd329e4e69212b3a7a58"
 *                           title:
 *                             type: string
 *                             example: "Ngữ pháp HSK 1"
 *                           level:
 *                             type: number
 *                             example: 1
 *                       createdAt:
 *                         type: string
 *                         example: "2026-05-07T16:26:26.509Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2026-05-07T16:26:26.509Z"
 */

// ================= ROUTES =================

router.get('/sidebar', auth, getGrammarSidebar);

router.get('/lesson/:lessonId', getLessonDetail);

router.post('/progress', auth, updateProgress);

router.get('/lessons', getAllLessons);

router.post('/lesson', auth, createLesson);

router.patch('/lesson/:id', auth, updateLesson);

router.delete('/lesson/:id', auth, deleteLesson);

router.get('/grammar-topics', auth, getAllGrammarTopics);

module.exports = router;
