var path = require('path');
var site = require('./site');

module.exports = {
  default: process.env.FORIM_UPLOADER_DEFAULT || 'disk',  //  可选值：disk, oss, s3, cloudinary
  limits: {
    size: process.env.FORIM_UPLOAD_FILE_LIMIT || '1MB'
  },
  adapters: {

    // 本地磁盘配置
    disk: {
      dir: path.resolve(__dirname, process.env.FORIM_UPLOAD_PATH || '../../test/upload/'),
      base: process.env.FORIM_UPLOAD_URL || 'http://' + site.host + '/public/upload'
    },
    // 阿里云 OSS配置
    oss: {
      accessKeyId: process.env.ALIYUN_OSS_ACCESS_KEY_ID,
      secretAccessKey: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET,
      endpoint: process.env.ALIYUN_OSS_ENDPOINT,
      apiVersion: process.env.ALIYUN_OSS_APP_VERSION,
      Bucket: process.env.ALIYUN_OSS_BUCKET,
      base: process.env.ALIYUN_OSS_BASE
    },
    s3: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
      endpoint: process.env.AWS_S3_ENDPOINT,
      Bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION,
      progress: function () {
        // 用于表达进度信息
      }
    },
    cloudinary: {
      cloudName: process.env.FCU_CLOUDINARY_NAME,
      apiKey: process.env.FCU_CLOUDINARY_API_KEY,
      apiSecret: process.env.FCU_CLOUDINARY_API_SECRET
    }
  }
};
