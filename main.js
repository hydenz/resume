import { jsPDF } from "jspdf";
import "./style.css";
import translations from "./translations.json";

function changeLanguage(language) {
  const elements = Array.from(document.querySelectorAll("[data-translate]"));

  elements.forEach((element) => {
    const translationKey = element.getAttribute("data-translate");
    element.innerText = translations[translationKey][language];
  });
}

document
  .querySelector("select")
  .addEventListener("change", (e) => changeLanguage(e.target.value));

document.querySelector("button").addEventListener("click", () => {
  const doc = new jsPDF({ unit: "px" });
  doc.setFont("Ubuntu", "normal");
  console.log(doc.getFontList());
  doc.html(document.querySelector(".resume"), {
    width: 1080,
    windowWidth: 1899,
    callback: (doc) => doc.save(),
    html2canvas: {
      width: 1080,
      windowWidth: 1899,
      x: 552,
    },
  });
});
