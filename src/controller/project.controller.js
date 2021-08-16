const Project = require("./../models/project.model");

// create project 
exports.createProject = async (req,res,next) => {
    try{
        const project = new Project({
            projectName: req.body.projectName,
            email: req.body.email,
        });
    
        let newProject = await project.save();

        res.json({ status: "SUCCESS" , data:newProject});
    }catch(e){
        next(new Error(e.message));
    }
}

// display list all of project list
exports.projectList = async (req,res,next) => {
    try{
        const projects = await Project.find();

        res.json({ status: "SUCCESS" , data:projects});
    }catch(e){
        next(new Error(e.message));
    }
}

// display detail of project
exports.projectDetail = async (req,res,next) => {
    try{
        const projects = await Project.find({_id:req.params.id});

        res.json({ status: "SUCCESS" , data:projects});
    }catch(e){
        next(new Error(e.message));
    }
}

// update project detail
exports.updateProject = async (req,res,next) => {
    try{
        const project = req.body;
    
        const updatedProject = await Project.findOneAndUpdate(
            {
            _id: req.params.id,
            },
            project,
            {new: true}
        );
    
        res.json({ status: "SUCCESS" , data:updatedProject});
    }catch(e){
        next(new Error(e.message));
    }
}

// remove project 
exports.removeProject = async (req,res,next)=> {
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
    
        res.json({ status: "SUCCESS" , data:project});
    }catch(e){
        next(new Error(e.message));
    }
}

