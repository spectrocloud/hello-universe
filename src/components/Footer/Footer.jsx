import React from "react";
import './Footer.css'
import twitter from "../../img/twitter.png";
import linkedin from "../../img/linkedin.png";
import mastodon from "../../img/mastodon.png";

const Footer = () => {
    return(
        <footer className="App-footer">
          <div className="Social-icons">
            <a
              href="https://www.linkedin.com/company/spectro-cloud/"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src={linkedin} alt="linkedin" />
            </a>

            <a
              href="https://twitter.com/spectrocloudinc"
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
              <img src={mastodon} alt="mastodon" />
            </a>
          </div>
          <span className="Footer-rights">
            © 2024 Spectro Cloud®. All rights reserved.
          </span>
        </footer>        
    );
}

export default Footer;