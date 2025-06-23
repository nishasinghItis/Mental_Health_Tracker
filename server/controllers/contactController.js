import nodemailer from 'nodemailer';

export const sendContactMessage = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_TO, // Your email to receive contact messages
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Message from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });
};
