// import nodemailer from 'nodemailer'

// export const sendEmail = async ({email, emailType, userId}:any){
//     try{
//         const transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 465,
//             secure: true, 
//             auth: {
//               user: "maddison53@ethereal.email",
//               pass: "jn7jnAPss4f63QBp6D",
//             },
//           });

//           const mailOption = {
//             from: '',
//             to: email,
//             subject: emailType==='Verify' ? "Verify your email" : "Reset password ",
//             html: "<b> hello </b>"
//           }

//           const mailResponse = await transporter.sendMail(mailOption)
//           return mailResponse
//     }catch(error:any){
//         throw new Error(error.message)

//     }
// }
