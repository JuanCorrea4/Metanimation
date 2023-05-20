const CourCrl = require('../controllers/Course.Controller')
const router = require('express').Router()
const ValidatorCourse = require('../validators/Course.validators')
const AuthCourse = require('../middlewares/course.auth')

router.get('/',CourCrl.GetCourseAll)
router.get('/:id',CourCrl.GetCourseElement)
router.post('/add',ValidatorCourse.AddCourse,AuthCourse.verifyTokenEmailModifyCouser,CourCrl.AddCourse)
router.put('/update/:id',CourCrl.UpdateCourse)


module.exports = router;