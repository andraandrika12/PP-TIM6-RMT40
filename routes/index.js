const express = require('express')
const router = express.Router()
const Controller = require('../controllers')
const path = require('path')
const multer = require('multer')
const checkFileType = require('../helpers/pict-type')


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profilePicture');




router.get('/', Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.storeNewUser)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.postLogin)

router.use(function (req, res, next) {
    console.log(req.session);
    if (!req.session.UserId) {
        let error = 'Please Log in to your Account'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/userProfile/edit', Controller.userProfile)
router.post('/userProfile/edit', upload, Controller.storeUpdateProfile)
router.get('/posts', Controller.getAllPost)
router.get('/posts/add', Controller.addPost)
router.post('/posts/add', Controller.storeNewPost)
router.get('/posts/:postId/delete', Controller.deletePost)
router.get('/logout', Controller.logout)


module.exports = router