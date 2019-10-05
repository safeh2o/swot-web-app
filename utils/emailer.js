

const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

exports.emailAdmin = function(message) {
  const data = {
    from: process.env.FROM_ADDRESS,
    to: process.env.ADMIN_EMAIL,
    subject: 'SWOT Application Message',
    text: message
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.error("WARNING: ACTION NEEDED: Unable to send mail through Mailgun!", error, body);
    } else {
      console.log('Sent email:', body);
    }
  });
}