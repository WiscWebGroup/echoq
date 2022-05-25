import { Avatar, Button, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import LogoImage from "../asset/png/logo.png"

import "./nav.css"

export const ShareHeader = ({
  avatar,
  name
}: {
  avatar?: string
  name: string
}) => {
  return (
    <div className="nav-wrapper">
      <div className="share-nav-container">
        <div className="share-logo-container">
          {avatar ? (
            <Image borderRadius="full" boxSize="64px" src={avatar} alt="" />
          ) : (
            <Avatar bgColor="teal" size="lg" color="#fff" name={name} />
          )}
        </div>
        <Text fontSize="xl">{name}'s Responses</Text>
      </div>
    </div>
  )
}

export const NormalHeader = ({ variant }: { variant: "signup" | "signin" }) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="logo-container">
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
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

export const AuthedHeader = ({ page }: { page: string }) => {
  return (
    <div className="nav-wrapper">
      <div className="auth-nav-container">
        <div className="auth-logo-container">
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Text fontSize="xl">{page}</Text>
      </div>
    </div>
  )
}
