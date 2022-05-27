import { IconButton, Image, Text, useClipboard } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

import ShareIcon from "../icons/ShareIcon"
import DotFilled from "../../asset/svg/dot-filled.svg"
import DotUnfilled from "../../asset/svg/dot-unfilled.svg"
import UserFilled from "../../asset/svg/user-filled.svg"
import UserUnfilled from "../../asset/svg/user-unfilled.svg"
import { useAlertUpdate } from "../alert/AlertProvider"

import "./footer.css"

export const AuthedFooter = ({
  active,
  shareLink
}: {
  active: "echo" | "account"
  shareLink: string
}) => {
  const setAlert = useAlertUpdate()
  const { onCopy } = useClipboard(shareLink)

  const handleCopy = () => {
    onCopy()
    setAlert({
      status: "success",
      text: "Copied your share link to clipboard.",
      show: true
    })
  }

  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="echo-tab">
          <Link to="/echo">
            <div className="echo-tab-wrapper">
              {active === "echo" ? (
                <Image boxSize="24px" src={DotFilled} alt="" />
              ) : (
                <Image boxSize="24px" src={DotUnfilled} alt="" />
              )}
              <Text fontSize="xs">Echo</Text>
            </div>
          </Link>
        </div>
        <div className="share-tab">
          <div className="share-tab-wrapper">
            <IconButton
              colorScheme="teal"
              aria-label="Share echo link"
              icon={<ShareIcon />}
              onClick={handleCopy}
            />
          </div>
        </div>
        <div className="account-tab">
          <Link to="/account">
            <div className="account-tab-wrapper">
              {active === "account" ? (
                <Image boxSize="24px" src={UserFilled} alt="" />
              ) : (
                <Image boxSize="24px" src={UserUnfilled} alt="" />
              )}
              <Text fontSize="xs">Account</Text>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const ShareFooter = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="share-footer-wrapper">
      <IconButton
        width="100%"
        height="100%"
        colorScheme="teal"
        aria-label="action button"
        icon={<AddIcon boxSize="25px" />}
        _focus={{ outline: "none" }}
        onClick={onClick}
      />
    </div>
  )
}
