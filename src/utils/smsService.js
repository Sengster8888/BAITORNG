const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const sendVerificationCode = async (phoneNumber) => {
  try {
    // Ensure phone number is in E.164 format (e.g., +855...)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    const verification = await client.verify.v2.services(serviceSid)
      .verifications
      .create({ to: formattedPhone, channel: 'sms' });
    
    return verification;
  } catch (error) {
    console.error('Error sending Twilio verification:', error);
    throw error;
  }
};

const checkVerificationCode = async (phoneNumber, code) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    const verificationCheck = await client.verify.v2.services(serviceSid)
      .verificationChecks
      .create({ to: formattedPhone, code: code });
    
    return verificationCheck;
  } catch (error) {
    console.error('Error checking Twilio verification:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationCode,
  checkVerificationCode
};
