const express = require('express');

const router = express.Router();
const controller = require('../controllers/flashcard.controller');
const validate = require('../validations/flashcard.validate');
const middleware = require('../middlewares/validate.middleware');
const { auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: FlashCard
 *   description: Quản lý thẻ flashcard
 */

/**
 * @swagger
 * /flashcard/{deckId}:
 *   get:
 *     summary: Lấy danh sách vocabulary theo deck của user
 *     tags: [FlashCard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deckId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của FlashcardDeck
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
 *                   example: Lấy vocabulary theo deck id thành công
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Lỗi validation
 *       401:
 *         description: Chưa đăng nhập
 */

router.get('/:deckId', auth, middleware(validate.getFlashcardByDeckId), controller.getFlashcardByDeckId);

module.exports = router;
