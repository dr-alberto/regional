const nodemailer = require("nodemailer");

// Pull in Environments variables
const EMAIL = {
    authUser: process.env.AUTH_EMAIL_USERNAME,
    authPass: process.env.AUTH_EMAIL_PASSWORD,
};

async function main(mailOptions) {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: { user: 'alberto@sennet.ai', pass: 'qhvp mbwl mmpn lfot' }
      });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
        from: mailOptions?.from,
        to: mailOptions?.to,
        subject: mailOptions?.subject,
        text: mailOptions?.text,
        html: mailOptions?.html,
    });

    return info;
}

module.exports = main;
