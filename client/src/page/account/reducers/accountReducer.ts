import { containsSpecialChars } from "../../../common/utils/utils"

interface IAccount {
  name: string
  isNameEmpty: boolean
  isNameError: boolean
  pass: string
  isPassEmpty: boolean
  isPassError: boolean
  canSave: boolean
}

interface IAccountAction {
  type: "name" | "pass" | "reset"
  payload: string
}

export const initialAccountState: IAccount = {
  name: "",
  isNameEmpty: true,
  isNameError: false,
  pass: "",
  isPassEmpty: true,
  isPassError: false,
  canSave: false
}

const isSavable = ({
  isNameEmpty,
  isNameError,
  isPassEmpty,
  isPassError
}: IAccount) => {
  if (isNameEmpty) return !isPassEmpty && !isPassError
  if (isPassEmpty) return !isNameEmpty && !isNameError
  return !isNameError && !isPassError
}

export const accountReducer = (
  state: IAccount,
  { type, payload }: IAccountAction
): IAccount => {
  switch (type) {
    case "name":
      const isNameEmpty = payload.length === 0
      const isNameError = containsSpecialChars(payload)
      return {
        ...state,
        name: payload,
        isNameEmpty,
        isNameError,
        canSave: isSavable({ ...state, isNameEmpty, isNameError })
      }
    case "pass":
      const isPassEmpty = payload.length === 0
      const isPassError = 0 < payload.length && payload.length < 8
      return {
        ...state,
        pass: payload,
        isPassEmpty,
        isPassError,
        canSave: isSavable({ ...state, isPassEmpty, isPassError })
      }
    case "reset":
      return initialAccountState
    default:
      throw new Error("Undefined account action type caught")
  }
}
