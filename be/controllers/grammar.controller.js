const mongoose = require('mongoose');
const GrammarTopic = require('../models/grammarTopic.model');
const GrammarLesson = require('../models/grammarLesson.model');
const UserGrammarProgress = require('../models/userGrammarProgress.model');
const catchAsync = require('../utils/catchAsync');
const { status: httpStatus } = require('http-status');
const ApiError = require('../utils/ApiError');

const getGrammarSidebar = async (req, res) => {
  const userId = req.user._id;

  // 1. Lấy topics + lessons
  const topics = await GrammarTopic.aggregate([
    {
      $lookup: {
        from: 'grammarlessons',
        localField: '_id',
        foreignField: 'topicId',
        as: 'lessons',
      },
    },
    {
      $project: {
        title: 1,
        lessons: 1,
      },
    },
  ]);

  // 2. Lấy progress của user
  const progressList = await UserGrammarProgress.find({ userId }).lean();

  // 3. Map status
  const result = topics.map((topic) => {
    const lessonsSorted = topic.lessons.sort((a, b) => a.orderIndex - b.orderIndex);

    const firstPendingIndex = lessonsSorted.findIndex((lesson) => {
      const progress = progressList.find((p) => p.lessonId.toString() === lesson._id.toString());
      return !progress?.isCompleted;
    });

    let completed = 0;

    const lessonsWithStatus = lessonsSorted.map((lesson, index) => {
      const progress = progressList.find((p) => p.lessonId.toString() === lesson._id.toString());

      const isDone = progress?.isCompleted;

      if (isDone) completed++; // 🔥 đếm completed

      let status = 'locked';

      if (isDone) {
        status = 'done';
      } else if (index === firstPendingIndex) {
        status = 'pending';
      }

      return {
        _id: lesson._id,
        title: lesson.title,
        status,
        isCompleted: !!isDone,
      };
    });

    return {
      _id: topic._id,
      title: topic.title,
      lessons: lessonsWithStatus,
      completed,
      total: lessonsWithStatus.length,
    };
  });
  let totalLessons = 0;
  let completedLessons = 0;

  topics.forEach((topic) => {
    topic.lessons.forEach((lesson) => {
      totalLessons++;

      const progress = progressList.find((p) => p.lessonId.toString() === lesson._id.toString());

      if (progress?.isCompleted) {
        completedLessons++;
      }
    });
  });

  res.json({
    code: 200,
    data: result,
    stats: {
      totalLessons,
      completedLessons,
      percent: totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100),
    },
  });
};
const getLessonDetail = async (req, res) => {
  const { lessonId } = req.params;

  const lesson = await GrammarLesson.findById(lessonId).populate('topicId', 'title level');

  res.json({
    code: 200,
    data: {
      id: lesson._id,
      title: lesson.title,
      duration: lesson.duration,
      content: lesson.content,
      orderIndex: lesson.orderIndex,
      topic: {
        id: lesson.topicId._id,
        title: lesson.topicId.title,
        level: lesson.topicId.level,
      },
    },
  });
};

const updateProgress = async (req, res) => {
  const userId = req.user._id;
  const { lessonId, progressPercent } = req.body;

  const progress = await UserGrammarProgress.findOneAndUpdate(
    { userId, lessonId },
    {
      progressPercent,
      isCompleted: progressPercent === 100,
      completedAt: progressPercent === 100 ? new Date() : null,
    },
    { upsert: true, new: true },
  );

  res.json({
    code: 200,
    data: progress,
  });
};

const createLesson = catchAsync(async (req, res) => {
  const { topicId, title, duration, content, orderIndex } = req.body;

  const lesson = await GrammarLesson.create({
    topicId,
    title,
    duration,
    content,
    orderIndex,
  });

  res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: 'Tạo bài học thành công',
    data: lesson,
  });
});

const getAllLessons = catchAsync(async (req, res) => {
  let { page = 1, pageSize = 10, search = '' } = req.query;

  page = Number(page);
  pageSize = Number(pageSize);

  const skip = (page - 1) * pageSize;

  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const total = await GrammarLesson.countDocuments(filter);

  const lessons = await GrammarLesson.find(filter)
    .populate('topicId', 'title level')
    .sort({ orderIndex: 1 })
    .skip(skip)
    .limit(pageSize);

  res.json({
    code: 200,
    data: lessons,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const { id } = req.params;

  const lesson = await GrammarLesson.findById(id);

  if (!lesson) {
    throw new ApiError(404, 'Không tìm thấy bài học');
  }

  const { title, duration, content, orderIndex } = req.body;

  if (title !== undefined) lesson.title = title;
  if (duration !== undefined) lesson.duration = duration;
  if (content !== undefined) lesson.content = content;
  if (orderIndex !== undefined) lesson.orderIndex = orderIndex;

  await lesson.save();

  res.json({
    code: 200,
    message: 'Cập nhật bài học thành công',
    data: lesson,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { id } = req.params;

  const lesson = await GrammarLesson.findById(id);

  if (!lesson) {
    throw new ApiError(404, 'Không tìm thấy bài học');
  }

  await lesson.deleteOne();

  res.json({
    code: 200,
    message: 'Xóa bài học thành công',
  });
});

const getAllGrammarTopics = catchAsync(async (req, res) => {
  let { page = 1, pageSize = 10 } = req.query;

  page = Number(page);
  pageSize = Number(pageSize);

  const skip = (page - 1) * pageSize;

  const total = await GrammarTopic.countDocuments();

  const topics = await GrammarTopic.find()
    .sort({ orderIndex: 1 }) // 🔥 sắp xếp theo thứ tự hiển thị
    .skip(skip)
    .limit(pageSize);

  res.json({
    code: 200,
    data: topics,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

module.exports = {
  getLessonDetail,
  updateProgress,
  getGrammarSidebar,
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
  getAllGrammarTopics,
};
