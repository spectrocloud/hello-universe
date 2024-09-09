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
