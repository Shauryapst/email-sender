const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});


app.post('/api/send-mail', (req, res) => {
    console.log(req);
    const { email } = req.body;

    const magicLink = `https://your-app.com/magic-link?token=some-generated-token`;

    const mailOptions = {
        from: 'your-email@outlook.com',
        to: email,
        subject: 'Your Magic Link',
        text: `Click this link to proceed: ${magicLink}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ magicLinkSent: true });
    });
});






const PORT = process.env.PORT || 5050;

app.listen(PORT, ()=>{
    console.log('List the port 5050');
})
