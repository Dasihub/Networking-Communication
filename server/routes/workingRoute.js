const {Router} = require('express')
const WorkingController = require('../controllers/workingController')
const {authMiddleware} = require('../middleware/authMiddleware')

const router = Router()

router.get('/working/:id_user', authMiddleware, WorkingController.getWorking)
router.delete('/working/:id_working',authMiddleware, WorkingController.deleteWorking)
router.post('/working', authMiddleware, WorkingController.addWorking)
router.put('/working', authMiddleware, WorkingController.editWorking)

module.exports = router