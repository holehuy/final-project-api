const AWS = require('aws-sdk')
const fs = require('fs')
const { accessKeyId, secretAccessKey, regionName, Bucket } = require('../config/aws')

AWS.config.update({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
  region: regionName
})

const s3 = new AWS.S3()

const uploadFile = async (file) => {
  try {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket: Bucket,
      Body: fileStream,
      ACL: 'public-read',
      Key: `avatar/${file.filename}`,
      ContentType: file.mimetype
    }
    const result = await s3.upload(uploadParams).promise()
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { s3, uploadFile }
