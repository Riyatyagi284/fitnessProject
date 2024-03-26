import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            //host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: 'kraig.huels@ethereal.email',
                pass: 'mqUYfgxgfKH8dFe1bc',
                // user: process.env.MAIL_USER,
                // pass: process.env.MAIL_PASS,
            },
            secure: false,
        })

        let info = await transporter.sendMail({
            from: `Fitness website`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info.response)
        return info;
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export default mailSender;