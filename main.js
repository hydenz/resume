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

const languageSelect = document.querySelector("select");

languageSelect.addEventListener("change", (e) =>
  changeLanguage(e.target.value)
);

const filename = {
  "en-US": "Marcelo Lima's Resume.pdf",
  "pt-BR": "Marcelo Lima.pdf",
};

document.querySelector("button").addEventListener("click", () => {
  const doc = new jsPDF({ unit: "px" });
  doc.setFont("Ubuntu", "normal");
  doc.html(document.querySelector(".resume"), {
    width: 1080,
    windowWidth: 1899,
    callback: (doc) => doc.save(filename[languageSelect.value]),
    html2canvas: {
      width: 1080,
      windowWidth: 1899,
      x: 552,
    },
  });
});
