exports.resetLink = (email, link) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reset Your Itgeeks Admin Panel Account Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Reset Your Itgeeks Admin Panel Account Password</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">You have requested to reset your Itgeeks Admin Panel account password.</p>
          <p style="color: #555;">To reset your password, please click the following link:</p>
          <p style="color: #555; margin-top: 10px;"><a href="${link}" style="color: #007bff; text-decoration: none;">Reset Password</a></p>
          <p style="color: #555;">If you did not request this password reset, please ignore this email.</p>
          <p style="color: #555;">Thank you,<br/>The Itgeeks Admin Panel Team</p>
        </div>
      </div>
    `,
  };
  return data;
};


exports.invitationEmail = (email, userName, verifyLink) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'INVITATION MAIN FROM ARCHD',
    text: 'Text body',
    html: `<head>
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style type="text/css">
        #outlook a { padding: 0; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass * { line-height:100%; }
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
        @media only screen and (max-width:480px) {
          @-ms-viewport { width:320px; }
          @viewport { width:320px; }
        }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix {
          width:100% !important;
        }
      </style>
      <![endif]-->
      
      <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
          <style type="text/css">
      
              @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      
          </style>
        <!--<![endif]--><style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
        }
      </style>
      </head>
      <body style="background: #F9F9F9;">
        <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
        <style type="text/css">
          html, body, * {
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
          }
          a {
            color:#1EB0F4;
            text-decoration:none;
          }
          a:hover {
            text-decoration:underline;
          }
        </style>
      <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
            <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
              <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
              <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
            <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
            <![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Welcome to Archd!</div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></td></tr></tbody></table><!--[if mso | IE]>
              </v:textbox>
            </v:rect>
            <![endif]--></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                  <p><img src="https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png" alt="Party Wumpus" title="None" width="500" style="height: auto;"></p>
      
        <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey ${userName},</h2>
      <p>Welcome to our platform! We're thrilled that you've created an account with us. You're joining an amazing community, and we're excited to have you on board. We believe you're going to be a fantastic addition to our growing family of users.</p>
      
                </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA"><a href=${verifyLink} style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                Accept Invitation
                </a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
              <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
            </td></tr></table>
            <![endif]--></div>
      
      </body>`,
  }
  return data
}

exports.welcomeEmail = (email, userName) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to ARCHD',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Welcome to ARCHD, ${userName}!</h2>
          <p style="color: #555;">Dear ${userName},</p>
          <p style="color: #555;">Thank you for signing up for an ARCHD account.</p>
          <p style="color: #555;">Your account is currently pending verification by the ARCHD team.</p>
          <p style="color: #555;">Once your account is verified, you will receive another email confirming your access to ARCHD.</p>
          <p style="color: #555; margin-top: 20px;">Thank you for choosing ARCHD!</p>
          <p style="color: #555;">Best regards,<br/>The ARCHD Team</p>
        </div>
      </div>
    `,
  };
  return data;
};

exports.verificationSuccessEmail = (email, userName, resetLink) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your ARCHD Account has been Verified!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Congratulations, ${userName}!</h2>
          <p style="color: #555;">Dear ${userName},</p>
          <p style="color: #555;">Your ARCHD account has been successfully verified by our team.</p>
          <p style="color: #555;">You can now reset your password by clicking the following link:</p>
          <p style="color: #555; margin-top: 10px;"><a href="${resetLink}" target="_blank" style="color: #007bff; text-decoration: none;">Reset Password</a></p>
          <p style="color: #555;">If you did not request this password reset, please contact our support team immediately.</p>
          <p style="color: #555; margin-top: 20px;">Thank you for choosing ARCHD!</p>
          <p style="color: #555;">Best regards,<br/>The ARCHD Team</p>
        </div>
      </div>
    `,
  };
  return data;
};


exports.two2FactorOtpMail = (email, verifyCode) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'ARCHD - Two-Factor Authentication Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">ARCHD - Two-Factor Authentication</h2>
          <p style="color: #555;">Dear user,</p>
          <p style="color: #555;">Your verification code for two-factor authentication is:</p>
          <div style="background-color: #fff; border: 1px solid #ccc; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <h3 style="margin: 0; color: #333; font-size: 24px;">${verifyCode}</h3>
          </div>
          <p style="color: #555; margin-top: 20px;">If you didn't request this code, please ignore this email.</p>
          <p style="color: #555;">Thank you,<br/>The ARCHD Team</p>
        </div>
      </div>
    `,
  };
  return data;
};


exports.otpMail = (custEmailitem, otpItem) => {
  const data = {
    from: process.env.SMTP_USER,
    to: custEmailitem,
    subject: 'One-Time Password (OTP) - ARCHD',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">One-Time Password (OTP)</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">Your one-time password (OTP) for authentication is:</p>
          <div style="background-color: #fff; border: 1px solid #ccc; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <h3 style="margin: 0; color: #333; font-size: 24px;">${otpItem}</h3>
          </div>
          <p style="color: #555; margin-top: 20px;">This OTP is valid for a single use and should not be shared with anyone.</p>
          <p style="color: #555;">Thank you,<br/>The ARCHD Team</p>
        </div>
      </div>
    `,
  };
  return data;
};



exports.Notification = (email, subject, text) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    text: text,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">${subject}</h2>
          <p style="color: #555;">Dear User,</p>
          <p style="color: #555;">${text}</p>
          <p style="color: #555; margin-top: 20px;">Thank you,<br/>The ARCHD Team</p>
        </div>
      </div>
    `,
  };
  return data;
};

//Support Mail
exports.supportMail = (email, params) => {
  const data = {
    from: process.env.SMTP_USER,
    to: email,
    subject: params.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Support Mail</h2>
          <p style="color: #555;">Name : ${params.name}</p>
          <p style="color: #555;">Company : ${params.company}</p>
          <p style="color: #555;">Role : ${params.role}</p>
          <p style="color: #555;">Comment :</p>
          <div>
          ${params.comment}
          </div>
        </div>
      </div>
    `,
  };
  return data;
};