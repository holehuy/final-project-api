const express = require('express')
const multer = require('multer')

const { auth } = require('../middleware/auth.middleware')
const { mediaController } = require('../controller')

const upload = multer({ dest: 'upload/' })
const router = express.Router()

router.post('/avatar', auth('uploadAvatar'), upload.single('image'), mediaController.uploadAvatar)

module.exports = router
