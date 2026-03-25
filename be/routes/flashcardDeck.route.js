const express = require('express');

const router = express.Router();
const controller = require('../controllers/flashcardDeck.controller');
const validate = require('../validations/flashcardDeck.validate');
const middleware = require('../middlewares/validate.middleware');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Flash Card Deck
 *   description: Quản lý nhóm flashcard
 */

/**
 * @swagger
 * /flashcard-deck:
 *   get:
 *     summary: Lấy danh sách tất cả Flash Card Deck
 *     tags: [Flash Card Deck]
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
 *     responses:
 *       200:
 *         description: Lấy dữ liệu thành công
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
 *                   example: Lấy dữ liệu thành công
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *       400:
 *         description: Lỗi validation
 */

/**
 * @swagger
 * /flashcard-deck/stats:
 *   get:
 *     summary: Lấy thống kê flashcard của user
 *     tags: [Flash Card Deck]
 *     responses:
 *       200:
 *         description: Lấy thống kê thành công
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
 *                   example: Lấy thống kê thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCards:
 *                       type: number
 *                       example: 178
 *                     totalCompleted:
 *                       type: number
 *                       example: 63
 *                     progress:
 *                       type: string
 *                       example: "35%"
 *                     streak:
 *                       type: string
 *                       example: "5 ngày liên tục"
 */

router.get('/', auth, middleware(validate.getAllFlashcardDeck), controller.getAllFlashcardDeck);
router.get('/stats', auth, controller.getFlashcardStats);

module.exports = router;
