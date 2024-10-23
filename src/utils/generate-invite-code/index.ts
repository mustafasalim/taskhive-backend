import crypto from "crypto"

export const generateInviteCode = (): string => {
  return crypto.randomBytes(6).toString("hex")
}
