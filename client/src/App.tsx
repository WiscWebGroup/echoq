import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signin from "./page/auth/Signin"
import Signup from "./page/auth/Signup"
import Home from "./page/home/Home"
import Account from "./page/account/Account"

import "./app.css"
import AlertProvider from "./components/alert/AlertProvider"
import { ScaleFade } from "@chakra-ui/react"

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
            </Routes>
          </Router>
        </ScaleFade>
      </AlertProvider>
    </div>
  )
}
