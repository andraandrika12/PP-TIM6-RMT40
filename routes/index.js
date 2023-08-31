const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.storeNewUser)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
    if (!req.session.id) {
        let error = 'Please Log in to your Account'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/posts')
router.get('/posts/add')
router.post('/posts/add')
router.get('/posts/delete')
router.get('/logout')


module.exports = router