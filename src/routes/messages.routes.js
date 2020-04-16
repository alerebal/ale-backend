const router = require('express').Router();

const {
    message,
    getMessage,
    getMessages
} = require('../controllers/messages.controllers');

router.get('/messages', getMessages)
router.get('/message/:id', getMessage)

router.post('/message', message)


module.exports = router