import { containsSpecialChars } from "../../../common/utils/utils"

interface ICredential {
  username: string
  isUsernameEmpty: boolean
  isUsernameError: boolean
  password: string
  isPasswordEmpty: boolean
  isPasswordError: boolean
  canSignin: boolean
}

interface ICredentialAction {
  type: "username" | "password" | "reset"
  payload: string
}

export const initialCredentialState: ICredential = {
  username: "",
  isUsernameEmpty: true,
  isUsernameError: false,
  password: "",
  isPasswordEmpty: true,
  isPasswordError: false,
  canSignin: false
}

const isSigninable = (s: ICredential) => {
  return (
    !s.isUsernameEmpty &&
    !s.isPasswordEmpty &&
    !s.isUsernameError &&
    !s.isPasswordError
  )
}

export const signinReducer = (
  state: ICredential,
  { type, payload }: ICredentialAction
): ICredential => {
  switch (type) {
    case "username":
      const isUsernameEmpty = payload.length === 0
      const isUsernameError = containsSpecialChars(payload)
      return {
        ...state,
        username: payload,
        isUsernameEmpty,
        isUsernameError,
        canSignin: isSigninable({ ...state, isUsernameEmpty, isUsernameError })
      }
    case "password":
      const isPasswordEmpty = payload.length === 0
      const isPasswordError = 0 < payload.length && payload.length < 8
      return {
        ...state,
        password: payload,
        isPasswordEmpty,
        isPasswordError,
        canSignin: isSigninable({
          ...state,
          isPasswordEmpty,
          isPasswordError
        })
      }
    case "reset":
      return initialCredentialState
    default:
      throw new Error("Undefined sign in action type caught")
  }
}
