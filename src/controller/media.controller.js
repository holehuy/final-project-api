const httpStatus = require('http-status')
const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)

const { catchAsync } = require('../helper')
const { mediaService } = require('../service')

const uploadAvatar = catchAsync(async (req, res) => {
  const { file } = req
  const result = await mediaService.uploadFile(file)
  await unlinkFile(file.path)
  res.status(httpStatus.OK).json({ avatar: result.Location })
})

module.exports = {
  uploadAvatar
}
