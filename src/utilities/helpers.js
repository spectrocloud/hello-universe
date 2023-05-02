import logo from "../img/logo.svg";
import logoOne from "../img/spectronaut.svg";
import logoTwo from "../img/spectronaut_two.png";
import logoThree from "../img/spectronaut_balloons.png";
import logoFour from "../img/spectromate.png";


function randomLogo(firstLoad) {
    const logos = [logo, logoOne, logoTwo, logoThree, logoFour];
    const randomIndex = Math.floor(Math.random() * logos.length);


    if (firstLoad || randomIndex === 0) {
        return <img src={logo} className="App-logo" alt="logo" />
    }

    return  <img src={logos[randomIndex]} className="App-logo" alt="logo" />
}

export {randomLogo};