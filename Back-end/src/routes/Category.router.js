const router = require('express').Router();
const CateCtrl = require('../controllers/Category.controller')

router.post('/new',CateCtrl.AddCategory)
router.get('/:name',CateCtrl.GetCategoryName)
router.get('/',CateCtrl.GetCategoryAll)
router.get('/:id',CateCtrl.GetCagoryId)

module.exports = router