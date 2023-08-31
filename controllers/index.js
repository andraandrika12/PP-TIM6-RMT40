const { Post, PostTag, Tag, User, UserProfile } = require('../models/index')
const bcrypt = require('bcryptjs')

class Controller {

    static home(req, res) {
        res.render('home')
    }

    static register(req, res) {
        let errorMsg = req.query.error

        if (errorMsg) {
            errorMsg = errorMsg.split(',')
        }

        res.render('register-form', { errorMsg })
    }

    static storeNewUser(req, res) {
        let { email, password, phone } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(result => {

                if (result) {
                    let errorMsg = 'Email has already registered'
                    return res.redirect(`/register?error=${errorMsg}`)
                } else {
                    return User.create({ email, password, phone })
                }

            })
            .then((success) => {
                if (success) {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    let errorMsg = err.errors.map(e => e.message)
                    return res.redirect(`/register?error=${errorMsg}`)
                }
                console.log(err);
                res.send(err)
            })
    }

    static loginForm(req, res) {
        let errorMsg = req.query.error

        res.render('login-form', { errorMsg })
    }

    static postLogin(req, res) {
        let { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {

                let errorMsg = ''

                if (!user) {
                    errorMsg = 'cannot find account with this email, please sign up first'
                    return res.redirect(`/login?error=${errorMsg}`)
                }

                let validPassword = bcrypt.compareSync(password, user.password)

                if (!validPassword) {
                    errorMsg = 'incorrect Password'
                    return res.redirect(`/login?error=${errorMsg}`)
                }

                req.session.id = user.id
                req.session.role = user.role

                res.redirect('/posts')

            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getAllPost(req, res) {
        Post.findAll({
            include: {
                model: Tag,
                through: PostTag
            },
            order: ["createdAt", "DESC"]
        })
            .then(post => {
                res.render('timeline')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }

    static addPost(req, res) {

        let errorMsg = req.query.error

        if (errorMsg) {
            errorMsg = errorMsg.split(',')
        }

        res.render('add-post', { errorMsg })
    }

    static storeNewPost(req, res) {
        let { title, content, imgUrl } = req.body
        let UserId = req.session.id

        Post.create({ title, content, imgUrl, UserId })
            .then(() => {
                res.redirect('/posts')
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    let errorMsg = err.errors.map(e => e.message)
                    return res.redirect(`/register?error=${errorMsg}`)
                }
                console.log(err);
                res.send(err)
            })
    }

    static deletePost(req, res) {
        let id = req.session.id

        Post.destroy({
            where: { id }
        })
            .then(() => {
                res.redirect('/posts')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}


module.exports = Controller