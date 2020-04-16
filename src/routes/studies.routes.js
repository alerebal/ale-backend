const router = require('express').Router();

const {
    getStudies,
    getStudy,
    createStudy,
    deleteStudy,
    updateStudy
} = require('../controllers/studies.controllers');

router.get('/studies', getStudies)
router.get('/study/:id', getStudy)

router.post('/study', createStudy)

router.delete('/study/:id', deleteStudy)

router.put('/study/:id', updateStudy)

module.exports = router;