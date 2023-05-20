const NotiCtrl = require('../controllers/Noticies.controller')

const router = require('express').Router()

router.get('/',NotiCtrl.GetNoticie)
router.post('/add',NotiCtrl.AddNoticie)


module.exports = router;