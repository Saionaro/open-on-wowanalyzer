import { constructURL } from "./lib/url-constructor";

const WOWANALYZER_URL = "https://wowanalyzer.com";
const UNKNOWN_ERROR =
  "Unknown error found. Please, contact the developer with details.";

const button = document.createElement("button");
const menu = document.getElementById("main-menu");

button.className = "oow-button";
button.innerHTML = "Open On Wowanalyzer";

menu.appendChild(button);

button.addEventListener("click", () => {
  const wowAnalyzerUrl = constructURL(location.href);

  if (wowAnalyzerUrl) {
    window.open(`${WOWANALYZER_URL}${wowAnalyzerUrl}`, "_blank");
  } else {
    alert(UNKNOWN_ERROR);
  }
});
