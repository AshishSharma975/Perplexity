import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
      type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        clientId:process.env.GOOGLE_CLIENT_ID
    }
})
transport.verify()
.then(()=>console.log("Email transporter is ready"))
.catch((err)=>console.error("Email transporter verification failed", err))

 export async function sendEmail({to, subject, text, html}) {

  console.log("Sending email to:", to)

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
  };

  const details = await transport.sendMail(mailOptions);

  console.log("email sent", details)
}