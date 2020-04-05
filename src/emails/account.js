const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from:'boba.tochka@gmail.com',
        subject: 'Welcome to the app!',
        text: `Welcome to the app, ${name}! Let me know how you get alone with the app.`
    })
}

const sendByeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from:'boba.tochka@gmail.com',
        subject: 'Goodbye!',
        text: `Dear ${name}\nWe are sad you are leaving us:(\nCan you tell us the reason?`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendByeEmail
}