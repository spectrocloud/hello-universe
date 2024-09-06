import React from "react";
import './Footer.css'
import twitter from "../../img/x.png";
import linkedin from "../../img/linkedin.png";
import mastodon from "../../img/mastodon.png";
import logo from "../../img/logo.svg"

const Footer = () => {
    return(
        <footer className="footer">
          <div className="Social-icons">
            <a
              href="https://www.linkedin.com/company/spectro-cloud/"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img className="Social-invert" src={linkedin} alt="linkedin" />
            </a>

            <a
              href="https://x.com/spectrocloudinc"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src={twitter} alt="twitter" />
            </a>

            <a
              href="https://hachyderm.io/@spectrocloudinc"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img className="Social-invert" src={mastodon} alt="mastodon" />
            </a>
          </div>
          <div>
            <div>
            <span className="Footer-rights">
              Spacetastic Ltd. is a fictional company used by Spectro Cloud as an example company and domain. 
              <br />
              © 2024 Spectro Cloud®. All rights reserved.
            </span>
            </div>
            <div className="footer-logo-container">
              <img className="footer-logo" src={logo} alt="spectrocloud" />
            </div>
          </div>
        </footer>        
    );
}

export default Footer;