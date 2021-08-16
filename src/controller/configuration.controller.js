const Configuration = require("./../models/configuration.model");
const Project = require("./../models/project.model");
const moment = require('moment');
const { mailNotification } = require('./../services/notification');

// create project 
exports.createConfiguration = async (req,res,next) => {
    try{
        const configuration = new Configuration({
            project:req.body.projectId,
            jobName:req.body.jobName,
            frequency:req.body.frequency,
            email:req.body.email
        });
    
        let newConfiguration = await configuration.save();
    
        await Project.findByIdAndUpdate({_id:req.body.projectId},{
            $push:{
                configurations:newConfiguration._id
            }
        })
    
        res.json({ status: "SUCCESS" , data:newConfiguration});
    }catch(e){
        next(new Error(e.message));
    }
}

// display list all of project list
exports.configurationList = async (req,res,next) => {
    try{
        const configurations = await Configuration.find();

        res.json({ status: "SUCCESS" , data:configurations});
    }catch(e){
        next(new Error(e.message));
    }
}

// display detail of project
exports.configurationDetail = async (req,res,next) => {
    try{
        const configuration = await Configuration.find({project:req.params.id});

        res.json({ status: "SUCCESS" , data:configuration});
    }catch(e){
        next(new Error(e.message));
    }
}

// update configuration detail
exports.updateConfiguration = async (req,res,next) => {
    try{
        const configuration = req.body;
    
        const updatedConfiguration = await Project.findOneAndUpdate(
            {
            _id: req.params.id,
            },
            configuration,
            {new: true}
        );
    
        res.json({ status: "SUCCESS" , data:updatedConfiguration});
    }catch(e){
        next(new Error(e.message));
    }
}

// remove project 
exports.deleteConfiguration = async (req,res,next)=>{
    try{
        const configuration = await Configuration.findByIdAndDelete({_id:req.params.id});

        if(configuration){
            const deletedConfiguration = await Project.findByIdAndUpdate({_id:configuration.project},{
                $pull:{
                    configurations:configuration._id
                }
            }) 
    
            res.json({ status: "SUCCESS" , data:configuration});
    
        }else{
            res.status(404).json({ status: "NOT_FOUND" , data:null});
        }
    }catch(e){
        next(new Error(e.message));
    }
}

// call check 
exports.check = async (req,res,next) => {
    try{
        await Configuration.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                lastCheck:moment().format(),
                status:true,
                health:true
            },
            {
                new: true, 
                useFindAndModify:false
            }
        );   
        res.send('OK');
    }catch(e){
        next(new Error(e.message));
    }    
}

// manual callback for cron job
exports.callback = async (req,res,next) => {
    try{
        // we will send notification to user if their healthcheck not update in 24 hourse and 3 minutes as interval
        const overdue = moment().subtract(1,"day").add(3,'minutes').format();

        // updatedAt will be update by today date to make sure there is no repetition notification send on checking
        // unsuccessfull notification
        const unsuccessfulConfiguration = await Configuration.find({ 
            status:true,
            frequency:"Daily",
            lastCheck: { $lt:overdue },
            updatedAt: { $lt:overdue }  
        }); 

        // await mailNotification();
        if(unsuccessfulConfiguration.length > 0){
            // send notification to unsuccessful cron check ( in production will handle using queue )
            unsuccessfulConfiguration.map( async (configuration)=> {
                await Configuration.findOneAndUpdate({
                        _id: configuration.id,
                    },
                    {
                        updatedAt:new Date(),
                        health:false
                    },
                    {
                        new: true, 
                        useFindAndModify:false
                    }
                );
                await mailNotification(configuration.email,configuration.jobName);
            })
        }
        res.send(unsuccessfulConfiguration);
    }catch(e){
        next(new Error(e.message));
    }
}