const express = require('express');

const router = express.Router();
const controller = require('../controllers/userDeckProgress.controller');
const validate = require('../validations/userDeckProgress.validate');
const middleware = require('../middlewares/validate.middleware');

/**
 * @swagger
 * tags:
 *   name: UserDeckProgress
 *   description: Quản lý tiến độ của user
 */

/**
 * @swagger
 * /user-deck-progress/study:
 *   post:
 *     summary: Người dùng bắt đầu học deck (cập nhật lastStudied)
 *     tags: [UserDeckProgress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deckId
 *             properties:
 *               deckId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Cập nhật thời gian học thành công
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
 *                   example: Cập nhật thời gian học thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     deckId:
 *                       type: string
 *                     lastStudied:
 *                       type: string
 *                       example: 2026-03-17T07:00:00.000Z
 *                     completed:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Lỗi validation
 *       401:
 *         description: Chưa đăng nhập
 */
router.post('/study', middleware(validate.studyDeck), controller.studyDeck);

module.exports = router;
