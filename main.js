import { jsPDF } from 'jspdf';
import translations from './translations.json';

const LANGUAGES = ["pt-BR", "en-US"];
const languageSelect = document.querySelector('select');
const searchParams = new URLSearchParams(window.location.search);
const filename = {
  'en-US': "Marcelo Lima's Resume.pdf",
  'pt-BR': 'Marcelo Lima.pdf',
};

function changeLanguage(language) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach((element) => {
    const translationKey = element.getAttribute('data-translate');
    element.innerText = translations[translationKey][language];
  });

  searchParams.set('language', language);
  const newSearchString = searchParams.toString();
  const [baseUrl] = window.location.href.split('?');
  window.history.replaceState(null, '', `${baseUrl}?${newSearchString}`);
}

languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

const language = searchParams.get('language');
if (LANGUAGES.includes(language)) {
  languageSelect.value = language;
  changeLanguage(language);
}

document.querySelector('button').addEventListener('click', () => {
  const doc = new jsPDF({ unit: 'px' });
  doc.setFont('Ubuntu', 'normal');
  doc.html(document.querySelector('.resume'), {
    width: 950,
    windowWidth: 1903,
    callback: (doc) => doc.save(filename[languageSelect.value]),
    html2canvas: {
      x: 500,
    },
  });
});
