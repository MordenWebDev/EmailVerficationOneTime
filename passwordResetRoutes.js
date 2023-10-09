const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Replace 'your-secret-key' with your actual secret key
const secretKey = 'your-secret-key';

// Mock user data (you should replace this with your database logic)
const users = [
  {
    id: 1,
    email: 'bewamoh825@czilou.com',
    // Hashed password: "password123"
    passwordHash: '$2b$10$4Sy7ey/ZiMcBpDft5szGguYIGfFLEsAtNCe.Utj8oQsY4iUeBONFe',
  },
];

// Route to request a password reset email
router.post('/request-reset', (req, res) => {
 
  const { email } = req.body;

  // Check if the email exists in the mock user data
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a reset token with an expiration time (e.g., 1 hour)
  const token = jwt.sign({ email }, secretKey+user.passwordHash, { expiresIn: '15m' });

  // Send a password reset email with the token
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mordenwebdeveloper@gmail.com', // Replace with your Gmail email address
      pass: '', // Replace with your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: 'mordenwebdeveloper@gmail.com', // Replace with your Gmail email address
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/password-reset/reset/${token}/${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Email sending failed' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Password reset email sent' });
    }
  });
});

// Route to reset the password
router.get('/reset/:token/:email', async (req, res) => {
 
//   const { email, token, newPassword } = req.body;
const newPassword="123456"
const { email, token } = req.params;

  try {
    // Find the user in the mock data
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the token
    // const decoded = jwt.verify(token, secretKey+user.passwordHash);
 // Verify the token
 jwt.verify(token, secretKey+user.passwordHash, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      return res.status(401).json({ message: 'Token verification failed' });
    }

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Hash the new password
    bcrypt.hash(newPassword, 10, (hashErr, newPasswordHash) => {
      if (hashErr) {
        return res.status(500).json({ message: 'Password hashing error' });
      }

      // Update the user's password hash with the new password hash
      user.passwordHash = newPasswordHash;

      return res.status(200).json({ message: 'Password reset successfully' });
    });
  });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
}
});
module.exports = router;
