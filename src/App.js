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
  // let API_URI = env.REACT_APP_API_URI;
  let API_URI="http://0.0.0.0:3000";
  // let API_VERSION = env.REACT_APP_API_VERSION;
  let API_VERSION = 1;
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
  }, [connected])

  async function loadCount() {

    // alert(`API_URI is ${API_URI} and API_VERSION is ${API_VERSION}.`)
    // If an API URI is provided, use that to get the count
    if (API_URI) {
      let count;
      try {
        count = await getCounter(API_URI, API_VERSION, TOKEN);
        if (count.message) {
          count = 0;
          throw new Error()
        }
      } catch(error) {
        alert(`Error: The API_URI is ${API_URI}, yet could not fetch the data from the API_URI. The data returned is ${count} 😢`)
      } finally {
        setClickCount(count);
      }
    }


    // If connected to the internet, and no API URI is provided then use the Global Counter API.
    // Fallback to using local storage for count if the Global Counter API is unavailable.
    if (connected && !API_URI || API_URI === "undefined") {
      let count;
      try {
        count = await countapi.get(countapiNamespace, countapiKey);
        if (count.message) {
          count.value = 0;
          throw new Error()
        }
      } catch (error) {
        alert(`Error: Unable to connect to the database because either the API_URI is undefined or not available. The API_URI is ${API_URI} 😢`)
      } finally {
        setClickCount(count?.value || clickCount); 
      }
    }
    
    // If not connected to the internet, and no API URI is provided then use local storage for count.
    if (!connected && !API_URI || API_URI === "undefined") {
      const count = localStorage.getItem("clickCount");
      setClickCount(parseInt(count) || 0);
      setConnected(false);
    }
  }

  async function countUp() {

    // If an API URI is provided, use that to update the count
    if (API_URI) {
      let count;
      try {
        count = await postCounter(API_URI, API_VERSION, TOKEN);
        if (count.message) {
          count = 0;
         throw new Error()
        }
      } catch (error) {
        alert(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
      } finally {
        setClickCount(count);
      }
    }

    // If connected to the internet, and no API URI is provided then use the Global Counter API.
    if (connected && !API_URI || API_URI === "undefined") {
      let count;
      try {
        let response = await countapi.update(countapiNamespace, countapiKey, +1);
        if (response.message) {
          response = 0;
          throw new Error()
        }
        await loadCount();
      } catch(error) {
        alert(`Error: Unable to connect to Global Counter API. Please try again later. 😢`)
      }
    } 

    // If not connected to the internet, and no API URI is provided then use local storage for count.
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
          © 2022 Spectro Cloud®. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
