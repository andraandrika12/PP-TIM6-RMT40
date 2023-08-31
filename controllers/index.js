const { Post, PostTag, Tag, User, UserProfile } = require('../models/index')

class Controller {

    static home(req, res) {
        res.render('/')
    }

    static register(req, res) {
        let errorMsg = req.query.error

        res.render('register-form', { errorMsg })
    }

    static storeNewUser(req, res) {
        let { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(result => {
                if (result.email) {
                    let errorMsg = 'Email has already registered'
                    return res.redirect(`/register?error=${errorMsg}`)
                }

                return User.create({ email, password })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = Controller