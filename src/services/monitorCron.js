const Configuration = require("./../models/configuration.model");
const moment = require('moment');
const { mailNotification } = require('./notification');

exports.mailNotification = async (email) => {
    try{

        console.log('Start cron');

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

        if(unsuccessfulConfiguration.length > 0){
            // send notification to unsuccessful cron check ( in production will handle using queue )
            unsuccessfulConfiguration.map( async (configuration)=> {
                await Configuration.findOneAndUpdate({
                        _id: configuration.id,
                    },
                    {
                        updatedAt:new Date(),
                    },
                    {
                        new: true, 
                        useFindAndModify:false
                    }
                );
                await mailNotification(configuration.email,configuration.jobName);
            })
        }

        console.log('End cron');

    }catch(e){
        next(new Error(e.message));
    }
}
