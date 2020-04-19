const projectsCtrl = {};

const fs = require('fs-extra');
const { cloud } = require('../helpers/helpers');
const cloudinary = require('cloudinary');

const Project = require('../models/Project');

cloudinary.cloud;

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
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const imagePath = result.url;
        const image_id = result.public_id
        const project = new Project({title, desc, imagePath, image_id, urlFront, frontCode, backCode});
        await project.save();
        await fs.unlink(req.file.path);
        res.json(project);
    } else {
        const project = new Project({title, desc, urlFront, frontCode, backCode});
        await project.save();
        res.json(project);
    }

}

projectsCtrl.deleteProject = async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(project.imagePath) {
        await cloudinary.v2.uploader.destroy(project.image_id);
    }
    await Project.findByIdAndRemove(id);
    res.send('Project has been deleted')
}

projectsCtrl.updateProject = async (req, res) => {
    const {id} = req.params;
    const {title, desc, urlFront, frontCode, backCode} = req.body;
    if(req.file) {
        const oldProject = await Project.findById(id);
        await cloudinary.v2.uploader.destroy(oldProject.image_id);
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const imagePath = result.url;
        const image_id = result.public_id;
        const newProject = await Project.findByIdAndUpdate(id, {title, desc, imagePath, image_id, urlFront, frontCode, backCode}, {new: true});
        res.json(newProject)
    } else {
        const newProject = await Project.findByIdAndUpdate(id, {title, desc, urlFront, frontCode, backCode}, {new: true});
        res.json(newProject)
    }
}

module.exports = projectsCtrl