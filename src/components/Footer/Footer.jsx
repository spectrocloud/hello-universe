import React from "react";
import "./Footer.css";
import twitter from "../../img/x.webp";
import linkedin from "../../img/linkedin.webp";
import mastodon from "../../img/mastodon.webp";
import logo from "../../img/logo.svg";

const ImageInvert = React.memo(function Image({ src, altText }) {
  return <img className="Social-invert" src={src} alt={altText} />;
});

const Image = React.memo(function Image({ src, altText }) {
  return <img src={src} alt={altText} />;
});

const ImageFooter = React.memo(function Image({ src, altText }) {
  return <img className="footer-logo" src={src} alt={altText} />;
});

const Footer = () => {
  return (
    <footer className="footer">
      <div className="Social-icons">
        <a
          href="https://www.linkedin.com/company/spectro-cloud/"
          target={"_blank"}
          rel={"noreferrer"}
        >
          <ImageInvert src={linkedin} altText={"linkedin"} />
        </a>

        <a
          href="https://x.com/spectrocloudinc"
          target={"_blank"}
          rel={"noreferrer"}
        >
          <Image src={twitter} alt="twitter" />
        </a>

        <a
          href="https://hachyderm.io/@spectrocloudinc"
          target={"_blank"}
          rel={"noreferrer"}
        >
          <ImageInvert src={mastodon} altText={"mastodon"} />
        </a>
      </div>
      <div>
        <div>
          <span className="Footer-rights">
            Spacetastic Ltd. is a fictional company used by Spectro Cloud as an
            example company and domain.
            <br />© 2025 Spectro Cloud®. All rights reserved.
          </span>
        </div>
        <div className="footer-logo-container">
          <ImageFooter src={logo} alt="spectrocloud" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
