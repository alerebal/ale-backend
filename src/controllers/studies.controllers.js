const studiesCtrl = {}

const Study = require('../models/Study'); 

studiesCtrl.getStudies = async (req, res) => {
    const studies = await Study.find();
    res.json(studies);
}

studiesCtrl.getStudy = async (req, res) => {
    const {id} = req.params;
    const study = await Study.findById(id);
    res.json(study);
}

studiesCtrl.createStudy = async (req, res) => {
    const {title, desc, year} = req.body;
    const study = new Study({title, desc, year});
    await study.save()
    res.json(study);
}

studiesCtrl.deleteStudy = async (req, res) => {
    const {id} = req.params;
    await Study.findByIdAndDelete(id);
    res.json()
}

studiesCtrl.updateStudy = async (req, res) => {
    const {id} = req.params;
    const {title, desc, year} = req.body;
    const newStudy = await Study.findByIdAndUpdate(id, {title, desc, year}, {new: true});
    res.json(newStudy)
}

module.exports = studiesCtrl;