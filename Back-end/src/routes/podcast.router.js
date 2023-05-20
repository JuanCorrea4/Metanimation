const router = require('express').Router()
const CrtlPodcast = require('../controllers/podscast.controller')

router.get('/',CrtlPodcast.GetPodCast)
router.get('/:Name',CrtlPodcast.GetPodCastName)
router.post('/New',CrtlPodcast.AddPodCast)
router.delete('/delete/:id',CrtlPodcast.deletePodCast)

module.exports = router;