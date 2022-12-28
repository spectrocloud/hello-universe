import logo from "../img/logo.svg";
import logoOne from "../img/spectronaut.svg";
import logoTwo from "../img/spectronaut_two.png";
import logoThree from "../img/spectronaut_balloons.png";


function randomLogo(firstLoad) {
    const logos = [logo, logoOne, logoTwo, logoThree];
    const randomIndex = Math.floor(Math.random() * logos.length);
    const imageSize = {
        1: [500, 600],
        2: [400, 500],
        3: [150, 800]
    }

    if (firstLoad || randomIndex === 0) {
        return <img src={logo} className="App-logo" alt="logo" />
    }

    return  <img src={logos[randomIndex]} className="App-logo" alt="logo" width={imageSize[randomIndex][0]} height={imageSize[randomIndex][1]} />
}

export {randomLogo};