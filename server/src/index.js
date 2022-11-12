const nodemailer = require('nodemailer');
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/send-email', async (req, res) => {
  const { userEmail, password, to, subject, text } = req.body
  console.log(userEmail, password)

  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: password
      }
    });
  
    let mailDetails = {
      from: userEmail,
      to,
      subject,
      text
    };
  
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs', err);
      } else {
        console.log('Email sent successfully');
      }
    });
  
    return res.json({ message: 'success' });
  } catch(e) {
    throw new Error(e)
  }

})

app.listen(3333)