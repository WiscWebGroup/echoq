import { Button, Image, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

import LogoImage from "../asset/png/logo.png"

import "./nav.css"

export const NormalHeader = ({ variant }: { variant: "signup" | "signin" }) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="logo-container">
          <Image borderRadius="full" boxSize="66px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Link to={variant === "signup" ? "/signin" : "/signup"}>
          <Button colorScheme="teal" variant="outline">
            {variant === "signup" ? "Sign In" : "Sign Up"}
          </Button>
        </Link>
      </div>
    </div>
  )
}
