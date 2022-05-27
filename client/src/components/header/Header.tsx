import { Avatar, Button, Image, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"

import LogoImage from "../../asset/png/logo.png"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

import "./nav.css"

export const HomeHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="nav-wrapper">
      <div className="home-nav-container">
        <div className="home-logo-container" onClick={() => navigate("/")}>
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Text fontSize="xl">Welcome to Echoq!</Text>
      </div>
    </div>
  )
}

export const NotFoundErrorHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="nav-wrapper">
      <div className="error-nav-container">
        <div className="error-logo-container" onClick={() => navigate("/")}>
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Text fontSize="xl">404 Page Not Found</Text>
      </div>
    </div>
  )
}

export const UserErrorHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="nav-wrapper">
      <div className="error-nav-container">
        <div className="error-logo-container" onClick={() => navigate("/")}>
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Text fontSize="xl">User Error</Text>
      </div>
    </div>
  )
}

export const ShareHeader = ({
  avatar,
  name,
  whatsup
}: {
  avatar: Blob | null
  name: string
  whatsup: string | null
}) => {
  return (
    <div className="nav-wrapper">
      <div className="share-nav-container">
        <div className="share-logo-container">
          {avatar ? (
            <Image
              borderRadius="full"
              boxSize="64px"
              style={{ width: "64px", height: "64px" }}
              src={URL.createObjectURL(avatar)}
              alt=""
            />
          ) : (
            <Avatar bgColor="teal" size="lg" color="#fff" name={name} />
          )}
        </div>
        <Text fontSize="xl">{name}'s Responses</Text>

        <div className="share-whatsup-container">
          <Text fontSize="sm" color="gray.500">
            {whatsup}
          </Text>
        </div>
      </div>
    </div>
  )
}

export const NormalHeader = ({ variant }: { variant: "signup" | "signin" }) => {
  const navigate = useNavigate()

  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div className="logo-container" onClick={() => navigate("/")}>
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
  const navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const { get, remove } = useLocalStorage(TOKEN_KEY)

  const handleLogOut = async () => {
    await makeRequest({
      path: "/user/signout",
      method: "POST",
      data: null,
      headers: { "XXX-SToken": get() }
    })
    remove()
    navigate("/signin")
  }

  return (
    <div className="nav-wrapper">
      <div className="auth-nav-container">
        <div className="auth-logo-container" onClick={() => navigate("/")}>
          <Image borderRadius="full" boxSize="64px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
        <Text fontSize="xl">{page}</Text>
        <div className="auth-logout-container">
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}
