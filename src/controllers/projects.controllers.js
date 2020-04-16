const projectsCtrl = {};

const fs = require('fs-extra');
const path = require('path');

const Project = require('../models/Project');


projectsCtrl.getProjects = async (req, res) => {
    const projects = await Project.find().sort({updatedAt: 'desc'});
    res.json(projects);
}

projectsCtrl.getProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    res.json(project);
}

projectsCtrl.renderFormCreate = (req, res) => {
    res.render('forms/form')
}

projectsCtrl.createProject = async (req, res) => {
    const {title, desc, urlFront, frontCode, backCode} = req.body;
    
    if(req.file) {
        const imagePath = 'uploads/' + req.file.filename;
        const project = new Project({title, desc, imagePath, urlFront, frontCode, backCode});
        await project.save();
        res.json(project);
    } else {
        const project = new Project({title, desc, urlFront, frontCode, backCode});
        await project.save();
        res.json(project);
    }

}

projectsCtrl.deleteProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findByIdAndDelete(id);
    if(project.imagePath) {
        fs.unlink(path.resolve(project.imagePath));
    }
    res.send('Project has been deleted')
}

projectsCtrl.updateProject = async (req, res) => {
    const {id} = req.params;
    const {title, desc, priority} = req.body;
    const imagePath = 'uploads/' + req.file.filename;
    if(req.file) {
        const oldProject = await Project.findById(id);
        await fs.unlink(path.resolve(oldProject.imagePath));
        const newProject = await Project.findByIdAndUpdate(id, {title, desc, priority, imagePath}, {new: true});
        res.json(newProject)
    } else {
        const newProject = await Project.findByIdAndUpdate(id, {title, desc, priority}, {new: true});
        res.json(newProject)
    }
}

module.exports = projectsCtrl