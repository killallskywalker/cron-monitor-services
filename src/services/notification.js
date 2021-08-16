const nodemailer = require("nodemailer");
const config = require('../config/config');

exports.mailNotification = async (email,jobName) => {

    let transporter = nodemailer.createTransport({
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        auth: {
          user: config.email.smtp.auth.user, 
          pass: config.email.smtp.auth.pass, 
        },
    });

    let info = await transporter.sendMail({
        from: '"Free Cron Monitoring 👻" <killallskywalker@gmail.com>', 
        to: email, 
        subject: "Bad News , You need to check it ASAP 👻",
        text: "Your Cron Seems Not Run As Expected", 
        html: `<b>Please check your cron job " ${jobName} " , as we didt receive any call from your job to verified the status of cron</b>`, 
    });

    console.log(info)
}
