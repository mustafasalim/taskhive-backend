export interface ISignUpRequestBody {
  name: string
  email: string
  password: string
}

export interface IVerifyEmailRequestBody {
  verificationCode: string
}

export interface ILoginRequestBody {
  email: string
  password: string
}

export interface IForgotPasswordRequestBody {
  email: string
}

export interface IResetPasswordRequestBody {
  password: string
  confirmPassword: string
}

export interface IResetPasswordRequestParams {
  token: string
}
