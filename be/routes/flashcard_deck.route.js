const express = require('express');

const router = express.Router();
const controller = require('../controllers/flashcard_deck.controller');
const validate = require('../validations/flashcard_deck.validate');
const middleware = require('../middlewares/validate.middleware');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /flashcard-deck:
 *   get:
 *     summary: Lấy danh sách tất cả FlashcardDeck
 *     tags: [FlashcardDeck]
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
router.get('/', auth, middleware(validate.getAllFlashcardDeck), controller.getAllFlashcardDeck);

module.exports = router;
