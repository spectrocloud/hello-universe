import "./App.css";
import { env } from './env';
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./components/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
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

  let apiConnection = {
    uri: API_URI, 
    version: API_VERSION, 
    token: TOKEN,
  }
  
  // const loadCount = useCallback(async () => {
  //   // If no API URI is provided then use local storage for count.
  //   if (API_URI === "") {
  //     const count = localStorage.getItem("clickCount");
  //     setClickCount(parseInt(count) || 0);
  //     return
  //   }

  //   // An API URI must have been provided, use that to get the count
  //   let count;
  //   try {
  //     count = await getCounter(API_URI, API_VERSION, TOKEN);
  //     setAPIStatus([Status.OK, null])
  //     if (count.message) {
  //       count = 0;
  //       setAPIStatus([Status.Error, connectionError()])
  //     }
  //   } catch(error) {
  //     setAPIStatus([Status.Error, connectionError()])
  //   } finally {
  //     setClickCount(count);
  //   }
  // }, [API_URI, API_VERSION, TOKEN, connectionError])

  // const countUp = useCallback(async () => {
  //   if (firstLoad) {
  //     setFirstLoad(false);
  //   }

  //   // If no API URI is provided then use local storage for count.
  //   if(API_URI === "") {
  //     setClickCount(clickCount + 1);
  //     localStorage.setItem("clickCount", clickCount);
  //     return
  //   }

  //   // An API URI must have been provided, use that to update the count
  //   let count;
  //   try {
  //     count = await postCounter(API_URI, API_VERSION, TOKEN);
  //     setAPIStatus([Status.OK, null])
  //     if (count.message) {
  //       count = 0;
  //       setAPIStatus([Status.Error, connectionError()])
  //     }
  //   } catch (error) {
  //     setAPIStatus([Status.Error, connectionError()])
  //   } finally {
  //     setClickCount(count);
  //   }
  // }, [API_URI, API_VERSION, TOKEN, connectionError, clickCount, firstLoad])

  // useEffect(() => {
  //   setIsLogoVisible(true);
  //   loadCount();
  // }, [loadCount])

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Menu />
          <AppRoutes apiConnection={apiConnection}/>
        </header>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
