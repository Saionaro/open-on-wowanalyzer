const WOWANALYZER_URL = "https://wowanalyzer.com/report/";

const button = document.createElement("button");
const menu = document.getElementById("main-menu");

button.className = "oow-button";
button.innerHTML = "Open On Wowanalyzer";

menu.appendChild(button);

button.addEventListener("click", () => {
  const parts = location.href.split("/reports/");
  const parts2 = parts[1].split("#");

  window.open(`${WOWANALYZER_URL}${parts2[0]}`, "_blank");
});
