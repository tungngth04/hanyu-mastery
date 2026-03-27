const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middlewares/auth.middleware');
const controller = require('../controllers/pronunciation.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * @swagger
 * tags:
 *   name: Pronunciation
 *   description: Chấm điểm phát âm bằng AI (Azure Speech)
 */

/**
 * @swagger
 * /pronunciation:
 *   post:
 *     summary: Upload audio để chấm phát âm
 *     tags: [Pronunciation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - audio
 *               - text
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: File audio (webm, wav, mp3...)
 *               text:
 *                 type: string
 *                 example: "漂亮"
 *                 description: Câu hoặc từ cần chấm phát âm
 *     responses:
 *       200:
 *         description: Chấm phát âm thành công
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
 *                   example: Chấm phát âm thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     accuracy:
 *                       type: number
 *                       example: 90
 *                     fluency:
 *                       type: number
 *                       example: 85
 *                     completeness:
 *                       type: number
 *                       example: 95
 *                     prosody:
 *                       type: number
 *                       example: 80
 *                     pronunciation:
 *                       type: number
 *                       example: 88
 *                     recognizedText:
 *                       type: string
 *                       example: "漂亮"
 *       400:
 *         description: Không nhận diện được giọng nói
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post('/', auth, upload.single('audio'), controller.assessPronunciation);

module.exports = router;
