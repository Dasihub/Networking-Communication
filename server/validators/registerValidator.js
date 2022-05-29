async function registerValidator(req, res, next) {
    try {
        const {password} = req.body
        if (!(password.length > 5)) {
            return res.status(303).json({
                message: 'Пароль должен быть больше 5 знаков!',
                type: 'warning',
                data: [],
                register: false
            })
        }
        next()
    } catch (e) {
        res.status(501).json({
            message: 'Ошибка в сервере!',
            type: 'error',
            data: [],
            register: false
        })
    }
}

module.exports = {registerValidator}