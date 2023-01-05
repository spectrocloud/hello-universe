import "./App.css";
import twitter from "./img/twitter.png";
import linkedin from "./img/linkedin.png";
import mastodon from "./img/mastodon.png";
import logo_text from "./img/logo_text.png";
import { FadeIn, SpinningComponent } from "./components/Animated/Animated";
import { useEffect, useState } from "react";
import countapi from "countapi-js";
import {randomLogo} from "./utilities/helpers";
import { env } from './env';
import { getCounter, postCounter } from "./utilities/requests";
import Menu from "./components/Animated/Menu/Menu";

function App() {
  const countapiKey = "f3dceeba-1841-42cf-b76c-26e9026dc0cf";
  const countapiNamespace = "spectrocloud.com";
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const API_URI = env.REACT_APP_API_URI;
  const API_VERSION = env.REACT_APP_API_VERSION;


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
    if (connected && !API_URI || API_URI === "undefined") {
      try {
        const count = await countapi.get(countapiNamespace, countapiKey);
        setClickCount(count?.value || clickCount); 
      } catch (error) {
        setClickCount(clickCount + 1);
        localStorage.setItem("clickCount", clickCount);
      }
    }
    
    if (API_URI) {
      try {
        const databaseCount = await getCounter(API_URI, API_VERSION);
        setClickCount(databaseCount);
      } catch(error) {
        console.log(error);
        alert(`Error: Unable to connect to database on ${API_URI}. Please try again later. 😢`)
      }
    }

    if (!connected && !API_URI || API_URI === "undefined") {
      const count = localStorage.getItem("clickCount");
      setClickCount(parseInt(count) || 0);
      setConnected(false);
    }
  }

  async function countUp() {
    if (connected && !API_URI || API_URI === "undefined") {
      try {
        await countapi.update(countapiNamespace, countapiKey, +1);
        await loadCount();
      } catch(error) {
        console.log(error);
      }
    } 

    if (API_URI) {
      try {
        const databaseCount = await postCounter(API_URI, API_VERSION);
        setClickCount(databaseCount);
      } catch (error) {
        alert(`Error: Unable to connect to database on ${API_URI}. Please try again later. 😢`)
      }

    }
    
    if(!connected && !API_URI || API_URI === "undefined") {
      setClickCount(clickCount + 1);
      localStorage.setItem("clickCount", clickCount);

    }

    if (firstLoad) {
      setFirstLoad(false);
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
                 {randomLogo(firstLoad)}
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
