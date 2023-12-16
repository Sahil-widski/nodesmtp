const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "info@zoommantra.com",
        pass: "Team@121"
    }
});

app.post('/app/send-email', (req, res) => {
    const { CompleteName, EmailAddress, PhoneNo, Message } = req.body;
    const html = `
        Name: ${CompleteName} <br>
        Email: ${EmailAddress} <br>
        Mobile Number: ${PhoneNo} <br>
        Requirement: ${Message}`;

    const mailOptions = {
        from: '"Zoommantra celebrity" <noreplay@zoommantra.ae>',
        to: 'info@zoommantra.com',
        subject: 'Lead From zoommantra celebrity landing page',
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Redirect or send a response here
        res.send('Thank you for the message. We will contact you shortly.');
    });
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});