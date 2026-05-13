require('dotenv').config();
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const s3 = require('../config/s3');

const uploadToS3 = async (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `audio/${fileName}`,
    Body: fileContent,
    ContentType: 'audio/mpeg',
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/audio/${encodeURIComponent(
    fileName,
  )}`;
};

module.exports = uploadToS3;
