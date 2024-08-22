import "./App.css";
import twitter from "./img/twitter.png";
import linkedin from "./img/linkedin.png";
import mastodon from "./img/mastodon.png";
import { useEffect, useState, useCallback } from "react";
import { env } from './env';
import { getCounter, postCounter } from "./utilities/requests";
import Menu from "./components/Menu/Menu";
import Title from "./components/LandingPage/Title"
import PlanetSelection from "./components/LandingPage/PlanetSelection";

const Status = {
 OK: "OK", 
 Error: "Connection error", 
 NotSet: "No API configured"
}

function App() {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [apiStatus, setAPIStatus] = useState([Status.NotSet, null]);
  let API_URI = env.REACT_APP_API_URI;
  let API_VERSION = env.REACT_APP_API_VERSION;
  let TOKEN = env.REACT_APP_TOKEN;

  if (TOKEN === "undefined") {
      TOKEN = ""
  }

  if (API_URI === "undefined" || API_URI === undefined) {
      API_URI = ""
  }

  if (API_VERSION === "" || API_VERSION === "undefined") {
      API_VERSION = 1
  }
  
  // useCallback enables caching between re-renders
  const connectionError = useCallback(()=> {
    return new Error(`Error: Unable to connect to the API server on ${API_URI}. Please try again later. 😢`)
  }, [API_URI])

  const loadCount = useCallback(async () => {
    // If no API URI is provided then use local storage for count.
    if (API_URI === "") {
      const count = localStorage.getItem("clickCount");
      setClickCount(parseInt(count) || 0);
      return
    }

    // An API URI must have been provided, use that to get the count
    let count;
    try {
      count = await getCounter(API_URI, API_VERSION, TOKEN);
      setAPIStatus([Status.OK, null])
      if (count.message) {
        count = 0;
        setAPIStatus([Status.Error, connectionError()])
      }
    } catch(error) {
      setAPIStatus([Status.Error, connectionError()])
    } finally {
      setClickCount(count);
    }
  }, [API_URI, API_VERSION, TOKEN, connectionError])

  const countUp = useCallback(async () => {
    if (firstLoad) {
      setFirstLoad(false);
    }

    // If no API URI is provided then use local storage for count.
    if(API_URI === "") {
      setClickCount(clickCount + 1);
      localStorage.setItem("clickCount", clickCount);
      return
    }

    // An API URI must have been provided, use that to update the count
    let count;
    try {
      count = await postCounter(API_URI, API_VERSION, TOKEN);
      setAPIStatus([Status.OK, null])
      if (count.message) {
        count = 0;
        setAPIStatus([Status.Error, connectionError()])
      }
    } catch (error) {
      setAPIStatus([Status.Error, connectionError()])
    } finally {
      setClickCount(count);
    }
  }, [API_URI, API_VERSION, TOKEN, connectionError, clickCount, firstLoad])

  useEffect(() => {
    setIsLogoVisible(true);
    loadCount();
  }, [loadCount])

  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <div className="Header-items">
          <Title />
          <PlanetSelection />
          {/* <FadeIn isVisible={isLogoVisible}>
            <SpinningComponent>
              <div onClick={() => countUp()}>
                 {randomLogo(firstLoad)}
              </div>
            </SpinningComponent>
            <img src={logo_text} className="App-logo-text" alt="spectrocloud" />
          </FadeIn> */}
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
          © 2024 Spectro Cloud®. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;
