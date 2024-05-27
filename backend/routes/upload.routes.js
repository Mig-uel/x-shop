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

const checkFileType = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|png/
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = mimeTypes.test(file.mimetype)

  if (extName && mimeType) cb(null, true)
  else cb(new Error('File is not an image.'), false)
}

const upload = multer({ storage, checkFileType })
const uploadSingleImage = upload.single('image')

/** UPLOAD ROUTE */
router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) return res.status(400).json({ message: err.message })

    res
      .status(200)
      .json({ message: 'Image uploaded.', image: `/${req.file.path}` })
  })
})

module.exports = router
