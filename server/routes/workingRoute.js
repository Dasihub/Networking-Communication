const {Router} = require('express')
const WorkingController = require('../controllers/workingController')

const router = Router()

router.get('/working/:id_user', WorkingController.getWorking)
router.delete('/working/:id_working', WorkingController.deleteWorking)
router.post('/working', WorkingController.addWorking)
router.put('/working', WorkingController.editWorking)

module.exports = router