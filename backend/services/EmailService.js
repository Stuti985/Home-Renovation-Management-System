const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // In production, you would configure AWS SES, SendGrid, etc.
    // For now, we'll use ethereal or just console.log if credentials aren't provided
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      auth: {
        user: process.env.EMAIL_USER || 'ethereal_user',
        pass: process.env.EMAIL_PASS || 'ethereal_pass'
      }
    });
  }

  async sendEmail(options) {
    const mailOptions = {
      from: 'RenovatePro <noreply@renovatepro.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`\n================= EMAIL INTERCEPTED =================`);
      console.log(`To: ${options.email}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Body: \n${options.message}`);
      console.log(`=====================================================\n`);
      return; // Skip actual sending in dev if not explicitly configured
    }

    await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(user, token) {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${token}`;
    const message = `Please click the link to verify your email address: \n\n ${verifyUrl}`;
    
    await this.sendEmail({
      email: user.email,
      subject: 'Verify your RenovatePro Account',
      message
    });
  }

  async sendPasswordResetEmail(user, token) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
    const message = `Forgot your password? Click the link to submit a new password: \n\n ${resetUrl}\n\nIf you didn't forget your password, please ignore this email.`;
    
    await this.sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });
  }
}

module.exports = new EmailService();
