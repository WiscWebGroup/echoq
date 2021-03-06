import { ScaleFade } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AlertProvider from "./components/alert/AlertProvider"
import Signin from "./page/auth/Signin"
import Signup from "./page/auth/Signup"
import Home from "./page/home/Home"
import Account from "./page/account/Account"
import Echo from "./page/echo/Echo"
import Share from "./page/share/Share"

import "./app.css"
import UserNotExist from "./page/error/UserNotExist"
import PageNotFound from "./page/error/PageNotFound"

export const App = () => {
  return (
    <div className="App">
      <AlertProvider>
        <ScaleFade className="App" initialScale={0.9} in>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
              <Route path="/echo" element={<Echo />} />
              <Route path="/share/:userId" element={<Share />} />
              <Route path="/error/user" element={<UserNotExist />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </ScaleFade>
      </AlertProvider>
    </div>
  )
}
