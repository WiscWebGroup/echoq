import { Image, Text } from "@chakra-ui/react"

import DotFilled from "../asset/svg/dot-filled.svg"
import DotUnfilled from "../asset/svg/dot-unfilled.svg"
import ShareFilled from "../asset/svg/share-filled.svg"
import UserFilled from "../asset/svg/user-filled.svg"
import UserUnfilled from "../asset/svg/user-unfilled.svg"

import "./footer.css"

export const AuthedFooter = ({ active }: { active: "echo" | "account" }) => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="echo-tab">
          {active === "echo" ? (
            <Image boxSize="24px" src={DotFilled} alt="" />
          ) : (
            <Image boxSize="24px" src={DotUnfilled} alt="" />
          )}
          <Text fontSize="xs">Echo</Text>
        </div>
        <div className="share-tab">
          <Image boxSize="24px" src={ShareFilled} alt="" />
        </div>
        <div className="account-tab">
          {active === "account" ? (
            <Image boxSize="24px" src={UserFilled} alt="" />
          ) : (
            <Image boxSize="24px" src={UserUnfilled} alt="" />
          )}
          <Text fontSize="xs">Account</Text>
        </div>
      </div>
    </div>
  )
}
