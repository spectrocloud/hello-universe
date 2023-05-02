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
  const countapiKey = "f3dceeba-1841-42cf-b76c-26e9026dc0cf"; // Yes, it's an API key but it's not a secret. It's used to identify the counter. 
  const countapiNamespace = "spectrocloud.com";
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  let API_URI = env.REACT_APP_API_URI;
  let API_VERSION = env.REACT_APP_API_VERSION;
  let TOKEN = env.REACT_APP_TOKEN;

  if (TOKEN == "undefined") {
      TOKEN = ""
  }

  if (API_URI == "undefined") {
      API_URI = ""
  }

  if (API_VERSION === "" || API_VERSION == "undefined") {
      API_VERSION = 1
  }

  useEffect(() => {
    // Checks if internet is connected by attempting to load an image
    const image = new Image();
    image.onload = () => {setConnected(true)};
    image.onerror = () => {setConnected(false)};
    image.src = "https://www.google.com/images/phd/px.gif";

    setIsLogoVisible(true);
    loadCount();
  }, [])

  async function loadCount() {

    // If an API URI is provided, use that to get the count
    if (API_URI) {
      let count;
      try {
        count = await getCounter(API_URI, API_VERSION, TOKEN);
        if (count.message) {
          count = 0;
          throw new Error(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
        }
      } catch(error) {
        alert(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
      } finally {
        setClickCount(count);
      }
    }

    
    // If not connected to the internet, and no API URI is provided then use local storage for count.
    if (API_URI == "" || API_URI === "undefined") {
      const count = localStorage.getItem("clickCount");
      setClickCount(parseInt(count) || 0);
    }
  }

  async function countUp() {

    console.log("HERE")

    // If an API URI is provided, use that to update the count
    if (API_URI) {
      let count;
      try {
        count = await postCounter(API_URI, API_VERSION, TOKEN);
        if (count.message) {
          count = 0;
         throw new Error(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
        }
      } catch (error) {
        alert(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
      } finally {
        setClickCount(count);
      }
    }

    // If not connected to the internet, and no API URI is provided then use local storage for count.
    if(API_URI == "" || API_URI === "undefined") {
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
        { API_URI ? <span className="Click-counter">{`Clicked ${clickCount} 🤖 `}</span> : <span className="Click-counter">{`Clicked ${clickCount} 🌏`}</span>}
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
          © 2023 Spectro Cloud®. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
