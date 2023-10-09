# EmailVerficationOneTime
# Password Reset API

This is a simple Express.js application that provides endpoints for requesting a password reset email and resetting passwords using JSON Web Tokens (JWTs).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine.
- Gmail account credentials (for sending password reset emails).
- Basic understanding of Express.js, JWTs, bcrypt, and nodemailer.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MordenWebDev/EmailVerficationOneTime.git
 
Install dependencies:

bash
Copy code
npm install
Configure your Gmail email and password (or app-specific password) in passwordResetRoutes.js for sending emails.

Start the Express server:

bash
Copy code
npm start

Usage
Request Password Reset Email
Endpoint: POST /password-reset/request-reset

Request Body:

json

{
  "email": "user@example.com"
}

Response:

json

{
  "message": "Password reset email sent"
}

Reset Password
Endpoint: GET /password-reset/reset/:token/:email

URL Parameters:

token: The reset token received in the email.
email: The user's email address.
Response:

json
{
  "message": "Password reset successfully"
}


