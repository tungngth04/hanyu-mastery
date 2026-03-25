const express = require('express');

const router = express.Router();
const controller = require('../controllers/vocabulary.controller');
const validate = require('../validations/vocabulary.valtdate');
const middleware = require('../middlewares/validate.middleware');

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

router.get('/', middleware(validate.getAllVocabulary), controller.getAllvocabulary);

module.exports = router;
