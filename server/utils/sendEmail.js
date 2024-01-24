const nodemailer = require("nodemailer");

module.exports = async (email, subject, token) => {
	try {
        const options = {
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: { user: 'alberto@sennet.ai', pass: 'qhvp mbwl mmpn lfot' }
          }
          
        console.log(options)

		const transporter = nodemailer.createTransport(
            options
            //     {
		// 	host: process.env.HOST,
		// 	service: process.env.SERVICE,
		// 	port: Number(process.env.EMAIL_PORT),
		// 	secure: Boolean(process.env.SECURE),
		// 	auth: {
		// 		user: process.env.USER,
		// 		pass: process.env.PASS,
		// 	},
		// }
        );

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: token.toString(),
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};