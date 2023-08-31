const { Post, PostTag, Tag, User, UserProfile } = require('../models/index')
const bcrypt = require('bcryptjs')

class Controller {

    static home(req, res) {
        res.render('home')
    }

    static register(req, res) {
        let errorMsg = req.query.error

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

                if (!result) {
                    return User.create({ email, password, phone })
                }

                let errorMsg = 'Email has already registered'
                return res.redirect(`/register?error=${errorMsg}`)

            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
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
            order: ["createdAt"]
        })
            .then(post => {
                res.render('timeline')
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
}


module.exports = Controller