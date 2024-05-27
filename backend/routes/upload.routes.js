const multer = require('multer')
const path = require('path')
const router = require('express').Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${(Date, now())}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/ // ReGex

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

  const mimetype = fileTypes.test(file.mimetype)

  if (extName && mineType) return cb(null, true)
  else cb('Images only.')
}

const upload = multer({ storage })

/** UPLOAD ROUTE */
router.post('/', upload.single('image'), (req, res) =>
  res
    .status(202)
    .json({ message: 'Image uploaded', Image: `/${req.file.path}` })
)

module.exports = router
