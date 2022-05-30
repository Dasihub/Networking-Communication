async function authMiddleware(req, res, next) {
    try {
        const {token} = req.cookies
        if (token) {
            return next()
        }
        res.status(200).json({
            message: 'Вы не авторизованы!',
            type: 'error',
            data: [],
            auth: false
        })
    } catch (e) {
        res.status(501).json({
            message: 'Ошибка в сервере!',
            type: 'error',
            data: [],
            auth: false
        })
    }
}

module.exports = {authMiddleware}