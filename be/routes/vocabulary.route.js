const express = require('express');

const router = express.Router();
const controller = require('../controllers/vocabulary.controller');
const validate = require('../validations/vocabulary.valtdate');
const middleware = require('../middlewares/validate.middleware');
const { author, auth } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Vocabulary
 *   description: Quản lý vocabulary
 */

/**
 * @swagger
 * /vocabulary:
 *   get:
 *     summary: Lấy danh sách từ vựng (có thể lọc theo topicId)
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: query
 *         name: topicId
 *         schema:
 *           type: string
 *         description: ID của topic (lọc theo chủ đề)

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
 *                   type: object
 *                   properties:
 *                     vocabularies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           hanzi:
 *                             type: string
 *                           pinyin:
 *                             type: string
 *                           meaning:
 *                             type: string
 *                           level:
 *                             type: number

 *                     limit:
 *                       type: number
 *                       example: 10

 *                     currentPage:
 *                       type: number
 *                       example: 1

 *                     totalPage:
 *                       type: number
 *                       example: 5

 *                     totalResults:
 *                       type: number
 *                       example: 50

 *       400:
 *         description: Lỗi validation
 */

/**
 * @swagger
 * /vocabulary/daily:
 *   get:
 *     summary: Lấy danh sách từ vựng theo ngày (fixed 10 từ)
 *     description: Mỗi ngày sẽ trả về 10 từ vựng ngẫu nhiên nhưng cố định trong ngày đó.
 *     tags: [Vocabulary]
 *
 *     responses:
 *       200:
 *         description: Lấy danh sách từ vựng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *
 *                 message:
 *                   type: string
 *                   example: Lấy từ vựng hôm nay thành công
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       400:
 *         description: Lỗi request
 */

/**
 * @swagger
 * /vocabulary:
 *   post:
 *     summary: Thêm từ vựng (Admin)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hanzi
 *               - meaning
 *               - topicId
 *             properties:
 *               hanzi:
 *                 type: string
 *               pinyin:
 *                 type: string
 *               meaning:
 *                 type: string
 *               example:
 *                 type: string
 *               exampleMeaning:
 *                 type: string
 *               level:
 *                 type: number
 *               topicId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thêm thành công
 */

/**
 * @swagger
 * /vocabulary/{id}:
 *   patch:
 *     summary: Cập nhật từ vựng (Admin)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */

/**
 * @swagger
 * /vocabulary/{id}:
 *   delete:
 *     summary: Xoá từ vựng (Admin)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá thành công
 */

router.get('/', middleware(validate.getAllVocabulary), controller.getAllvocabulary);
router.get('/daily', controller.getDailyVocabulary);
router.post('/', auth, author(['admin']), middleware(validate.createVocabulary), controller.createVocabulary);
router.patch('/:id', auth, author(['admin']), middleware(validate.updateVocabulary), controller.updateVocabulary);
router.delete('/:id', auth, author(['admin']), middleware(validate.deleteVocabulary), controller.deleteVocabulary);
router.post('/add', auth, controller.addVocabularyToFlashcard);
module.exports = router;
