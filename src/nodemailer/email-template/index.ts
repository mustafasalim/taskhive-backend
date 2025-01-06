import {
  IInviteWorkspaceEmailTemplate,
  IPasswordResetRequestEmailTemplate,
  IVerificationEmailTemplate,
  IWelcomeEmailTemplate,
} from "./type"

export const verificationEmailTemplate = (
  props: IVerificationEmailTemplate
) => {
  const { verificationCode } = props
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Taskhive Email</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 500; font-size: 24px;">Taskhive Email Verification</h1>
    </div>
    <div style="padding: 32px 24px;">
      <p style="color: #4b5563; margin: 0 0 24px 0;">Welcome to Taskhive!</p>
      <p style="color: #4b5563; margin: 0 0 24px 0;">Please use the verification code below to complete your registration:</p>
      <div style="text-align: center; margin: 32px 0;">
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; display: inline-block;">
          <span style="font-size: 28px; font-weight: 600; letter-spacing: 8px; color: #7c3aed;">${verificationCode}</span>
        </div>
      </div>
      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">This code will expire in 15 minutes.</p>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Taskhive. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

export const welcomeEmailTemplate = (props: IWelcomeEmailTemplate) => {
  const { name } = props
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Taskhive</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 500; font-size: 24px;">Welcome to Taskhive</h1>
    </div>
    <div style="padding: 32px 24px;">
      <p style="color: #4b5563; margin: 0 0 24px 0;">Hi ${name},</p>
      <p style="color: #4b5563; margin: 0 0 24px 0;">Welcome to Taskhive! We're excited to have you on board. Get started by exploring our platform and managing your tasks efficiently:</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${
          process.env.CLIENT_URL
        }" style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background-color 0.2s;">Get Started</a>
      </div>
      <p style="color: #4b5563; margin: 24px 0 0 0;">Best regards,<br>The Taskhive Team</p>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Taskhive. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

export const passwordResetSuccessEmailTemplate = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taskhive Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 500; font-size: 24px;">Password Reset Successful</h1>
    </div>
    <div style="padding: 32px 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="background-color: #dcfce7; width: 48px; height: 48px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p style="color: #4b5563; margin: 0; font-weight: 500;">Your Taskhive password has been successfully reset</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="color: #4b5563; margin: 0 0 12px 0; font-weight: 500;">Security Recommendations:</p>
        <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication</li>
          <li>Never share your password with others</li>
        </ul>
      </div>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">If you didn't request this change, please contact Taskhive support immediately.</p>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Taskhive. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

export const passwordResetRequestTemplate = (
  props: IPasswordResetRequestEmailTemplate
) => {
  const { resetToken } = props
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Taskhive Password</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 500; font-size: 24px;">Reset Your Taskhive Password</h1>
    </div>
    <div style="padding: 32px 24px;">
      <p style="color: #4b5563; margin: 0 0 24px 0;">Hello,</p>
      <p style="color: #4b5563; margin: 0 0 24px 0;">We received a request to reset your Taskhive password. Click the button below to proceed:</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetToken}" style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background-color 0.2s;">Reset Password</a>
      </div>
      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">This link will expire in 1 hour.</p>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">If you didn't request this reset, please ignore this email.</p>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Taskhive. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

export const inviteWorkspaceEmailTemplate = (
  props: IInviteWorkspaceEmailTemplate
) => {
  const { inviteCode } = props
  console.log("fawfwadw", inviteCode)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taskhive Workspace Invitation</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background-color: #7c3aed; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-weight: 500; font-size: 24px;">Join Taskhive Workspace</h1>
    </div>
    <div style="padding: 32px 24px;">
      <p style="color: #4b5563; margin: 0 0 24px 0;">Hello,</p>
      <p style="color: #4b5563; margin: 0 0 24px 0;">You've been invited to join a Taskhive workspace. Use the code below to accept the invitation:</p>
      <div style="text-align: center; margin: 32px 0;">
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; display: inline-block;">
          <span style="font-family: monospace; font-size: 24px; font-weight: 600; letter-spacing: 2px; color: #7c3aed;">${inviteCode}</span>
        </div>
      </div>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">Please copy this code exactly as shown above.</p>
    </div>
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Taskhive. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}
