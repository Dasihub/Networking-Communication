const {Router} = require('express')
const AuthController = require('../controllers/authController')
const {registerValidator} = require('../validators/registerValidator')

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', registerValidator, AuthController.register)
router.get('/check', AuthController.check)
router.get('/logout', AuthController.logout)

module.exports = router