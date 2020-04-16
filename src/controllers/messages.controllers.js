const indexCtrl = {}

const Message = require('../models/Messege');

indexCtrl.message = async (req, res) => {
    const {name, email, message} = req.body;
    const msg = new Message({name, email, message});
    await msg.save();
    res.json(msg);
}

indexCtrl.getMessages = async (req, res) => {
    const msgs = await Message.find().sort({createdAt: 'desc'});
    res.json(msgs)
}

indexCtrl.getMessage = async (req, res) => {
    const {id} = req.params;
    const msg = await Message.findById(id);
    res.json(msg);
}


module.exports = indexCtrl;