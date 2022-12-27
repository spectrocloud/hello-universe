import "./App.css";
import logo from "./img/logo.svg";
import twitter from "./img/twitter.png";
import linkedin from "./img/linkedin.png";
import mastodon from "./img/mastodon.png";
import logo_text from "./img/logo_text.png";

import { FadeIn, SpinningComponent } from "./components/Animated/Animated";
import { useEffect, useState } from "react";
import countapi from "countapi-js";

import Menu from "./components/Animated/Menu/Menu";

function App() {
  const countapiKey = "f3dceeba-1841-42cf-b76c-26e9026dc0cf";
  const countapiNamespace = "spectrocloud.com";
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Checks if internet is connected by attempting to load an image
    const image = new Image();
    image.onload = () => {setConnected(true)};
    image.onerror = () => {setConnected(false)};
    image.src = "https://www.google.com/images/phd/px.gif";

    setIsLogoVisible(true);
    loadCount();
  }, [connected])

  async function loadCount() {
    // If not connected to the internet, fallback to using local storage for count
    // Otherwise, use Count API
    if (connected) {
      const count = await countapi.get(countapiNamespace, countapiKey);
      setClickCount(count?.value || clickCount);
    } else {
      const count = localStorage.getItem("clickCount");
      setClickCount(parseInt(count) || 0);
    }
  }

  async function countUp() {
    if (connected) {
      await countapi.update(countapiNamespace, countapiKey, +1);
      await loadCount();
    } else {
      setClickCount(clickCount + 1);
      localStorage.setItem("clickCount", clickCount);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Menu />

        <div className="Header-items">
          <span className="Click-counter">{`Clicked ${clickCount} times 🤖`}</span>

          <FadeIn isVisible={isLogoVisible}>
            <SpinningComponent>
              <div onClick={() => countUp()}>
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </SpinningComponent>

            <img src={logo_text} className="App-logo-text" alt="spectrocloud" />
          </FadeIn>
        </div>
      </header>
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
          © 2022 Spectro Cloud®. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
