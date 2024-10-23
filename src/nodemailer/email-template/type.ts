export interface IVerificationEmailTemplate {
  verificationCode: string
}

export interface IWelcomeEmailTemplate {
  appName: string
  name: string | undefined
}

export interface IPasswordResetRequestEmailTemplate {
  resetToken: string
}

export interface IInviteWorkspaceEmailTemplate {
  inviteCode: string
}
