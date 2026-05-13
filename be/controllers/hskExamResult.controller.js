/* eslint-disable no-useless-assignment */
const HSKExam = require('../models/hskExam.model');
const HSKExamResult = require('../models/hskExamResult.model');
const gradeWriting = require('../helpers/gradeWriting');

const submitExam = async (req, res) => {
  const { examId, answers, spentTime } = req.body;

  const exam = await HSKExam.findById(examId);

  if (!exam) {
    return res.status(404).json({
      message: 'Không tìm thấy đề',
    });
  }

  let listeningScore = 0;
  let readingScore = 0;
  let writingScore = 0;

  const resultAnswers = [];

  for (const section of exam.sections) {
    for (const question of section.questions) {
      const userAnswerObj = answers.find((a) => a.questionNumber === question.questionNumber);

      const userAnswer = userAnswerObj?.answer;

      let isCorrect = false;
      let score = 0;
      let aiFeedback = '';

      if (question.aiGrading) {
        const aiResult = await gradeWriting({
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer,
        });

        score = aiResult.score;
        aiFeedback = aiResult.feedback;

        isCorrect = score > 0;
      } else {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);

        score = isCorrect ? question.score : 0;
      }

      if (section.key === 'listening') {
        listeningScore += score;
      }

      if (section.key === 'reading') {
        readingScore += score;
      }

      if (section.key === 'writing') {
        writingScore += score;
      }

      resultAnswers.push({
        questionNumber: question.questionNumber,
        sectionKey: section.key,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        score,
        aiFeedback,
      });
    }
  }

  // scale về 300
  const rawTotal = listeningScore + readingScore + writingScore;

  const maxRaw = exam.sections.reduce((sum, sec) => sum + sec.questions.reduce((s, q) => s + q.score, 0), 0);

  const totalScore = Math.round((rawTotal / maxRaw) * 300);

  const result = await HSKExamResult.create({
    userId: req.user._id,
    examId,
    answers: resultAnswers,
    listeningScore,
    readingScore,
    writingScore,
    totalScore,
    percentage: Math.round((rawTotal / maxRaw) * 100),
    isPassed: totalScore >= 180,
    spentTime,
    status: 'graded',
  });

  res.json({
    message: 'Nộp bài thành công',
    data: result,
  });
};

module.exports = {
  submitExam,
};
