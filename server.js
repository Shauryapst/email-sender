const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const data = {
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
}
console.log(data);

const transporter = nodemailer.createTransport(data);




app.post('/api/send-mail', (req, res) => {
    const { email } = req.body;

    const magicLink = `https://your-app.com/magic-link?token=some-generated-token`;

    const mailOptions = {
        from: 'truiam@outlook.com',
        to: email,
        subject: 'Your Magic Link',
        text: `Click this link to proceed: ${magicLink}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(409).json({ magicLinkSent: true, userWithEmailExists : "lol" });
    });
});

app.post('/api/check-user', async (req, res) => {
    try{
        const { email, client_id } = req.body;
        console.log(req.body);

        if(email == "shaurya.truminds@gmail.com"){
            return res.status(409).json({
                email,
                client_id,
                userWithEmailExists : true
            });
        }
        else{
             return res.status(200).json({
                email,
                client_id,
                 isBlocked: true,
                userWithEmailExists : true
            });
        }

        
    }
    catch(err){

    }
});






const PORT = process.env.PORT || 5050;

app.listen(PORT, ()=>{
    console.log('List the port 5050');
})
