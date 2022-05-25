import { containsSpecialChars } from "../../../common/utils/utils"

interface IForm {
  name: string
  isNameEmpty: boolean
  isNameError: boolean
  username: string
  isUsernameEmpty: boolean
  isUsernameError: boolean
  password: string
  isPasswordEmpty: boolean
  isPasswordError: boolean
  confirmPassword: string
  isConfirmPasswordEmpty: boolean
  isConfirmPasswordError: boolean
  canCreate: boolean
}

interface IFormAction {
  type: "name" | "username" | "password" | "confirm"
  payload: string
}

export const initialFormState: IForm = {
  name: "",
  isNameEmpty: true,
  isNameError: false,
  username: "",
  isUsernameEmpty: true,
  isUsernameError: false,
  password: "",
  isPasswordEmpty: true,
  isPasswordError: false,
  confirmPassword: "",
  isConfirmPasswordEmpty: true,
  isConfirmPasswordError: false,
  canCreate: false
}

const isCreatable = (s: IForm) => {
  return (
    !s.isNameEmpty &&
    !s.isUsernameEmpty &&
    !s.isPasswordEmpty &&
    !s.isConfirmPasswordEmpty &&
    !s.isNameError &&
    !s.isUsernameError &&
    !s.isPasswordError &&
    !s.isConfirmPasswordError
  )
}

export const signupReducer = (
  state: IForm,
  { type, payload }: IFormAction
): IForm => {
  let isConfirmPasswordError = false
  switch (type) {
    case "name":
      const isNameEmpty = payload.length === 0
      const isNameError = containsSpecialChars(payload)
      return {
        ...state,
        name: payload,
        isNameEmpty,
        isNameError,
        canCreate: isCreatable({ ...state, isNameEmpty, isNameError })
      }
    case "username":
      const isUsernameEmpty = payload.length === 0
      const isUsernameError = containsSpecialChars(payload)
      return {
        ...state,
        username: payload,
        isUsernameEmpty,
        isUsernameError,
        canCreate: isCreatable({ ...state, isUsernameEmpty, isUsernameError })
      }
    case "password":
      const isPasswordEmpty = payload.length === 0
      const isPasswordError = 0 < payload.length && payload.length < 8
      isConfirmPasswordError =
        payload !== state.confirmPassword && !state.isConfirmPasswordEmpty
      return {
        ...state,
        password: payload,
        isPasswordEmpty,
        isPasswordError,
        isConfirmPasswordError,
        canCreate: isCreatable({
          ...state,
          isPasswordEmpty,
          isPasswordError,
          isConfirmPasswordError
        })
      }
    case "confirm":
      const isConfirmPasswordEmpty = payload.length === 0
      isConfirmPasswordError = payload !== state.password
      return {
        ...state,
        confirmPassword: payload,
        isConfirmPasswordEmpty,
        isConfirmPasswordError,
        canCreate: isCreatable({
          ...state,
          isConfirmPasswordEmpty,
          isConfirmPasswordError
        })
      }
    default:
      throw new Error("Undefined account action type caught")
  }
}
