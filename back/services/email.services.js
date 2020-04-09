const nodemailer = require("nodemailer");
const { senderEmail, senderPass, receiver1 } = require("../config/keys").email;

// email data of the sender (app admin)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPass,
  },
});

// mail options for receiver
const setMailOptions = (firma) => {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return {
    from: senderEmail,
    to: receiver1,
    subject: "Anzeige bald verlaufen: " + firma.firma,
    html: `
    <pre>
    Hallo!

    Diese Anzeige läuft am <b>${firma.endDate.toLocaleDateString(
      "de-DE",
      dateOptions
    )}</b> ab.  
   
    
    <b>Firma:</b>    ${firma.firma}
    <b>Adresse:</b>  ${firma.address}
    <b>Telefon:</b>  ${firma.phone}
    <b>Email:</b>    ${firma.email}
      
    
    Schönen Tag.

    Ihr AnzeigeApp Team.
    </pre>`,
  };
};

// send email
const sendEmail = (company) => {
  transporter.sendMail(setMailOptions(company), (err, info) => {
    if (err) console.error(err);
    else console.log("Email sent: " + info.response);
  });
};

// export function to send emails
module.exports = {
  sendEmail,
};
