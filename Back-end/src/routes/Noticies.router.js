const NotiCtrl = require('../controllers/Noticies.controller')

const router = require('express').Router()

router.get('/',NotiCtrl.GetNoticie)
router.get('/:id',NotiCtrl.GetNoticieID)
router.post('/add',NotiCtrl.AddNoticie)
router.put('/update/:id',NotiCtrl.UpdateNoticie)
router.delete('/Delete/:id',NotiCtrl.DeleteNoticie)


module.exports = router;