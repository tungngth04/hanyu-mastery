const express = require('express');
const router = express.Router();
const controller = require('../controllers/pinyin.controller');

/**
 * @swagger
 * tags:
 *   name: Pinyin
 *   description: API xử lý phát âm và ghép pinyin tiếng Trung
 */

/**
 * @swagger
 * /pinyin:
 *   get:
 *     summary: Lấy danh sách pinyin
 *     tags: [Pinyin]
 *     responses:
 *       200:
 *         description: Lấy danh sách pinyin thành công
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
 *                     type: string
 */

/**
 * @swagger
 * /pinyin/combine:
 *   post:
 *     summary: Ghép initial + final thành pinyin hoàn chỉnh
 *     tags: [Pinyin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - initial
 *               - final
 *             properties:
 *               initial:
 *                 type: string
 *                 example: n
 *               final:
 *                 type: string
 *                 example: i
 *     responses:
 *       200:
 *         description: Ghép pinyin thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: ni
 */

/**
 * @swagger
 * /pinyin/initial:
 *   post:
 *     summary: Phát âm phụ âm đầu (initial)
 *     tags: [Pinyin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - initial
 *             properties:
 *               initial:
 *                 type: string
 *                 example: b
 *     responses:
 *       200:
 *         description: Phát âm initial thành công
 */

/**
 * @swagger
 * /pinyin/final:
 *   post:
 *     summary: Phát âm nguyên âm cuối (final)
 *     tags: [Pinyin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - final
 *             properties:
 *               final:
 *                 type: string
 *                 example: a
 *     responses:
 *       200:
 *         description: Phát âm final thành công
 */

/**
 * @swagger
 * /pinyin/speak:
 *   post:
 *     summary: Phát âm pinyin hoàn chỉnh
 *     tags: [Pinyin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: ni hao
 *     responses:
 *       200:
 *         description: Phát âm thành công
 */

router.get('/', controller.getPinyin);

router.post('/combine', controller.combine);

router.post('/initial', controller.speakInitial);
router.post('/final', controller.speakFinal);
router.post('/speak', controller.speak);

module.exports = router;
