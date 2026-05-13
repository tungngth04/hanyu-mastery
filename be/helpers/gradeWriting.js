const model = require('../config/gemini');

const gradeWriting = async ({ question, correctAnswer, userAnswer }) => {
  const prompt = `
Bạn là giám khảo HSK.

Câu hỏi:
${question}

Đáp án chuẩn:
${correctAnswer}

Thí sinh trả lời:
${userAnswer}

Hãy chấm theo thang 0-1.

Trả JSON:
{
  "score": 1,
  "feedback": ""
}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      score: 0,
      feedback: 'AI grading failed',
    };
  }
};

module.exports = gradeWriting;
