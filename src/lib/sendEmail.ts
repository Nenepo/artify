// //  API route for emailing the code
// import type { NextApiRequest, NextApiResponse } from "next";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { to, otp } = JSON.parse(req.body);

//   try {
//     await sgMail.send({
//       to,
//       from: "youremail@example.com", // verified sender
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It expires in 5 minutes.`,
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to send email" });
//   }
// }
