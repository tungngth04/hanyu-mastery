const express = require('express');

const router = express.Router();
const controller = require('../controllers/userDeckProgress.controller');
const validate = require('../validations/userDeckProgress.validate');
const middleware = require('../middlewares/validate.middleware');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: UserDeckProgress
 *   description: Quản lý tiến độ học flashcard của user
 */

/**
 * @swagger
 * /user-deck-progress/study:
 *   post:
 *     summary: Bắt đầu học deck (chỉ cập nhật 1 lần mỗi ngày)
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
 *         description: Bắt đầu học thành công
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
 *                   example: Bắt đầu học deck thành công
 *       400:
 *         description: Lỗi validation
 *       401:
 *         description: Chưa đăng nhập
 */

router.post('/study', auth, middleware(validate.studyDeck), controller.studyDeck);

module.exports = router;
