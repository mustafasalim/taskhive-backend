export interface ISendVerificaionEmail {
  email: string
  verificationCode: string
}

export interface ISendWelcomeEmail {
  email: string | undefined
  name: string | undefined
}

export interface ISendPasswordResetEmail {
  email: string
  resetToken: string
}

export interface ISendResetSuccessEmail {
  email: string
}
