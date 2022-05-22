export const TOKEN_KEY = "echoq-token"

export const useLocalStorage = (key: string) => {
  return {
    get: () => {
      return localStorage.getItem(key)
    },
    set: (val: string) => {
      return localStorage.setItem(key, val)
    },
    remove: () => {
      localStorage.removeItem(key)
    }
  }
}

export default useLocalStorage
