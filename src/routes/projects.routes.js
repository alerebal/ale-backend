const router = require('express').Router();

const { multer } = require('../helpers/helpers');

const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject,
    renderFormCreate
} = require('../controllers/projects.controllers');

router.get('/project', getProjects)
router.get('/project/:id', getProject)
router.get('/newProject', renderFormCreate)
          
router.post('/newProject', multer, createProject)

router.delete('/project/:id', deleteProject)

router.put('/project/:id', multer, updateProject)


module.exports = router;